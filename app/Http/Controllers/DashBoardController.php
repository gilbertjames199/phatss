<?php

namespace App\Http\Controllers;

use App\Models\HouseHold;
use App\Models\PhatssData;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class DashBoardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    //$totalAll = $this->totalAll();



    public function index(Request $request)
    {
        //dd('create: '.auth()->user()->can('create',User::class).'edit: '.auth()->user()->can('edit',User::class).'delete: '.auth()->user()->can('delete',User::class));
        // $hh = HouseHold::all();

        $mun = $request->mun;
        $bar = $request->bar;
        $year = $request->year;
        $pur = $request->purok;

        $us = auth()->user();
        $mun_us = $us->municipality;
        $bar_us = $us->barangay;
        $level = auth()->user()->level;
        $place = "";
        if ($level == 'Municipal') {
            if ($bar) {

                $place = 'purok_sitio';
            }
            if (!$bar) {
                $place = 'barangay';
            }
        } else if ($level == 'Barangay') {
            $place = 'purok_sitio';
        } else if ($level == 'Provincial') {
            $place = 'municipality';
            if ($mun) {
                $place = 'barangay';
            }
            if ($bar) {

                $place = 'purok_sitio';
            }
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
            })
            ->when($mun,  function ($query) use ($mun) {
                $query->where('municipality', $mun);
            })
            ->when($bar,  function ($query) use ($bar) {
                $query->where('barangay', $bar);
            })
            ->when($year, function ($query) use ($year) {
                $query->whereYear('date_survey', $year);
            });
        // ->when($pur,  function ($query) use ($pur) {
        //     $query->where('barangay', $bar);
        // });

        if ($level == 'Barangay') {
            $results = $results->groupBy('purok_sitio')->get();
        } else if ($level == 'Municipal') {

            if ($bar) {

                $results = $results->groupBy('purok_sitio')->get();
            }
            if (!$bar) {

                $results = $results->groupBy('barangay')->get();
            }
        } else if ($level == 'Provincial') {
            if ($mun && !$bar) {

                $results = $results->groupBy('barangay')->get();
            }
            if ($bar) {
                $results = $results->groupBy('purok_sitio')->get();
            }
            if (!$mun && !$bar) {
                $results = $results->groupBy('municipality')->get();
            }
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
            ->when($request->mun,  function ($query) use ($request) {
                $query->where('municipality', $request->mun);
            })
            ->when($bar,  function ($query) use ($bar) {
                $query->where('barangay', $bar);
            })
            ->when($year, function ($query) use ($year) {
                $query->whereYear('date_survey', $year);
            })
            ->count();
        $with_functional_toilet = HouseHold::where('_3_toilet_functional', 'Yes')->where('_1_has_toilet', 'Yes')
            ->when($level == 'Municipal', function ($query) use ($mun_us) {
                $query->where('municipality', $mun_us);
            })
            ->when($level == 'Barangay', function ($query) use ($bar_us) {
                $query->where('barangay', $bar_us);
            })
            ->when($request->mun,  function ($query) use ($request) {
                $query->where('municipality', $request->mun);
            })
            ->when($bar,  function ($query) use ($bar) {
                $query->where('barangay', $bar);
            })
            ->when($year, function ($query) use ($year) {
                $query->whereYear('date_survey', $year);
            })
            ->count();
        // $_8_composting = HouseHold::where('_8_composting', 'Yes')->count();
        $_8_composting = 0;
        $municipalities = HouseHold::where('municipality', '<>', 'MUNICIPALITY')
            ->where('municipality', '<>', '')
            ->distinct('municipality')
            ->orderBy('municipality', 'ASC')
            ->pluck('municipality');
        // dd($municipalities);
        $barangays = [];
        if ($mun) {
            if ($level == 'Municipal') {
                $munfilter = $mun_us;
            } else {
                $munfilter = $request->mun;
            }
            $barangays = HouseHold::where('municipality', 'LIKE', '%' . $munfilter . '%')
                ->distinct('barangay')
                ->orderBy('barangay', 'ASC')
                ->pluck('barangay');
            // dd($mun);
        }
        $puroks = [];
        // if ($bar) {
        //     $puroks = PhatssData::where('barangay', 'LIKE', '%' . $request->bar . '%')
        //         ->distinct('purok_sitio')
        //         ->orderBy('purok_sitio', 'ASC')
        //         ->pluck('purok_sitio');
        // }
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
            "barangays" => $barangays,
            "municipalities" => $municipalities,
            "puroks" => $puroks,
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
    public function m_login(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        // Find user by username
        $user = User::where('email', $request->username)->first();

        // Check if user exists
        if (!$user) {
            return response()->json([
                'error' => 'Username not found'
            ], 404);
        }

        // Check password
        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'error' => 'Incorrect credentials'
            ], 401);
        }

        // If credentials are valid, return success (you can return token or user info as needed)
        return response()->json([
            'message' => 'Login successful',
            'user' => $user // Or just needed parts of user
        ], 200);
    }
}
