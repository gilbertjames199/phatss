<?php

namespace App\Http\Controllers;

use App\Models\HouseHold;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class ForecastController extends Controller
{
    //
    public function index(Request $request)
    {
        return inertia('Forecasting/Index');
    }
    public function sanitation_level(Request $request)
    {

        $municipalities = HouseHold::select(
            'municipality',
            DB::raw("AVG(CASE WHEN _1_has_toilet = 'Yes' THEN 1 ELSE 0 END) AS avg_1_has_toilet"),
            DB::raw("AVG(CASE WHEN _2_toilet_used = 'Yes' THEN 1 ELSE 0 END) AS avg_2_toilet_used"),
            DB::raw("AVG(CASE WHEN _3_toilet_functional = 'Yes' THEN 1 ELSE 0 END) AS avg_3_toilet_functional"),
            DB::raw("AVG(CASE WHEN _4_soap = 'Yes' THEN 1 ELSE 0 END) AS avg_4_soap"),
            DB::raw("AVG(CASE WHEN _5_children = 'Yes' THEN 1 ELSE 0 END) AS avg_5_children"),
            DB::raw("AVG(CASE WHEN _6_spaces = 'Yes' THEN 1 ELSE 0 END) AS avg_6_spaces"),
            DB::raw("AVG(CASE WHEN _7_feces = 'Yes' THEN 1 ELSE 0 END) AS avg_7_feces"),
            DB::raw("AVG(CASE WHEN _8_composting = 'Yes' THEN 1 ELSE 0 END) AS avg_8_composting"),
            DB::raw("AVG(CASE WHEN _9_dispose = 'Yes' THEN 1 ELSE 0 END) AS avg_9_dispose"),
            DB::raw("AVG(CASE WHEN _10_emptied = 'Yes' THEN 1 WHEN _10_emptied = 'No' THEN 0 END) AS avg_10_emptied"),
            DB::raw("AVG(CASE WHEN _13_sewer = 'Yes' THEN 1 WHEN _13_sewer = 'No' THEN 0 END) AS avg_13_sewer"),
            DB::raw("AVG(CASE WHEN _15_household = 'Yes' THEN 1 WHEN _15_household = 'No' THEN 0 END) AS avg_15_household"),
            DB::raw("AVG(CASE WHEN _16_household = 'Yes' THEN 0 WHEN _16_household = 'No' THEN 0 END) AS avg_16_household"),
            DB::raw("AVG(CASE WHEN _17_using = 'Yes' THEN 1 WHEN _17_using = 'No' THEN 0 END) AS avg_17_using"),
            DB::raw("AVG(CASE WHEN _19_materials = 'Yes' THEN 1 WHEN _19_materials = 'No' THEN 0 END) AS avg_19_materials"),
            DB::raw("AVG(
        CASE
            WHEN relative_risk_assessment = 'Open Defecation G0' THEN 0
            WHEN relative_risk_assessment = 'Zero Open Defecation G1' THEN 0
            WHEN relative_risk_assessment = 'Basic Sanitation G2' THEN 1
            WHEN relative_risk_assessment = 'Safely Managed G3' THEN 1
        END
    ) AS avg_relative_risk_assessment")
        )
            ->where('municipality', '<>', '')
            ->where('barangay', '<>', '')
            ->groupBy('municipality')
            ->orderBy('municipality')
            ->get()
            ->map(function ($item) {
                $queryParams = [
                    '_1_has_toilet' => round($item->avg_1_has_toilet),
                    '_2_toilet_used' => round($item->avg_2_toilet_used),
                    '_3_toilet_functional' => round($item->avg_3_toilet_functional),
                    '_4_soap' => round($item->avg_4_soap),
                    '_5_children' => round($item->avg_5_children),
                    '_6_spaces' => round($item->avg_6_spaces),
                    '_7_feces' => round($item->avg_7_feces),
                    '_8_composting' => round($item->avg_8_composting),
                    '_9_dispose' => round($item->avg_9_dispose),
                    '_10_emptied' => round($item->avg_10_emptied),
                    '_13_sewer' => round($item->avg_13_sewer),
                    '_15_household' => round($item->avg_15_household),
                    '_16_household' => round($item->avg_16_household),
                    '_17_using' => round($item->avg_17_using),
                    '_19_materials' => round($item->avg_19_materials),
                ];
                $total_score = array_sum($queryParams);

                // Call the API
                $response = Http::get("http://eservices.dvodeoro.ph:5000/predict", $queryParams);

                // Extract risk assessment value
                $sanitation_status = "Good Sanitation";
                if ($response->successful() && isset($response->json()['relative_risk_assessment'])) {
                    $sanitation_status = $response->json()['relative_risk_assessment'] == 0
                        ? 'Bad/Inadequate Sanitation'
                        : 'Good Sanitation';
                } else {
                    $sanitation_status = 'Unknown';
                }
                // Determine Phatss value
                $phatss = $this->getPhatss($queryParams, $total_score);

                // Construct API URL with parameters
                // $apiBaseUrl = "http://eservices.dvodeoro.ph:5000/predict";
                // $apiUrl = $apiBaseUrl . '?' . http_build_query($queryParams);
                return [
                    "municipality" => $item->municipality,
                    "sanitation_status" => $sanitation_status,
                    "avg_6_spaces" => round($item->avg_6_spaces),
                    "avg_7_feces" => round($item->avg_7_feces),
                    "relative_risk_assessment" => $phatss,
                ];
            });
        // dd($municipalities);
        return inertia('Forecasting/SanitationLevel', [
            "data" => $municipalities,
            "filters" => $request->only(['search']),
        ]);
    }
    public function getBarangays(Request $request, $mun)
    {
        // dd($mun);
        return HouseHold::select(
            'barangay',
            DB::raw("AVG(CASE WHEN _1_has_toilet = 'Yes' THEN 1 ELSE 0 END) AS avg_1_has_toilet"),
            DB::raw("AVG(CASE WHEN _2_toilet_used = 'Yes' THEN 1 ELSE 0 END) AS avg_2_toilet_used"),
            DB::raw("AVG(CASE WHEN _3_toilet_functional = 'Yes' THEN 1 ELSE 0 END) AS avg_3_toilet_functional"),
            DB::raw("AVG(CASE WHEN _4_soap = 'Yes' THEN 1 ELSE 0 END) AS avg_4_soap"),
            DB::raw("AVG(CASE WHEN _5_children = 'Yes' THEN 1 ELSE 0 END) AS avg_5_children"),
            DB::raw("AVG(CASE WHEN _6_spaces = 'Yes' THEN 1 ELSE 0 END) AS avg_6_spaces"),
            DB::raw("AVG(CASE WHEN _7_feces = 'Yes' THEN 1 ELSE 0 END) AS avg_7_feces"),
            DB::raw("AVG(CASE WHEN _8_composting = 'Yes' THEN 1 ELSE 0 END) AS avg_8_composting"),
            DB::raw("AVG(CASE WHEN _9_dispose = 'Yes' THEN 1 ELSE 0 END) AS avg_9_dispose"),
            DB::raw("AVG(CASE WHEN _10_emptied = 'Yes' THEN 1 WHEN _10_emptied = 'No' THEN 0 END) AS avg_10_emptied"),
            DB::raw("AVG(CASE WHEN _13_sewer = 'Yes' THEN 1 WHEN _13_sewer = 'No' THEN 0 END) AS avg_13_sewer"),
            DB::raw("AVG(CASE WHEN _15_household = 'Yes' THEN 1 WHEN _15_household = 'No' THEN 0 END) AS avg_15_household"),
            DB::raw("AVG(CASE WHEN _16_household = 'Yes' THEN 0 WHEN _16_household = 'No' THEN 0 END) AS avg_16_household"),
            DB::raw("AVG(CASE WHEN _17_using = 'Yes' THEN 1 WHEN _17_using = 'No' THEN 0 END) AS avg_17_using"),
            DB::raw("AVG(CASE WHEN _19_materials = 'Yes' THEN 1 WHEN _19_materials = 'No' THEN 0 END) AS avg_19_materials"),
            DB::raw("AVG(
                CASE
                    WHEN relative_risk_assessment = 'Open Defecation G0' THEN 0
                    WHEN relative_risk_assessment = 'Zero Open Defecation G1' THEN 0
                    WHEN relative_risk_assessment = 'Basic Sanitation G2' THEN 1
                    WHEN relative_risk_assessment = 'Safely Managed G3' THEN 1
                END
                ) AS avg_relative_risk_assessment")
        )
            ->where('municipality', '=', $mun)
            ->where('barangay', '<>', '')
            ->groupBy('barangay')
            ->orderBy('barangay')
            ->get()
            ->map(function ($item) {
                $queryParams = [
                    '_1_has_toilet' => round($item->avg_1_has_toilet),
                    '_2_toilet_used' => round($item->avg_2_toilet_used),
                    '_3_toilet_functional' => round($item->avg_3_toilet_functional),
                    '_4_soap' => round($item->avg_4_soap),
                    '_5_children' => round($item->avg_5_children),
                    '_6_spaces' => round($item->avg_6_spaces),
                    '_7_feces' => round($item->avg_7_feces),
                    '_8_composting' => round($item->avg_8_composting),
                    '_9_dispose' => round($item->avg_9_dispose),
                    '_10_emptied' => round($item->avg_10_emptied),
                    '_13_sewer' => round($item->avg_13_sewer),
                    '_15_household' => round($item->avg_15_household),
                    '_16_household' => round($item->avg_16_household),
                    '_17_using' => round($item->avg_17_using),
                    '_19_materials' => round($item->avg_19_materials),
                ];
                $total_score = array_sum($queryParams);

                // Call the API
                $response = Http::get("http://eservices.dvodeoro.ph:5000/predict", $queryParams);

                // Extract risk assessment value
                $sanitation_status = "Good Sanitation";
                if ($response->successful() && isset($response->json()['relative_risk_assessment'])) {
                    $sanitation_status = $response->json()['relative_risk_assessment'] == 0
                        ? 'Bad/Inadequate Sanitation'
                        : 'Good Sanitation';
                } else {
                    $sanitation_status = 'Unknown';
                }
                // Determine Phatss value
                $phatss = $this->getPhatss($queryParams, $total_score);

                // Construct API URL with parameters
                // $apiBaseUrl = "http://eservices.dvodeoro.ph:5000/predict";
                // $apiUrl = $apiBaseUrl . '?' . http_build_query($queryParams);
                return [
                    "barangay" => $item->barangay,
                    "sanitation_status" => $sanitation_status,
                    "avg_6_spaces" => round($item->avg_6_spaces),
                    "avg_7_feces" => round($item->avg_7_feces),
                    "relative_risk_assessment" => $phatss,
                ];
            });
    }

    public function getHouseholds(Request $request, $type, $location)
    {
        return HouseHold::where('barangay', '=', $location)
            ->orWhere('municipality', '=', $location)
            ->paginate(500);
    }
    public function getPhatss($queryParams, $total_score)
    {
        if ($queryParams['_6_spaces'] == 0 || $queryParams['_7_feces'] == 0) {
            $phatss = 'Open Defecation G0';
        } elseif ($total_score < 8) {
            $phatss = 'Open Defecation G0';
        } elseif ($total_score < 12) {
            $phatss = 'Zero Open Defecation G1';
        } elseif ($total_score < 13) {
            $phatss = 'Basic Sanitation G2';
        } else {
            $phatss = 'Sustainable Sanitation G3';
        }

        return $phatss;
    }
}
