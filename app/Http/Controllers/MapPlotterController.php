<?php

namespace App\Http\Controllers;

use App\Models\HouseHold;
use App\Models\PhatssData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MapPlotterController extends Controller
{
    private $p_data;
    public function __construct(PhatssData $p_data)
    {
        $this->p_data = $p_data;
    }
    public function index(Request $request)
    {
        $google_points = PhatssData::select('_Location_latitude', '_Location_longitude', '_Location_altitude')
            ->limit(10)
            ->get();
        // $google_points = PhatssData::select(
        //     DB::raw('CAST(_Location_latitude AS DECIMAL(10, 6)) as latitude'),
        //     DB::raw('CAST(_Location_longitude AS DECIMAL(10, 6)) as longitude'),
        //     DB::raw('CAST(_Location_altitude AS DECIMAL(10, 2)) as altitude')
        // )
        //     ->limit(2000)
        //     ->get();
        $google_points = PhatssData::select(
            DB::raw('CAST(_Location_latitude AS DECIMAL(10, 6)) AS _Location_latitude'),
            DB::raw('CAST(_Location_longitude AS DECIMAL(10, 6)) AS _Location_longitude'),
            DB::raw('CAST(_Location_altitude AS DECIMAL(10, 2)) AS _Location_altitude')
        )
            ->where('_Location_latitude', '<>', '0')
            ->where('_Location_longitude', '<>', '0')
            ->limit(10)
            ->get();
        return inertia(
            'MapThem/Index',
            ["google_points" => $google_points]
        );
    }
    public function heat_map(Request $request)
    {
        // 'lat' => (float) $item->_Location_longitude,
        //             'lng' => (float) $item->_Location_altitude,
        //             'count' => (float) $item->_Location_precision
        // dd($request);
        $mun = $request->mun;
        $bar = $request->bar;
        $pur = $request->purok;
        // dd($request);

        $relrisk = NULL;
        if ($request->relrisk) {
            $relrisk = $request->relrisk;
            // if ($relrisk == 'G0') {
            //     // dd($relrisk);
            //     $relrisk = 'G7';
            // }
        }
        // dd("heat");
        // dd($relrisk);
        $data = HouseHold::where('id', '<>', '1')
            ->where('_Location_longitude', '<>', '')
            ->where('_Location_latitude', '<>', '')
            ->when($relrisk, function ($query, $relrisk) {
                // dd($relrisk);
                $query->where('relative_risk_assessment', 'LIKE', '%' . $relrisk . '%');
            })
            ->when($request->mun, function ($query, $mun) {
                // dd($relrisk);
                // dd($mun);
                $query->where('municipality', 'LIKE', '%' . $mun . '%');
            })
            ->when($request->bar, function ($query, $bar) {
                // dd($relrisk);
                // dd($mun);
                $query->where('barangay', 'LIKE', '%' . $bar . '%');
            })
            ->when($request->pur, function ($query, $pur) {
                // dd($relrisk);
                // dd($mun);
                $query->where('purok_sitio', 'LIKE', '%' . $pur . '%');
            })
            ->distinct('_uuid');

        $count = $data->count();
        // $dataG0 = $this->dataGetter($request, 'Open Defecation G0');
        // $dataG1 = $this->dataGetter($request, 'Zero Open Defecation G1');
        // $dataG2 = $this->dataGetter($request, 'Basic Sanitation G2');
        // $dataG3 = $this->dataGetter($request, 'Safely Managed G3');
        $data = $data->get()->map(function ($item) {
            // $count = (float) $item->risk_level * (float) $item->risk_level;
            $count = 10;
            if ($item->relative_risk_assessment == 'Basic Sanitation G2') {
                $count = 20;
            } else if ($item->relative_risk_assessment == 'Safely Managed G3') {
                $count = 10;
            } else if ($item->relative_risk_assessment == 'Zero Open Defecation G1') {
                $count = 30;
            } else if ($item->relative_risk_assessment == 'Open Defecation G0') {
                $count = 40;
            }
            return [
                'x' => (float) $item->_Location_latitude,
                'y' => (float) $item->_Location_longitude,
                'count' => $count,
                'name' => $item->LAST_NAME . ', ' . $item->FIRST_NAME . ' ' . $item->MIDDLENAME,
                'address' => 'purok-' . $item->purok_sitio . ', ' . $item->barangay,
                'relative_risk_assessment' => $item->relative_risk_assessment
            ];
        });



        // dd($dataG1);
        // dd($data->pluck('count'));
        $municipalities = PhatssData::where('municipality', '<>', 'MUNICIPALITY')
            ->where('municipality', '<>', '')
            ->distinct('municipality')
            ->orderBy('municipality', 'ASC')
            ->pluck('municipality');
        // dd($municipalities);
        $barangays = [];
        if ($mun) {
            $barangays = PhatssData::where('municipality', 'LIKE', '%' . $mun . '%')
                ->distinct('barangay')
                ->orderBy('barangay', 'ASC')
                ->pluck('barangay');
            // dd($bar);
        }
        $puroks = [];
        if ($bar) {
            $puroks = PhatssData::where('barangay', 'LIKE', '%' . $bar . '%')
                ->distinct('purok_sitio')
                ->orderBy('purok_sitio', 'ASC')
                ->pluck('purok_sitio');
        }
        return inertia('MapThem/heatMap', [
            "p_data" => $data,
            // "g0" => $dataG0,
            // "g1" => $dataG1,
            // "g2" => $dataG2,
            // "g3" => $dataG3,
            "count" => $count,
            "p_mun" => $request->mun,
            "p_bar" => $request->bar,
            "p_pur" => $request->pur,
            "p_relrisk" => $request->relrisk,
            "barangays" => $barangays,
            "municipalities" => $municipalities,
            "puroks" => $puroks
        ]);
    }
    private function dataGetter(Request $request, $relative_risk_assessment)
    {
        $data = HouseHold::where('id', '<>', '1')
            ->where('_Location_longitude', '<>', '')
            ->where('_Location_latitude', '<>', '')
            ->when($request->mun, function ($query, $mun) {
                // dd($relrisk);
                // dd($mun);
                $query->where('municipality', 'LIKE', '%' . $mun . '%');
            })
            ->when($request->bar, function ($query, $bar) {
                // dd($relrisk);
                // dd($mun);
                $query->where('barangay', 'LIKE', '%' . $bar . '%');
            })
            ->when($request->pur, function ($query, $pur) {
                // dd($relrisk);
                // dd($mun);
                $query->where('purok_sitio', 'LIKE', '%' . $pur . '%');
            })
            ->where('relative_risk_assessment', $relative_risk_assessment)
            ->distinct('_uuid')
            ->get()->map(function ($item) {
                // $count = (float) $item->risk_level * (float) $item->risk_level;
                $count = 10;
                if ($item->relative_risk_assessment == 'Basic Sanitation G2') {
                    $count = 20;
                } else if ($item->relative_risk_assessment == 'Safely Managed G3') {
                    $count = 10;
                } else if ($item->relative_risk_assessment == 'Zero Open Defecation G1') {
                    $count = 30;
                } else if ($item->relative_risk_assessment == 'Open Defecation G0') {
                    $count = 40;
                }
                return [
                    'x' => (float) $item->_Location_latitude,
                    'y' => (float) $item->_Location_longitude,
                    'count' => $count,
                    'name' => $item->LAST_NAME . ', ' . $item->FIRST_NAME . ' ' . $item->MIDDLENAME,
                    'address' => $item->purok_sitio . ', ' . $item->barangay,
                    'relative_risk_assessment' => $item->relative_risk_assessment
                ];
            });

        return $data;
    }
    public function route_optimize(Request $request)
    {
        // dd("route optimization");
        return inertia(
            'Route/Index'
        );
    }
}
