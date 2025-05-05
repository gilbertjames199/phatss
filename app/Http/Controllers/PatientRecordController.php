<?php

namespace App\Http\Controllers;

use App\Models\PatientClinicalRecord;
use App\Models\PatientRecord;
use App\Models\PhatssData;
use Illuminate\Http\Client\Request as ClientRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PatientRecordController extends Controller
{
    //
    protected $p_record, $p_clinical_record;
    public function __construct(PatientRecord $p_record, PatientClinicalRecord $p_clinical_record)
    {
        $this->p_record = $p_record;
        $this->p_clinical_record = $p_clinical_record;
    }
    public function index(Request $request)
    {
        $data = PatientRecord::simplePaginate(10);
        return inertia('Patient/Index', [
            "filters" => $request->only(['search']),
            "data" => $data
        ]);
    }
    public function create(Request $request)
    {
        $mun = $request->mun;
        $bar = $request->bar;
        $pur = $request->purok;

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
        $data = PatientRecord::when($level == 'Municipal', function ($query) use ($mun_us) {
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
            ->get();


        return  inertia('Patient/Create', [
            // "filters" => $request->only(['search']),
            "patients" => $data,
            "p_mun" => $request->mun,
            "p_bar" => $request->bar,
            "p_pur" => $request->pur,
            "barangays" => $barangays,
            "municipalities" => $municipalities,
            "puroks" => $puroks
        ]);
    }
}
