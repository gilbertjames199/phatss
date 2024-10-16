<?php

namespace App\Http\Controllers;

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
        $data = PhatssData::where('id', '<>', '1')->get()->map(function ($item) {
            return [
                (float) $item->_Location_longitude,
                (float) $item->_Location_altitude,
                (float) $item->_Location_precision
            ];
        });

        return inertia('MapThem/heatMap', [
            "data" => $data
        ]);
    }
}
