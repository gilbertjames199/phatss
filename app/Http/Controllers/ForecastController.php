<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ForecastController extends Controller
{
    //
    public function index(Request $request)
    {
        return inertia('Forecasting/Index');
    }
}
