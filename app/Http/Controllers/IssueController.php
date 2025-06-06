<?php

namespace App\Http\Controllers;

use App\Models\HealthCenter;
use App\Models\Issue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class IssueController extends Controller
{
    protected $model;
    public function __construct(Issue $model)
    {
        $this->model = $model;
    }
    public function index(Request $request)
    {
        // $data = Issue::paginate(10);
        // dd($data);
        $pages = 10;
        if ($request->count_per_page) {
            $pages = $request->count_per_page;
        }
        $us = auth()->user();
        $mun_us = $us->municipality;
        $bar_us = $us->barangay;
        $level = auth()->user()->level;
        $data = $this->model
            ->when($request->search, function ($query, $searchItem) {
                $query->where('issue', 'like', '%' . $searchItem . '%');
            })
            ->when($request->mun, function ($query, $mun) {
                $query->where('municipality', 'LIKE', '%' . $mun . '%');
            })
            ->when($request->bar, function ($query, $bar) {
                $query->where('barangay', 'LIKE', '%' . $bar . '%');
            })
            ->when($request->pur, function ($query, $pur) {
                $query->where('purok_sitio', 'LIKE', '%' . $pur . '%');
            })
            ->when($level == 'Municipal', function ($query) use ($mun_us) {
                $query->where('municipality', $mun_us);
            })
            ->when($level == 'Barangay', function ($query) use ($bar_us) {
                $query->where('barangay', $bar_us);
            })
            ->orderBy('updated_at', 'DESC')
            ->paginate($pages)
            ->withQueryString();
        return inertia('Issues/Index', [
            "filters" => $request->only(['search']),
            'data' => $data
        ]);
    }
    public function report(Request $request)
    {
        // dd('Index');
        $barangay = DB::table('barangays')
            ->select(DB::raw('(barangays.barangay)'), 'municipalities.municipality')
            ->join('municipalities', 'barangays.muni_filter', "municipalities.code")
            ->get();
        return inertia('Issues/Report', [
            'barangays' => $barangay
        ]);
    }
    public function store(Request $request)
    {
        // dd($request);
        $request->validate([
            'issue' => 'required|string|max:255',
            'municipality' => 'required|string|max:255',
            'barangay' => 'required|string|max:255',
            'Latitude' => 'required',
            'Longitude' => 'required',
            'type' => 'required'
        ]);
        $is = new Issue;
        $is->issue = $request->issue;
        $is->municipality = $request->municipality;
        $is->barangay = $request->barangay;
        $is->Latitude = $request->Latitude;
        $is->Longitude = $request->Longitude;
        $is->type = $request->type;
        $is->status = '0';
        $is->user_id = auth()->user()->id;
        $is->save();
        return redirect('issue')->with('message', "Issue successfully reported");
    }
    public function view(Request $request, $id)
    {
        $issue = Issue::where('id', $id)->first();
        $lat = floatval($issue->Latitude);
        $long = floatval($issue->Longitude);
        $nhc = HealthCenter::selectRaw(
            "id, `DESC`, type, municipality, barangay, Longitude, Latitude,
        (6371 * acos(cos(radians(?)) * cos(radians(Latitude))
        * cos(radians(Longitude) - radians(?))
        + sin(radians(?)) * sin(radians(Latitude)))) AS distance",
            [$lat, $long, $lat]
        )
            ->orderBy('distance', 'ASC')
            ->first();
        $long_to = floatval($nhc->Longitude);
        $lat_to = floatval($nhc->Latitude);
        return inertia(
            'Issues/ViewIssueBackup',
            [
                "long_from" => $long,
                "lat_from" => $lat,
                "long_to" => $long_to,
                "lat_to" => $lat_to,
                "nhc" => $nhc,
                "issue" => $issue
            ]
        );
    }
    public function edit(Request $request, $id)
    {
        $data = Issue::where("id", $id)->first();
        // dd($data);
        $barangay = DB::table('barangays')
            ->select(DB::raw('(barangays.barangay)'), 'municipalities.municipality')
            ->join('municipalities', 'barangays.muni_filter', "municipalities.code")
            ->get();
        return inertia('Issues/Report', [
            'editData' => $data,
            'barangays' => $barangay
        ]);
    }
    public function update(Request $request)
    {
        // dd($request);
        $request->validate([
            'issue' => 'required|string|max:255',
            'municipality' => 'required|string|max:255',
            'barangay' => 'required|string|max:255',
            'Latitude' => 'required',
            'Longitude' => 'required',
            'type' => 'required'
        ]);
        $is = Issue::where('id', $request->id)->first();
        $is->issue = $request->issue;
        $is->municipality = $request->municipality;
        $is->barangay = $request->barangay;
        $is->Latitude = $request->Latitude;
        $is->Longitude = $request->Longitude;
        $is->type = $request->type;
        $is->status = '0';
        $is->user_id = auth()->user()->id;
        $is->save();
        return redirect('issue')->with('message', "Issue successfully reported");
    }

    public function destroy(Request $request, $id)
    {
        $dat = $this->model->findOrFail($id);
        $dat->delete();
        return back()->with('message', 'Successfully deleted data');
    }
    public function mobile_store(Request $request)
    {
        // return response()->json(['message' => 'Method hit successfully']);
        $validator = Validator::make($request->all(), [
            'issue' => 'required|string|max:255',
            'municipality' => 'required|string|max:255',
            'barangay' => 'required|string|max:255',
            'Latitude' => 'required|numeric',
            'Longitude' => 'required|numeric',
            'type' => 'required|string|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $issue = new Issue;
            $issue->issue = $request->issue;
            $issue->municipality = $request->municipality;
            $issue->barangay = $request->barangay;
            $issue->Latitude = $request->Latitude;
            $issue->Longitude = $request->Longitude;
            $issue->type = $request->type;
            $issue->status = '0';
            $issue->user_id = $request->user_id; // Assuming user_id is passed in the request
            $issue->disease_type1 = $request->disease_type1; // Assuming disease_type1 is passed in the request
            $issue->patient_code = $request->patient_code; // Assuming patient_code is passed in the request
            $issue->hospital = $request->hospital;
            $issue->save();

            return response()->json([
                'status' => true,
                'message' => 'Issue successfully reported',
                'data' => $issue
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to report issue',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function mobile_list(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'level' => 'required',

        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }
        $mun_us = $request->mun;
        $bar_us = $request->bar;
        $level = $request->level;

        return $this->model
            ->when($request->search, function ($query, $searchItem) {
                $query->where('issue', 'like', '%' . $searchItem . '%');
            })
            ->when($request->mun, function ($query, $mun) {
                $query->where('municipality', 'LIKE', '%' . $mun . '%');
            })
            ->when($request->bar, function ($query, $bar) {
                $query->where('barangay', 'LIKE', '%' . $bar . '%');
            })
            ->when($request->pur, function ($query, $pur) {
                $query->where('purok_sitio', 'LIKE', '%' . $pur . '%');
            })
            ->when($level == 'Municipal', function ($query) use ($mun_us) {
                $query->where('municipality', $mun_us);
            })
            ->when($level == 'Barangay', function ($query) use ($bar_us) {
                $query->where('barangay', $bar_us);
            })
            ->orderBy('updated_at', 'DESC')
            ->get();
    }
    public function diseases(Request $request)
    {
        $data = Issue::where('hospital', '<>', null)
            ->distinct()
            ->get();
        // dd($data);

        return inertia('Issues/Diseases/Index', [
            "filters" => $request->only(['search']),
            'data' => $data,
            'num_patients' => $data->pluck('number_of_patients'),
        ]);
    }
    public function update_number_of_patients(Request $request, $id)
    {
        // $request->validate([
        //     'number_of_patients' => 'required|integer',
        // ]);

        $issue = Issue::where('id', $id)->first();
        if ($request->number_of_patients) {
            if (floatval($request->number_of_patients) > 0) {
                $issue->number_of_patients = $request->number_of_patients;
            } else {
                dd("zero ang number of patients");
                $issue->number_of_patients = null;
            }
        } else {
            $issue->number_of_patients = $request->number_of_patients;
        }
        $issue->save();
        return redirect()->back()->with('message', 'Number of patients updated successfully');
    }
}
