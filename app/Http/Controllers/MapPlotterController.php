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
                $query->where('municipality', 'LIKE', '%' . $mun . '%');
            })
            ->when($request->bar, function ($query, $bar) {
                $query->where('barangay', 'LIKE', '%' . $bar . '%');
            })
            ->when($request->pur, function ($query, $pur) {
                $query->where('purok_sitio', 'LIKE', '%' . $pur . '%');
            })
            ->when($request->my_filter == '_1_has_toilet', function ($query, $pur) {
                $query->where('_1_has_toilet', 'No');
            })
            ->when($request->my_filter == '_2_toilet_used', function ($query, $pur) {
                $query->where('_2_toilet_used', 'No');
            })
            ->when($request->my_filter == '_3_toilet_functional', function ($query, $pur) {
                $query->where('_3_toilet_functional', 'No');
            })
            ->when($request->my_filter == '_4_soap', function ($query, $pur) {
                $query->where('_4_soap', 'No');
            })
            ->when($request->my_filter == '_5_children', function ($query, $pur) {
                $query->where('_5_children', 'No');
            })
            ->when($request->my_filter == '_6_spaces', function ($query, $pur) {
                $query->where('_6_spaces', 'No');
            })
            ->when($request->my_filter == '_7_feces', function ($query, $pur) {
                $query->where('_7_feces', 'No');
            })
            ->when($request->my_filter == '_8_composting', function ($query, $pur) {
                $query->where('_8_composting', 'No');
            })
            ->when($request->my_filter == '_9_dispose', function ($query, $pur) {
                $query->where('_9_dispose', 'No');
            })
            ->when($request->my_filter == '_10_emptied', function ($query, $pur) {
                $query->where('_10_emptied', 'No');
            })
            ->when($request->my_filter == '_15_household', function ($query, $pur) {
                $query->where('_15_household', 'No');
            })
            ->when($request->my_filter == '_16_household', function ($query, $pur) {
                $query->where('_16_household', 'No');
            })->when($request->my_filter == '_17_using', function ($query, $pur) {
                $query->where('_17_using', 'No');
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
            "p_my_filter" => $request->my_filter,
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
