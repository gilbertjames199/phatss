<?php

namespace App\Http\Controllers;

use App\Models\Intervention;
use App\Models\InterventionType;
use App\Models\InterventionTypeTag;
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
        $per_page_result = $request->page_count ? $request->page_count : 10;
        $data = $this->model->with(['type_tags', 'type_tags.types'])
            ->when($request->search, function ($query, $searchItem) {
                $query->where('description', 'like', '%' . $searchItem . '%');
            })
            ->paginate($per_page_result)
            ->withQueryString();

        return inertia('Intervention/Index', [
            "filters" => $request->only(['search']),
            "data" => $data,
        ]);
    }
    public function create(Request $request)
    {
        $type = InterventionType::all();
        return inertia('Intervention/Create', [
            "type" => $type
        ]);
    }
    public function store(Request $request)
    {
        // dd($request);
        $request->validate([
            'description' => 'required',
            'types' => 'required'
        ]);
        $type_tags = $request->types;
        $intervention = new Intervention();
        $intervention->description = $request->description;
        $intervention->save();
        $intervention_id = $intervention->id;
        // dd($intervention_id);
        foreach ($type_tags as $type_tag) {
            // dd($type_tag);
            $inter_tag_type = new InterventionTypeTag();
            $inter_tag_type->intervention_id = $intervention_id;
            $inter_tag_type->intervention_type_id = $type_tag;
            $inter_tag_type->save();
        }
        // dd($type_tags);
        return redirect('intervention')->with('Successfully created intervention!');
    }
    public function edit(Request $request, $id)
    {
        $type = InterventionType::all();
        $data = $this->model->with(['type_tags', 'type_tags.types'])->where('id', $id)->first();
        return inertia('Intervention/Create', [
            "editData" => $data,
            "type" => $type
        ]);
    }
    public function update(Request $request)
    {
        // dd($request);
        $request->validate([
            'description' => 'required',
            'types' => 'required'
        ]);
        $interventionId = $request->id;
        $newInterventionTypeIds = $request->types;

        $intervention = Intervention::findOrFail($interventionId);
        $intervention->description = $request->description;
        $intervention->save();


        // Retrieve current intervention_type_ids for the intervention
        $currentInterventionTypeIds = InterventionTypeTag::where('intervention_id', $interventionId)
            ->pluck('intervention_type_id')
            ->toArray();

        // Determine IDs to insert and delete
        $idsToInsert = array_diff($newInterventionTypeIds, $currentInterventionTypeIds);
        $idsToDelete = array_diff($currentInterventionTypeIds, $newInterventionTypeIds);

        // Insert new intervention_type_id entries
        foreach ($idsToInsert as $typeId) {
            InterventionTypeTag::create([
                'intervention_id' => $interventionId,
                'intervention_type_id' => $typeId,
            ]);
        }

        // Delete rows with intervention_type_id no longer associated
        if (!empty($idsToDelete)) {
            InterventionTypeTag::where('intervention_id', $interventionId)
                ->whereIn('intervention_type_id', $idsToDelete)
                ->delete();
        }

        return redirect('intervention')->with('message', 'Successfully updated!');
    }

    public function destroy(Request $request, $id)
    {
        // dd($id);
        Intervention::where('id', $id)->delete();
        InterventionTypeTag::where('intervention_id', $id)->delete();
        return redirect()->back()->with('error', 'Successfully deleted intervention!');
    }
}
