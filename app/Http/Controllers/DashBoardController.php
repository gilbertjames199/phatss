<?php

namespace App\Http\Controllers;

use App\Models\HouseHold;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class DashBoardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    //$totalAll = $this->totalAll();



    public function index()
    {
        //dd('create: '.auth()->user()->can('create',User::class).'edit: '.auth()->user()->can('edit',User::class).'delete: '.auth()->user()->can('delete',User::class));
        // $hh = HouseHold::all();
        $us = auth()->user();
        $mun_us = $us->municipality;
        $bar_us = $us->barangay;
        $level = auth()->user()->level;
        if ($level == 'Municipal') {
            $place = 'barangay';
        } else if ($level == 'Barangay') {
            $place = 'purok_sitio';
        } else if ($level == 'Provincial') {
            $place = 'municipality';
        }
        $results = HouseHold::select([
            $place . ' as municipality',
            DB::raw("SUM(CASE WHEN relative_risk_assessment = 'Open Defecation G0' THEN 1 ELSE 0 END) AS Open_Defecation_G0"),
            DB::raw("SUM(CASE WHEN relative_risk_assessment = 'Zero Open Defecation G1' THEN 1 ELSE 0 END) Zero_Open_Defecation_G1"),
            // DB::raw("SUM(CASE WHEN relative_risk_assessment IN ('Zero Open Defecation G1', 'Open Defecation G0') THEN 1 ELSE 0 END) AS Zero_Open_Defecation_G1"),
            DB::raw("SUM(CASE WHEN relative_risk_assessment = 'Basic Sanitation G2' THEN 1 ELSE 0 END) AS Basic_Sanitation_G2"),
            DB::raw("SUM(CASE WHEN relative_risk_assessment = 'Safely Managed G3' THEN 1 ELSE 0 END) AS Safely_Managed_G3"),
            DB::raw("COUNT(*) AS total"),
        ])->where('municipality', '<>', '')
            ->when($level == 'Municipal', function ($query) use ($mun_us) {
                $query->where('municipality', $mun_us);
            })
            ->when($level == 'Barangay', function ($query) use ($bar_us) {
                $query->where('barangay', $bar_us);
            });

        if ($level == 'Barangay') {
            $results = $results->groupBy('purok_sitio')->get();
        } else if ($level == 'Municipal') {
            $results = $results->groupBy('barangay')->get();
        } else {
            $results = $results->groupBy('municipality')->get();
        }

        // dd($results);
        $dt_g0 = $results->pluck('Open_Defecation_G0');
        $dt_g1 = $results->pluck('Zero_Open_Defecation_G1');
        $dt_g2 = $results->pluck('Basic_Sanitation_G2');
        $dt_g3 = $results->pluck('Safely_Managed_G3');
        $mun = $results->pluck('municipality');
        $total = $results->pluck('total');

        $with_toilets = HouseHold::where('_1_has_toilet', 'Yes')
            ->when($level == 'Municipal', function ($query) use ($mun_us) {
                $query->where('municipality', $mun_us);
            })
            ->when($level == 'Barangay', function ($query) use ($bar_us) {
                $query->where('barangay', $bar_us);
            })
            ->count();
        $with_functional_toilet = HouseHold::where('_3_toilet_functional', 'Yes')->where('_1_has_toilet', 'Yes')
            ->when($level == 'Municipal', function ($query) use ($mun_us) {
                $query->where('municipality', $mun_us);
            })
            ->when($level == 'Barangay', function ($query) use ($bar_us) {
                $query->where('barangay', $bar_us);
            })->count();
        // $_8_composting = HouseHold::where('_8_composting', 'Yes')->count();
        $_8_composting = 0;
        return inertia('Home', [
            "with_toilets" => $with_toilets,
            "with_functional_toilet" => $with_functional_toilet,
            "_8_composting" => $_8_composting,
            "results" => $results,
            "dt_g0" => $dt_g0,
            "dt_g1" => $dt_g1,
            "dt_g2" => $dt_g2,
            "dt_g3" => $dt_g3,
            "total" => $total,
            "data_by_mun_label" => $mun,
            "can" => [
                'createUser' => Auth::user()->can('create', User::class),
                'editUser' => Auth::user()->can('edit', User::class),
                'deleteUser' => Auth::user()->can('delete', User::class),
                'canViewUsers' => Auth::user()->can('can_view_users', User::class),
                'canInsertUsers' => Auth::user()->can('can_insert_users', User::class),
                'canEditUsers' => Auth::user()->can('can_edit_users', User::class),
                'canDeleteUsers' => Auth::user()->can('can_delete_users', User::class),
                'canUpdateUserPermissions' => Auth::user()->can('can_update_user_permissions', User::class),
            ],
        ]);
    }
    public function videos(Request $request)
    {
        return inertia('Videos/Index');
    }
}
