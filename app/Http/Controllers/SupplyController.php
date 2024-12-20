<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SupplyController extends Controller
{
    //
    public function index(Request $request)
    {
        // dd("supply");
        return inertia('Supply/Index', [
            // "filters" => $request->only(['search']),
            // "data" => $data,
        ]);
    }
}
