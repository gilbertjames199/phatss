<?php

namespace App\Http\Controllers;

use App\Models\HealthCenter;
use App\Models\HouseHold;
use App\Models\PhatssData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Phpml\Clustering\DBSCAN;
use Phpml\Clustering\KMeans;

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
        DB::flushQueryLog();

        $data = HouseHold::where('id', '<>', '1')
            ->where('_Location_longitude', '<>', '')
            ->where('_Location_latitude', '<>', '')
            // ->whereRaw("TRIM(_Location_precision) <= 30")
            // ->where('municipality', 'Nabunturan')
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
            ->where('_Location_latitude', '<>', '')
            ->where('_Location_longitude', '<>', '')
            ->distinct(
                '_uuid'
            );
        // ->select(
        //     '_uuid',
        //     'relative_risk_assessment',
        //     '_Location_latitude',
        //     '_Location_longitude',
        //     'LAST_NAME',
        //     'FIRST_NAME',
        //     'MIDDLENAME',
        //     'purok_sitio',
        //     'barangay'
        // )
        // ,
        // 'relative_risk_assessment',
        // '_Location_latitude',
        // '_Location_longitude',
        // 'LAST_NAME',
        // 'FIRST_NAME',
        // 'MIDDLENAME',
        // 'purok_sitio',
        // 'barangay'
        $count = $data->get()->count();
        // dd($count);
        // $dataG0 = $this->dataGetter($request, 'Open Defecation G0');
        // $dataG1 = $this->dataGetter($request, 'Zero Open Defecation G1');
        // $dataG2 = $this->dataGetter($request, 'Basic Sanitation G2');
        // $dataG3 = $this->dataGetter($request, 'Safely Managed G3');
        // ->take(40500)
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
               MIN(_Location_latitude) AS _Location_latitude,
                MIN(_Location_longitude) AS _Location_longitude,
                MIN(LAST_NAME) AS LAST_NAME,
                MIN(FIRST_NAME) AS FIRST_NAME,
                MIN(MIDDLENAME) AS MIDDLENAME,
                MIN(purok_sitio) AS purok_sitio,
                MIN(barangay) AS barangay,
                MIN(_Location_precision) AS _Location_precision,
                MIN(_1_has_toilet) AS _1_has_toilet,
                MIN(_2_toilet_used) AS _2_toilet_used,
                MIN(_3_toilet_functional) AS _3_toilet_functional,
                MIN(_4_soap) AS _4_soap,
                MIN(_5_children) AS _5_children,
                MIN(_6_spaces) AS _6_spaces,
                MIN(_7_feces) AS _7_feces,
                MIN(_8_composting) AS _8_composting,
                MIN(_9_dispose) AS _9_dispose,
                MIN(_10_emptied) AS _10_emptied,
                MIN(_13_sewer) AS _13_sewer,
                MIN(_15_household) AS _15_household,
                MIN(_16_household) AS _16_household,
                MIN(_17_using) AS _17_using,
                MIN(_19_materials) AS _19_materials,
                MIN(risk_level) AS risk_level,
                MIN(relative_risk_assessment) AS relative_risk_assessment,
                FLOOR(_Location_latitude / " . $cluster_size . ") AS cluster_lat,
                FLOOR(_Location_longitude / (" . $cluster_size . " * COS(RADIANS(_Location_latitude)))) AS cluster_long,
                COUNT(*) AS cluster_size,
                GROUP_CONCAT(id) AS household_ids
            ")
            ->groupBy('cluster_lat', 'cluster_long')->get()->map(function ($item) {
                $count = (float) $item->risk_level * (float) $item->risk_level;
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
                    'count' =>  $count,
                    'name' => $item->LAST_NAME . ', ' . $item->FIRST_NAME . ' ' . $item->MIDDLENAME,
                    'address' => 'purok-' . $item->purok_sitio . ', ' . $item->barangay,
                    'precision' => $item->_Location_precision,
                    '_1_has_toilet' => $item->_1_has_toilet,
                    '_2_toilet_used' => $item->_2_toilet_used,
                    '_3_toilet_functional' => $item->_3_toilet_functional,
                    '_4_soap' => $item->_4_soap,
                    '_5_children' => $item->_5_children,
                    '_6_spaces' => $item->_6_spaces,
                    '_7_feces' => $item->_7_feces,
                    '_8_composting' => $item->_8_composting,
                    '_9_dispose' => $item->_9_dispose,
                    '_10_emptied' => $item->_10_emptied,
                    '_13_sewer' => $item->_13_sewer,
                    '_15_household' => $item->_15_household,
                    '_16_household' => $item->_16_household,
                    '_17_using' => $item->_17_using,
                    '_19_materials' => $item->_19_materials,
                    'risk_level' => $item->risk_level,
                    'relative_risk_assessment' => $item->relative_risk_assessment,
                    'cluster_size' => $item->cluster_size
                ];
            });
        // dd(count($data));
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
        // return inertia(
        //     'Route/Index'
        // );
        $lat = $request->lat;
        $long = $request->long;

        $nearestHealthCenter = HealthCenter::selectRaw(
            "id, type, municipality, barangay, Longitude, Latitude,
        (6371 * acos(cos(radians(?)) * cos(radians(Latitude))
        * cos(radians(Longitude) - radians(?))
        + sin(radians(?)) * sin(radians(Latitude)))) AS distance",
            [$lat, $long, $lat]
        )
            ->orderBy('distance')
            ->first();
        // dd($nearestHealthCenter);
        return inertia(
            'Route/RouteBack'
        );
    }
    public function kmeans(Request $request)
    {
        // $this->clusterSanitationData();
        $this->clusterHouseholds();
        // dd("k-means");
    }
    public function clusterSanitationData()
    {
        // Fetch required data from the database
        $data = DB::table('house_holds')
            ->select('municipality', 'barangay', '_Location_latitude', '_Location_longitude')
            ->whereNotNull('_Location_latitude')
            ->whereNotNull('_Location_longitude')
            ->get();

        // Convert data to an array for clustering
        $samples = [];
        $locations = [];

        foreach ($data as $row) {
            $samples[] = [(float) $row->_Location_latitude, (float) $row->_Location_longitude];
            $locations[] = [
                'municipality' => $row->municipality,
                'barangay' => $row->barangay,
                '_Location_latitude' => $row->_Location_latitude,
                '_Location_longitude' => $row->_Location_longitude
            ];
        }

        // Define number of clusters (adjust based on performance needs)
        $k = 5; // Choose an appropriate number of clusters

        // Apply k-means clustering
        $kmeans = new KMeans($k);
        $clusters = $kmeans->cluster($samples);

        // Calculate cluster centroids
        $centroids = [];
        foreach ($clusters as $cluster) {
            if (!empty($cluster)) {
                $latSum = 0;
                $lonSum = 0;
                $count = count($cluster);

                foreach ($cluster as $point) {
                    $latSum += $point[0];
                    $lonSum += $point[1];
                }

                $centroids[] = [
                    '_Location_latitude' => $latSum / $count,
                    '_Location_longitude' => $lonSum / $count
                ];
            }
        }
        if (empty($samples)) {
            return response()->json(['error' => 'No valid samples for clustering'], 400);
        }
        dd($centroids);

        // Return centroids to the frontend for heatmap visualization
        return response()->json($centroids);
    }
    public function clusterHouseholds()
    {
        // Step 1: Fetch data from database
        $households = DB::table('house_holds')
            ->select('id', 'municipality', 'barangay', '_Location_latitude', '_Location_longitude')
            ->whereNotNull('_Location_latitude')
            ->whereNotNull('_Location_longitude')
            ->get();

        // Step 2: Prepare data for clustering
        $samples = [];
        $mapping = []; // To track original data points

        foreach ($households as $household) {
            $samples[] = [(float) $household->_Location_latitude, (float) $household->_Location_longitude];
            $mapping[] = $household; // Store reference to original data
        }

        // Step 3: Apply DBSCAN clustering
        $epsilon = 0.01; // Adjust this based on your dataset (smaller = tighter clusters)
        $minPoints = 3; // Minimum points required to form a cluster

        $dbscan = new DBSCAN($epsilon, $minPoints);
        $clusters = $dbscan->cluster($samples);

        // Step 4: Map clusters back to original data
        $clusteredData = [];
        foreach ($clusters as $clusterIndex => $cluster) {
            foreach ($cluster as $pointIndex) {
                $household = $mapping[$pointIndex];
                $clusteredData[] = [
                    'id' => $household->id,
                    'municipality' => $household->municipality,
                    'barangay' => $household->barangay,
                    'latitude' => $household->_Location_latitude,
                    'longitude' => $household->_Location_longitude,
                    'cluster' => $clusterIndex, // Assign cluster ID
                ];
            }
        }

        return response()->json($clusteredData);
    }
}
