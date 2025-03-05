<?php

namespace App\Http\Controllers;

use App\Models\Intervention;
use App\Models\Issue;
use App\Models\IssueIntervention;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class IssueInterventionController extends Controller
{
    protected $model;
    public function __construct(IssueIntervention $model)
    {
        $this->model = $model;
    }

    public function view(Request $request, $id)
    {
        $pages = 10;
        if ($request->count_per_page) {
            $pages = $request->count_per_page;
        }
        $issue = Issue::findOrFail($id);
        // dd($issue);
        $data = $this->model->with(['Issue', 'Intervention'])
            // ->when($request->search, function ($query, $searchItem) {
            //     $query->where('issue', 'like', '%' . $searchItem . '%');
            // })
            // ->when($request->mun, function ($query, $mun) {
            //     $query->where('municipality', 'LIKE', '%' . $mun . '%');
            // })
            // ->when($request->bar, function ($query, $bar) {
            //     $query->where('barangay', 'LIKE', '%' . $bar . '%');
            // })
            // ->when($request->pur, function ($query, $pur) {
            //     $query->where('purok_sitio', 'LIKE', '%' . $pur . '%');
            // })
            ->where('issue_id', $id)
            ->orderBy('updated_at', 'DESC')
            ->paginate($pages)
            ->withQueryString();
        return inertia('Issues/Intervention/Index', [
            "issue" => $issue,
            "filters" => $request->only(['search']),
            'data' => $data
        ]);
    }
    public function create(Request $request, $issue_id)
    {
        // dd('Index');
        $barangay = DB::table('barangays')
            ->select(DB::raw('(barangays.barangay)'), 'municipalities.municipality')
            ->join('municipalities', 'barangays.muni_filter', "municipalities.code")
            ->get();

        $issue = Issue::findOrFail($request->issue_id);
        $interventions = Intervention::all();
        return inertia('Issues/Intervention/Create', [
            'barangays' => $barangay,
            'interventions' => $interventions,
            'issue' => $issue
        ]);
    }
    public function store(Request $request)
    {
        // dd($request);
        $request->validate([
            'issue_id' => 'required',
            'intervention_id' => 'required',
        ]);
        $is = new IssueIntervention;
        $is->issue_id = $request->issue_id;
        $is->intervention_id = $request->intervention_id;
        $is->status = '0';
        $is->save();
        // dd('store');
        return redirect('issue-intervention/view/' . $request->issue_id)->with('message', "Intervention successfully added");
    }
    public function edit(Request $request, $id)
    {
        // dd('Index');
        $barangay = DB::table('barangays')
            ->select(DB::raw('(barangays.barangay)'), 'municipalities.municipality')
            ->join('municipalities', 'barangays.muni_filter', "municipalities.code")
            ->get();
        $data = $this->model->findOrFail($id);
        $issue = Issue::findOrFail($data->issue_id);
        $interventions = Intervention::all();

        return inertia('Issues/Intervention/Create', [
            'editData' => $data,
            'barangays' => $barangay,
            'interventions' => $interventions,
            'issue' => $issue
        ]);
    }
    public function update(Request $request)
    {
        // dd($request);
        $request->validate([
            'issue_id' => 'required',
            'intervention_id' => 'required',
            'id' => 'required'
        ]);
        $is = IssueIntervention::where('id', $request->id)->first();
        $is->intervention_id = $request->intervention_id;
        $is->save();
        return redirect('issue-intervention/view/' . $request->issue_id)->with('message', "Issue Intervention successfully reported");
    }
    public function destroy(Request $request, $id)
    {
        $dat = $this->model->findOrFail($id);
        $dat->delete();
        return back()->with('message', 'Successfully deleted data');
    }
}
