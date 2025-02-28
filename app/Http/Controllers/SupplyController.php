<?php

namespace App\Http\Controllers;

use App\Models\Supply;
use Illuminate\Http\Request;

class SupplyController extends Controller
{
    protected $model;
    public function __construct(Supply $model)
    {
        $this->model = $model;
    }
    //
    public function index(Request $request)
    {
        // dd("supply");
        $data = $this->model->paginate(10);
        // dd($data);
        return inertia('Supply/Index', [
            // "filters" => $request->only(['search']),
            "data" => $data,
        ]);
    }

    public function create(Request $request)
    {
        // dd("create supplies");
        return inertia('Supply/Create');
    }


    public function store(Request $request)
    {
        // dd($request);
        $request->validate([
            // 'description' => 'required',
            'item' => 'required',
            'quantity' => 'required',
            'quantity_unit' => 'required',
            // 'type' => 'required',
        ]);
        $supp = new Supply();
        $supp->item = $request->item;
        $supp->description = $request->description;
        $supp->quantity = $request->quantity;
        $supp->type = $request->type;
        $supp->quantity_unit = $request->quantity_unit;
        $supp->save();
        return redirect('/supplies')->with('message', 'Successfully saved supplies data');
    }
    public function edit(Request $request, $id)
    {
        // dd("edit supplies");
        $data = $this->model->findOrFail($id);
        return inertia('Supply/Create', [
            'editData' => $data
        ]);
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            // 'description' => 'required',
            'item' => 'required',
            'quantity' => 'required',
            'quantity_unit' => 'required',
            // 'type' => 'required',
        ]);
        $supp = Supply::where('id', $id)->first();
        $supp->item = $request->item;
        $supp->description = $request->description;
        $supp->quantity = $request->quantity;
        $supp->type = $request->type;
        $supp->quantity_unit = $request->quantity_unit;
        $supp->save();
        return redirect('/supplies')->with('message', 'Successfully saved supplies data');
    }
    public function destroy(Request $request, $id)
    {
        // dd('delete:' . $id);
        $dat = $this->model->findOrFail($id);
        $dat->delete();
        return back()->with('message', 'Successfully deleted data');
    }
}
