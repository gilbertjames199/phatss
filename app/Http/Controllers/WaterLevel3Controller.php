<?php

namespace App\Http\Controllers;

use App\Models\HouseHold;
use App\Models\PhatssData;
use App\Models\WaterLevel3;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WaterLevel3Controller extends Controller
{
    protected $w3;
    //
    public function __construct(WaterLevel3 $w3)
    {
        $this->w3 = $w3;
    }
    public function index(Request $request)
    {
        $mun = $request->mun;
        $bar = $request->bar;
        $pur = $request->purok;
        // dd($request);

        $relrisk = NULL;
        if ($request->relrisk) {
            $relrisk = $request->relrisk;
        }
        $us = auth()->user();
        $mun_us = $us->municipality;
        $bar_us = $us->barangay;
        $level = auth()->user()->level;
        if ($level == 'Municipal') {
            $mun = $mun_us;
            $request->merge(['mun' => $mun_us]);
        } else if ($level == 'Barangay') {
            $bar = $bar_us;
            $request->merge(['mun' => $mun_us]);
            $request->merge(['bar' => $bar_us]);
        }
        DB::flushQueryLog();
        $data = WaterLevel3::where('longitude', '<>', '')
            ->where('latitude', '<>', '')
            ->when($level == 'Municipal', function ($query) use ($mun_us) {
                $query->where('municipality', $mun_us);
            })
            ->when($level == 'Barangay', function ($query) use ($bar_us) {
                $query->where('barangay', $bar_us);
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
            ->when($request->relrisk, function ($query, $relrisk) {
                $query->where('risk', 'LIKE', '%' . $relrisk . '%');
            })
            ->distinct(
                'id'
            );

        $count = $data->get()->count();

        $cluster_size = '0.0022';
        if (!empty($request->mun)) {
            $cluster_size = '0.0009'; // Approx. 100m
        }
        if (!empty($request->bar)) {
            $cluster_size = '0.00018'; // Approx. 20m
        }
        if (!empty($request->pur)) {
            $cluster_size = '0.00009'; // Approx. 10m
        }
        $data = $data->selectRaw("
               MIN(latitude) AS latitude,
                MIN(longitude) AS longitude,
                MIN(TypeofWS) AS TypeofWS,
                MIN(SourceWS) AS SourceWS,
                MIN(NameWS) AS NameWS,
                MIN(NameOwner) AS NameOwner,
                MIN(purok_sitio) AS purok_sitio,
                MIN(barangay) AS barangay,
                MIN(accuracy) AS accuracy,
                MIN(risk) AS risk_level,
                FLOOR(latitude / " . $cluster_size . ") AS cluster_lat,
                FLOOR(longitude / (" . $cluster_size . " * COS(RADIANS(latitude)))) AS cluster_long,
                COUNT(*) AS cluster_size,
                GROUP_CONCAT(id) AS ws_ids
            ")
            ->groupBy('cluster_lat', 'cluster_long')->get()->map(function ($item) {
                // $count = (float) $item->risk_level * (float) $item->risk_level;
                // $count = 10;
                // if ($item->relative_risk_assessment == 'Basic Sanitation G2') {
                //     $count = 20;
                // } else if ($item->relative_risk_assessment == 'Safely Managed G3') {
                //     $count = 10;
                // } else if ($item->relative_risk_assessment == 'Zero Open Defecation G1') {
                //     $count = 30;
                // } else if ($item->relative_risk_assessment == 'Open Defecation G0') {
                //     $count = 40;
                // }
                // dd($item);
                return [
                    'x' => (float) $item->latitude,
                    'y' => (float) $item->longitude,
                    'count' => ((float)$item->cluster_size),
                    'name' => $item->LAST_NameWSNAME . ' - ' . $item->NameOwner,
                    'source' => $item->SourceWS . ' - ' . $item->TypeofWS,
                    'address' => 'purok-' . $item->purok_sitio . ', ' . $item->barangay,
                    'precision' => $item->_Location_precision,
                    'risk_level' => $item->risk_level,
                    'relative_risk_assessment' => $item->risk_level,
                    'cluster_size' => $item->cluster_size
                ];
            });
        // dd(count($data));
        // dd($dataG1);
        // dd($data->pluck('count'));
        $municipalities = WaterLevel3::where('municipality', '<>', 'MUNICIPALITY')
            ->where('municipality', '<>', '')
            ->distinct('municipality')
            ->orderBy('municipality', 'ASC')
            ->pluck('municipality');
        // dd($municipalities);
        $barangays = [];
        if ($mun) {
            $barangays = WaterLevel3::where('municipality', 'LIKE', '%' . $mun . '%')
                ->distinct('barangay')
                ->orderBy('barangay', 'ASC')
                ->pluck('barangay');
            // dd($bar);
        }
        $puroks = [];
        if ($bar) {
            $puroks = WaterLevel3::where('barangay', 'LIKE', '%' . $bar . '%')
                ->distinct('purok_sitio')
                ->orderBy('purok_sitio', 'ASC')
                ->pluck('purok_sitio');
        }
        // dd(count($data));
        return inertia('WaterResource/Level3/Index', [
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
}
