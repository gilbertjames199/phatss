<?php

namespace App\Http\Controllers;

use App\Models\School;
use Illuminate\Http\Request;

class SchoolController extends Controller
{
    protected $school;
    public function __construct(School $school)
    {
        $this->school = $school;
    }
    public function index(Request $request)
    {
        $per_page_result = $request->page_count ? $request->page_count : 10;
        $data = $this->school
            // ->when($request->search, function ($query, $searchItem) {
            //     $query->where('description', 'like', '%' . $searchItem . '%');
            // })
            ->paginate($per_page_result)
            ->withQueryString();

        return inertia('School/Index', [
            "filters" => $request->only(['search']),
            "data" => $data,
        ]);
    }
    public function create(Request $request) {}
    public function store(Request $request) {}
    public function edit(Request $request) {}
    public function update(Request $request) {}
    public function destroy(Request $request) {}
}
