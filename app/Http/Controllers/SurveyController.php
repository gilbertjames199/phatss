<?php

namespace App\Http\Controllers;

use App\Models\PhatssData;
use App\Models\PhattsData2;
use Illuminate\Http\Request;

class SurveyController extends Controller
{
    protected $p_data, $p_data2;
    //
    public function __construct(PhatssData $p_data, PhattsData2 $p_data2)
    {
        $this->p_data = $p_data;
        $this->p_data2 = $p_data2;
    }
    public function index(Request $request) {}
    public function create(Request $request)
    {
        return inertia('SurveyForm/Household');
    }
}
