<?php

namespace App\Http\Controllers;

use App\Models\Intervention;
use Illuminate\Http\Request;

class InterventionController extends Controller
{
    private $model;
    public function __construct(Intervention $intervention)
    {
        $this->model = $intervention;
    }
    public function index(Request $request)
    {
        $data = $this->model->all();

        return inertia('Intervention/Index', [
            "data" => $data,
        ]);
    }
}
