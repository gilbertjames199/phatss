<?php

namespace App\Http\Controllers;

use App\Models\Barangay;
use App\Models\Municipality;
use App\Models\PurokSitio;
use Illuminate\Http\Request;

class PlaceController extends Controller
{
    protected $bar, $mun;
    public function __construct(Barangay $bar, Municipality $mun)
    {
        $this->bar = $bar;
        $this->mun = $mun;
    }
    public function index(Request $request) {}
    public function bar(Request $request, $mun)
    {
        $mun_code = $this->getMunCode($mun);
        // dd($mun);
        return [
            "data" => Barangay::where('muni_filter', $mun_code)->get()
        ];
    }
    private function getMunCode($mun)
    {
        if ($mun == 'Compostela') {
            return '01';
        } else if ($mun == 'Laak') {
            return '02';
        } else if ($mun == 'Mabini') {
            return '03';
        } else if ($mun == 'Maco') {
            return '04';
        } else if ($mun == 'Maragusan') {
            return '05';
        } else if ($mun == 'Mawab') {
            return '06';
        } else if ($mun == 'Monkayo') {
            return '07';
        } else if ($mun == 'Montevista') {
            return '08';
        } else if ($mun == 'Nabunturan') {
            return '09';
        } else if ($mun == 'New Bataan') {
            return '10';
        } else if ($mun == 'Pantukan') {
            return '11';
        } else {
            return '00';
        }
    }
    public function pur(Request $request, $bar)
    {
        // dd($bar);
        return [
            "data" => PurokSitio::where('purok_filter', $bar)->get()
        ];
    }
}
