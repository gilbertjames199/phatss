<?php

namespace App\Http\Controllers;

use App\Models\ResponseCenter;
use Illuminate\Http\Request;

class ResponseCenterController extends Controller
{
    //
    protected $model;
    public function __construct(ResponseCenter $model)
    {
        $this->model = $model;
    }
    public function index(Request $request) {}
}
