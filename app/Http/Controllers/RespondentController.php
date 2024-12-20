<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RespondentController extends Controller
{
    //
    public function index(Request $request)
    {
        return inertia('Respondent/Index');
    }
}
