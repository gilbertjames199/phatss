<?php

namespace App\Http\Controllers;

use App\Models\Barangay;
use App\Models\HouseHold;
use App\Models\TransactionLog;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Phpml\Classification\KNearestNeighbors;
use Phpml\Dataset\ArrayDataset;
use Phpml\Regression\LinearRegression;
use Phpml\ModelManager;
use Phpml\CrossValidation\CrossValidator;
use Phpml\Metric\MeanSquaredError;
use Phpml\Metric\R2;
use Phpml\Regression\LeastSquares;
use Phpml\Regression\SVR;
use Illuminate\Support\Str;

// use Phpml\FeatureSelection\ScoringFunction\UnivariateLinearRegression;

class HouseHoldController extends Controller
{
    protected $household;
    public function __construct(HouseHold $household)
    {
        $this->household = $household;
    }
    //Index
    public function index(Request $request)
    {
        // dd($request);
        $us = auth()->user();
        $mun_us = $us->municipality;
        $bar_us = $us->barangay;
        $level = auth()->user()->level;
        // dd($level);
        $pages = 10;
        if ($request->count_per_page) {
            $pages = $request->count_per_page;
        }
        // $hh = $this->household
        //     ->when($request->mun, function ($query, $mun) {
        //         $query->where('municipality', 'LIKE', '%' . $mun . '%');
        //     })
        //     ->when($request->bar, function ($query, $bar) {
        //         $query->where('barangay', 'LIKE', '%' . $bar . '%');
        //     })
        //     ->when($request->pur, function ($query, $pur) {
        //         $query->where('purok_sitio', 'LIKE', '%' . $pur . '%');
        //     })
        //     ->when($request->search, function ($query, $search) {
        //         $query->where('LAST_NAME', 'LIKE', '%' . $search . '%')
        //             ->where('FIRST_NAME', 'LIKE', '%' . $search . '%')
        //             ->where('MIDDLENAME', 'LIKE', '%' . $search . '%')
        //             ->where('LAST_NAME2', 'LIKE', '%' . $search . '%')
        //             ->where('FIRST_NAME2', 'LIKE', '%' . $search . '%')
        //             ->where('MIDDLENAME2', 'LIKE', '%' . $search . '%');
        //     })
        //     ->orderBy('LAST_NAME', 'ASC')
        //     ->paginate($pages);
        // dd($hh);
        $hh =
            $this->household
            ->select(
                // Dynamically trim all columns without having to manually list them
                ...collect(Schema::getColumnListing('households'))->map(function ($column) {
                    return \Illuminate\Support\Facades\DB::raw("TRIM($column) AS $column");
                })->toArray()
            )
            ->when($request->search, function ($query, $searchItem) {
                $query->where(function ($q) use ($searchItem) { // Group the ORs together
                    $q->where('LAST_NAME', 'like', '%' . $searchItem . '%')
                        ->orWhere('FIRST_NAME', 'like', '%' . $searchItem . '%')
                        ->orWhere('MIDDLENAME', 'like', '%' . $searchItem . '%')
                        ->where('LAST_NAME2', 'like', '%' . $searchItem . '%')
                        ->orWhere('FIRST_NAME2', 'like', '%' . $searchItem . '%')
                        ->orWhere('MIDDLENAME2', 'like', '%' . $searchItem . '%');
                });
                //$quer
            })
            ->when($request->year_survey, function ($query, $year_survey) {
                $query->where(function ($q) use ($year_survey) { // Group the ORs together
                    $q->whereYear("date_survey", $year_survey);
                });
                //$quer
            })
            ->when($level == 'Municipal', function ($query) use ($mun_us) {
                $query->where('municipality', $mun_us);
            })
            ->when($level == 'Barangay', function ($query) use ($bar_us) {
                $query->where('barangay', $bar_us);
            })
            ->when($request->mun, function ($query, $mun) {
                $query->where('municipality', 'LIKE', '%' . $mun . '%');
            })
            ->when($request->bar, function ($query, $bar) {
                $query->where('barangay', 'LIKE', '%' . $bar . '%');
            })
            ->when($request->pur, function ($query, $pur) {
                $query->where('purok_sitio', 'LIKE', '%' . $pur . '%');
            })
            ->when($request->relrisk, function ($query, $relrisk) {
                $query->where('relative_risk_assessment', 'LIKE', '%' . $relrisk . '%');
            })
            ->when($request->search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->whereRaw('TRIM(LAST_NAME) LIKE ?', ['%' . $search . '%'])
                        ->orWhereRaw('TRIM(FIRST_NAME) LIKE ?', ['%' . $search . '%'])
                        ->orWhereRaw('TRIM(MIDDLENAME) LIKE ?', ['%' . $search . '%'])
                        ->orWhereRaw('TRIM(LAST_NAME2) LIKE ?', ['%' . $search . '%'])
                        ->orWhereRaw('TRIM(FIRST_NAME2) LIKE ?', ['%' . $search . '%'])
                        ->orWhereRaw('TRIM(MIDDLENAME2) LIKE ?', ['%' . $search . '%']);
                });
            })
            ->orderBy('updated_at', 'DESC')
            ->paginate($pages)
            ->withQueryString();
        return inertia('Household/Index', [
            'data' => $hh,
            "filters" => $request->only(['search']),
            // ''
        ]);
    }
    //CREATE
    public function create(Request $request)
    {
        $_uuid = $this->generateCustomUuid();
        return inertia('Household/Create', [
            "_uuid" => $_uuid
        ]);
    }
    //Generate UNIQUE uuid
    function generateCustomUuid()
    {
        do {
            // Generate the five blocks as specified
            // $firstBlock = strtoupper(Str::random(8));
            // $secondBlock = strtoupper(Str::random(4));
            // $thirdBlock = strtoupper(Str::random(4));
            // $fourthBlock = strtoupper(Str::random(4));
            // $fifthBlock = strtoupper(Str::random(11));
            $firstBlock = bin2hex(random_bytes(4)); // 8 characters
            $secondBlock = bin2hex(random_bytes(2)); // 4 characters
            $thirdBlock = bin2hex(random_bytes(2)); // 4 characters
            $fourthBlock = bin2hex(random_bytes(2)); // 4 characters
            $fifthBlock = bin2hex(random_bytes(5)); // 11 characters
            // Concatenate them with hyphens
            $uuid = "{$firstBlock}-{$secondBlock}-{$thirdBlock}-{$fourthBlock}-{$fifthBlock}";

            // Check if the UUID already exists in the HouseHold model
            $exists = HouseHold::where('_uuid', $uuid)->exists();
        } while ($exists); // Repeat until a unique UUID is generated

        return $uuid; // Return the unique UUID
    }
    //VIEW
    public function view(Request $request, $id)
    {
        // dd($id);
        $data = HouseHold::where('id', $id)->first();
        // dd($data);
        return inertia('Household/View', [
            'data' => $data,
        ]);
    }
    //STORE
    public function store(Request $request)
    {
        // dd("store");
        // dd($request->all());
        $request->validate([
            'date_survey' => 'required',
            'time_started' => 'required',
            'ENUMERATOR' => 'required',
            'district' => 'required',
            'municipality' => 'required',
            'barangay' => 'required',
            'purok_sitio' => 'required',
            // 'street' => 'required',
            // 'housenumber' => 'required',
            // 'unitnumber' => 'required',
            // 'Location' => 'required',
            // '_Location_latitude' => 'required',
            // '_Location_longitude' => 'required',
            // '_Location_altitude' => 'required',
            // '_Location_precision' => 'required',
            'LAST_NAME' => 'required',
            'FIRST_NAME' => 'required',
            'MIDDLENAME' => 'required',
            // 'SUFFIX' => 'required',
            'LAST_NAME2' => 'required',
            'FIRST_NAME2' => 'required',
            'MIDDLENAME2' => 'required',
            // 'SUFFIX2' => 'required',
            '_1_has_toilet' => 'required',
            '_2_toilet_used' => 'required',
            '_3_toilet_functional' => 'required',
            '_4_soap' => 'required',
            '_5_children' => 'required',
            '_6_spaces' => 'required',
            '_7_feces' => 'required',
            '_8_composting' => 'required',
            '_9_dispose' => 'required',
            '_10_emptied' => 'required',
            // '_11_do_sludge' => 'required',
            // '_12_do_tank' => 'required',
            '_13_sewer' => 'required',
            // '_14_check' => 'required',
            // '_14_check_flush_pour_to_sewer' => 'required',
            // '_14_check_flush_pour_to_septic_tank' => 'required',
            // '_14_check_flush_pour_to_pit' => 'required',
            // '_14_check_ventilated_imrpoved_pit_Latrine' => 'required',
            // '_14_check_pit_latrine' => 'required',
            '_15_household' => 'required',
            // '_15_1_people' => 'required',
            '_16_household' => 'required',
            '_17_using' => 'required',
            // '_18_If_the_household_mediate_surroundings' => 'required',
            // 'Take_a_photo_for_question_18' => 'required',
            // 'Take_a_photo_for_question_18_url' => 'required',
            '_19_materials' => 'required',
            'Name_of_MRF' => 'required',
            'location_mrf' => 'required',
            'risk_level' => 'required',
            // 'risk_level_value' => 'required',
            'relative_risk_assessment' => 'required',
            // 'Relative_risk_is_re_tive_risk_assessment' => 'required',
            // '_id' => 'required',
            '_uuid' => 'required',
            // '_submission_time' => 'required',
            // '_validation_status' => 'required',
            // '_notes' => 'required',
            // '_status' => 'required',
            // '_submitted_by' => 'required',
            // '__version__' => 'required',
            // '_tags' => 'required',
            // '_index' => 'required',
        ]);
        // dd($request->all());
        // $this->household->create($request->all());
        $hh = new HouseHold();
        $hh->date_survey = $request->date_survey;
        $hh->time_started = $request->time_started;
        $hh->ENUMERATOR = $request->ENUMERATOR;
        $hh->district = $request->district;
        $hh->municipality = $request->municipality;
        $hh->barangay = $request->barangay;
        $hh->purok_sitio = $request->purok_sitio;
        $hh->street = $request->street;
        $hh->housenumber = $request->housenumber;
        $hh->unitnumber = $request->unitnumber;
        $hh->Location = $request->Location;
        $hh->_Location_latitude = $request->_Location_latitude;
        $hh->_Location_longitude = $request->_Location_longitude;
        $hh->_Location_altitude = $request->_Location_altitude;
        $hh->_Location_precision = $request->_Location_precision;
        $hh->LAST_NAME = $request->LAST_NAME;
        $hh->FIRST_NAME = $request->FIRST_NAME;
        $hh->MIDDLENAME = $request->MIDDLENAME;
        $hh->SUFFIX = $request->SUFFIX;
        $hh->LAST_NAME2 = $request->LAST_NAME2;
        $hh->FIRST_NAME2 = $request->FIRST_NAME2;
        $hh->MIDDLENAME2 = $request->MIDDLENAME2;
        $hh->SUFFIX2 = $request->SUFFIX2;
        $hh->_1_has_toilet = $request->_1_has_toilet;
        $hh->_2_toilet_used = $request->_2_toilet_used;
        $hh->_3_toilet_functional = $request->_3_toilet_functional;
        $hh->_4_soap = $request->_4_soap;
        $hh->_5_children = $request->_5_children;
        $hh->_6_spaces = $request->_6_spaces;
        $hh->_7_feces = $request->_7_feces;
        $hh->_8_composting = $request->_8_composting;
        $hh->_9_dispose = $request->_9_dispose;
        $hh->_10_emptied = $request->_10_emptied;
        $hh->_11_do_sludge = $request->_11_do_sludge;
        $hh->_12_do_tank = $request->_12_do_tank;
        $hh->_13_sewer = $request->_13_sewer;
        $hh->_14_check = $request->_14_check;
        $hh->_14_check_flush_pour_to_sewer = $request->_14_check_flush_pour_to_sewer;
        $hh->_14_check_flush_pour_to_septic_tank = $request->_14_check_flush_pour_to_septic_tank;
        $hh->_14_check_flush_pour_to_pit = $request->_14_check_flush_pour_to_pit;
        $hh->_14_check_ventilated_imrpoved_pit_Latrine = $request->_14_check_ventilated_imrpoved_pit_Latrine;
        $hh->_14_check_pit_latrine = $request->_14_check_pit_latrine;
        $hh->_15_household = $request->_15_household;
        $hh->_15_1_people = $request->_15_1_people;
        $hh->_16_household = $request->_16_household;
        $hh->_17_using = $request->_17_using;
        $hh->_18_If_the_household_mediate_surroundings = $request->_18_If_the_household_mediate_surroundings;
        $hh->Take_a_photo_for_question_18 = $request->Take_a_photo_for_question_18;
        $hh->Take_a_photo_for_question_18_url = $request->Take_a_photo_for_question_18_url;
        $hh->_19_materials = $request->_19_materials;
        $hh->Name_of_MRF = $request->Name_of_MRF;
        $hh->location_mrf = $request->location_mrf;
        $hh->risk_level = $request->risk_level;
        $hh->risk_level_value = $request->risk_level_value;
        $hh->relative_risk_assessment = $request->relative_risk_assessment;
        $hh->Relative_risk_is_re_tive_risk_assessment = $request->Relative_risk_is_re_tive_risk_assessment;
        $hh->_id = $request->_id;
        $hh->_uuid = $request->_uuid;
        $hh->_submission_time = $request->_submission_time;
        $hh->_validation_status = $request->_validation_status;
        $hh->_notes = $request->_notes;
        $hh->_status = $request->_status;
        $hh->_submitted_by = $request->_submitted_by;
        $hh->__version__ = $request->__version__;
        $hh->_tags = $request->_tags;
        $hh->_index = $request->_index;
        $hh->save();
        // dd(HouseHold::orderBy('id', 'DESC')->first());
        $transact_type = "Created household with uuid " . $request->_uuid;
        $this->generateTransactionLog($request, "create", $transact_type);
        return redirect('/households')
            ->with('message', 'Household survey added');
    }
    //GENERATE TRANSACTION LOG
    protected function generateTransactionLog(Request $request, $action, $transact_type)
    {
        $host = "";
        $add = "";
        try {
            $host = $request->header('User-Agent');
            $add = $request->ip();
        } catch (Exception $ex) {
        }
        $transaction_log = new TransactionLog();
        $transaction_log->user_id = auth()->user()->id;
        $transaction_log->action = $action;
        $transaction_log->type =  $transact_type;
        $transaction_log->host = $host;
        $transaction_log->address = $add;
        $transaction_log->user_name = auth()->user()->name;
        $transaction_log->save();
    }
    //STORE
    public function historical(Request $request)
    {
        // dd("historical");
        // dd($request);
        $year = date('Y', strtotime($request->date_survey));
        $request->merge([
            'date_survey' => Carbon::parse($request->date_survey)->format('Y-m-d H:i:s')
        ]);
        // Extracts "2025"

        $households = HouseHold::whereYear('date_survey', $year)->where('id', $request->id)->get();
        // dd(count($households));
        if (count($households) > 0) {
            $this->update($request, $request->id);
        } else {
            $this->histo_generate($request);
        }
        return redirect('/households')
            ->with('message', 'Household survey updated');
    }
    //EDIT
    public function edit(Request $request, $id)
    {
        // dd('edit' . $id);
        $data = HouseHold::where('id', $id)->first();
        return inertia('Household/Create', [
            'editData' => $data,
        ]);
    }
    //UPDATE
    public function update(Request $request, $id)
    {
        // dd($id);
        // dd($request->all());
        // dd("update");
        // dd($request);
        $hh = HouseHold::where("id", $id)->first();
        // dd($request);
        $hh->date_survey = $request->date_survey;
        $hh->time_started = $request->time_started;
        $hh->ENUMERATOR = $request->ENUMERATOR;
        $hh->district = $request->district;
        $hh->municipality = $request->municipality;
        $hh->barangay = $request->barangay;
        $hh->purok_sitio = $request->purok_sitio;
        $hh->street = $request->street;
        $hh->housenumber = $request->housenumber;
        $hh->unitnumber = $request->unitnumber;
        $hh->Location = $request->Location;
        $hh->_Location_latitude = $request->_Location_latitude;
        $hh->_Location_longitude = $request->_Location_longitude;
        $hh->_Location_altitude = $request->_Location_altitude;
        $hh->_Location_precision = $request->_Location_precision;
        $hh->LAST_NAME = $request->LAST_NAME;
        $hh->FIRST_NAME = $request->FIRST_NAME;
        $hh->MIDDLENAME = $request->MIDDLENAME;
        $hh->SUFFIX = $request->SUFFIX;
        $hh->LAST_NAME2 = $request->LAST_NAME2;
        $hh->FIRST_NAME2 = $request->FIRST_NAME2;
        $hh->MIDDLENAME2 = $request->MIDDLENAME2;
        $hh->SUFFIX2 = $request->SUFFIX2;
        $hh->_1_has_toilet = $request->_1_has_toilet;
        $hh->_2_toilet_used = $request->_2_toilet_used;
        $hh->_3_toilet_functional = $request->_3_toilet_functional;
        $hh->_4_soap = $request->_4_soap;
        $hh->_5_children = $request->_5_children;
        $hh->_6_spaces = $request->_6_spaces;
        $hh->_7_feces = $request->_7_feces;
        $hh->_8_composting = $request->_8_composting;
        $hh->_9_dispose = $request->_9_dispose;
        $hh->_10_emptied = $request->_10_emptied;
        $hh->_11_do_sludge = $request->_11_do_sludge;
        $hh->_12_do_tank = $request->_12_do_tank;
        $hh->_13_sewer = $request->_13_sewer;
        $hh->_14_check = $request->_14_check;
        $hh->_14_check_flush_pour_to_sewer = $request->_14_check_flush_pour_to_sewer;
        $hh->_14_check_flush_pour_to_septic_tank = $request->_14_check_flush_pour_to_septic_tank;
        $hh->_14_check_flush_pour_to_pit = $request->_14_check_flush_pour_to_pit;
        $hh->_14_check_ventilated_imrpoved_pit_Latrine = $request->_14_check_ventilated_imrpoved_pit_Latrine;
        $hh->_14_check_pit_latrine = $request->_14_check_pit_latrine;
        $hh->_15_household = $request->_15_household;
        $hh->_15_1_people = $request->_15_1_people;
        $hh->_16_household = $request->_16_household;
        $hh->_17_using = $request->_17_using;
        $hh->_18_If_the_household_mediate_surroundings = $request->_18_If_the_household_mediate_surroundings;
        $hh->Take_a_photo_for_question_18 = $request->Take_a_photo_for_question_18;
        $hh->Take_a_photo_for_question_18_url = $request->Take_a_photo_for_question_18_url;
        $hh->_19_materials = $request->_19_materials;
        $hh->Name_of_MRF = $request->Name_of_MRF;
        $hh->location_mrf = $request->location_mrf;
        $hh->risk_level = $request->risk_level;
        $hh->risk_level_value = $request->risk_level_value;
        $hh->relative_risk_assessment = $request->relative_risk_assessment;
        $hh->Relative_risk_is_re_tive_risk_assessment = $request->Relative_risk_is_re_tive_risk_assessment;
        $hh->_id = $request->_id;
        $hh->_uuid = $request->_uuid;
        $hh->_submission_time = $request->_submission_time;
        $hh->_validation_status = $request->_validation_status;
        $hh->_notes = $request->_notes;
        $hh->_status = $request->_status;
        $hh->_submitted_by = $request->_submitted_by;
        $hh->__version__ = $request->__version__;
        $hh->_tags = $request->_tags;
        $hh->_index = $request->_index;
        $hh->save();
        $transact_type = "Edited household with uuid " . $request->_uuid;
        $this->generateTransactionLog($request, "edit", $transact_type);
        // dd(HouseHold::orderBy('id', 'DESC')->first());
        return redirect('/households')
            ->with('message', 'Household survey updated');
    }
    //GENERATE HISTO
    //STORE
    public function histo_generate(Request $request)
    {
        // dd("store");
        // dd($request->all());
        $request->validate([
            'date_survey' => 'required',
            'time_started' => 'required',
            'ENUMERATOR' => 'required',
            'district' => 'required',
            'municipality' => 'required',
            'barangay' => 'required',
            'purok_sitio' => 'required',
            // 'street' => 'required',
            // 'housenumber' => 'required',
            // 'unitnumber' => 'required',
            // 'Location' => 'required',
            // '_Location_latitude' => 'required',
            // '_Location_longitude' => 'required',
            // '_Location_altitude' => 'required',
            // '_Location_precision' => 'required',
            'LAST_NAME' => 'required',
            'FIRST_NAME' => 'required',
            'MIDDLENAME' => 'required',
            // 'SUFFIX' => 'required',
            'LAST_NAME2' => 'required',
            'FIRST_NAME2' => 'required',
            'MIDDLENAME2' => 'required',
            // 'SUFFIX2' => 'required',
            '_1_has_toilet' => 'required',
            '_2_toilet_used' => 'required',
            '_3_toilet_functional' => 'required',
            '_4_soap' => 'required',
            '_5_children' => 'required',
            '_6_spaces' => 'required',
            '_7_feces' => 'required',
            '_8_composting' => 'required',
            '_9_dispose' => 'required',
            '_10_emptied' => 'required',
            // '_11_do_sludge' => 'required',
            // '_12_do_tank' => 'required',
            '_13_sewer' => 'required',
            // '_14_check' => 'required',
            // '_14_check_flush_pour_to_sewer' => 'required',
            // '_14_check_flush_pour_to_septic_tank' => 'required',
            // '_14_check_flush_pour_to_pit' => 'required',
            // '_14_check_ventilated_imrpoved_pit_Latrine' => 'required',
            // '_14_check_pit_latrine' => 'required',
            '_15_household' => 'required',
            // '_15_1_people' => 'required',
            '_16_household' => 'required',
            '_17_using' => 'required',
            // '_18_If_the_household_mediate_surroundings' => 'required',
            // 'Take_a_photo_for_question_18' => 'required',
            // 'Take_a_photo_for_question_18_url' => 'required',
            '_19_materials' => 'required',
            'Name_of_MRF' => 'required',
            'location_mrf' => 'required',
            'risk_level' => 'required',
            // 'risk_level_value' => 'required',
            'relative_risk_assessment' => 'required',
            // 'Relative_risk_is_re_tive_risk_assessment' => 'required',
            // '_id' => 'required',
            '_uuid' => 'required',
            // '_submission_time' => 'required',
            // '_validation_status' => 'required',
            // '_notes' => 'required',
            // '_status' => 'required',
            // '_submitted_by' => 'required',
            // '__version__' => 'required',
            // '_tags' => 'required',
            // '_index' => 'required',
        ]);
        // dd($request->all());
        // $this->household->create($request->all());
        $hh = new HouseHold();
        $hh->date_survey = $request->date_survey;
        $hh->time_started = $request->time_started;
        $hh->ENUMERATOR = $request->ENUMERATOR;
        $hh->district = $request->district;
        $hh->municipality = $request->municipality;
        $hh->barangay = $request->barangay;
        $hh->purok_sitio = $request->purok_sitio;
        $hh->street = $request->street;
        $hh->housenumber = $request->housenumber;
        $hh->unitnumber = $request->unitnumber;
        $hh->Location = $request->Location;
        $hh->_Location_latitude = $request->_Location_latitude;
        $hh->_Location_longitude = $request->_Location_longitude;
        $hh->_Location_altitude = $request->_Location_altitude;
        $hh->_Location_precision = $request->_Location_precision;
        $hh->LAST_NAME = $request->LAST_NAME;
        $hh->FIRST_NAME = $request->FIRST_NAME;
        $hh->MIDDLENAME = $request->MIDDLENAME;
        $hh->SUFFIX = $request->SUFFIX;
        $hh->LAST_NAME2 = $request->LAST_NAME2;
        $hh->FIRST_NAME2 = $request->FIRST_NAME2;
        $hh->MIDDLENAME2 = $request->MIDDLENAME2;
        $hh->SUFFIX2 = $request->SUFFIX2;
        $hh->_1_has_toilet = $request->_1_has_toilet;
        $hh->_2_toilet_used = $request->_2_toilet_used;
        $hh->_3_toilet_functional = $request->_3_toilet_functional;
        $hh->_4_soap = $request->_4_soap;
        $hh->_5_children = $request->_5_children;
        $hh->_6_spaces = $request->_6_spaces;
        $hh->_7_feces = $request->_7_feces;
        $hh->_8_composting = $request->_8_composting;
        $hh->_9_dispose = $request->_9_dispose;
        $hh->_10_emptied = $request->_10_emptied;
        $hh->_11_do_sludge = $request->_11_do_sludge;
        $hh->_12_do_tank = $request->_12_do_tank;
        $hh->_13_sewer = $request->_13_sewer;
        $hh->_14_check = $request->_14_check;
        $hh->_14_check_flush_pour_to_sewer = $request->_14_check_flush_pour_to_sewer;
        $hh->_14_check_flush_pour_to_septic_tank = $request->_14_check_flush_pour_to_septic_tank;
        $hh->_14_check_flush_pour_to_pit = $request->_14_check_flush_pour_to_pit;
        $hh->_14_check_ventilated_imrpoved_pit_Latrine = $request->_14_check_ventilated_imrpoved_pit_Latrine;
        $hh->_14_check_pit_latrine = $request->_14_check_pit_latrine;
        $hh->_15_household = $request->_15_household;
        $hh->_15_1_people = $request->_15_1_people;
        $hh->_16_household = $request->_16_household;
        $hh->_17_using = $request->_17_using;
        $hh->_18_If_the_household_mediate_surroundings = $request->_18_If_the_household_mediate_surroundings;
        $hh->Take_a_photo_for_question_18 = $request->Take_a_photo_for_question_18;
        $hh->Take_a_photo_for_question_18_url = $request->Take_a_photo_for_question_18_url;
        $hh->_19_materials = $request->_19_materials;
        $hh->Name_of_MRF = $request->Name_of_MRF;
        $hh->location_mrf = $request->location_mrf;
        $hh->risk_level = $request->risk_level;
        $hh->risk_level_value = $request->risk_level_value;
        $hh->relative_risk_assessment = $request->relative_risk_assessment;
        $hh->Relative_risk_is_re_tive_risk_assessment = $request->Relative_risk_is_re_tive_risk_assessment;
        $hh->_id = $request->_id;
        $hh->_uuid = $request->_uuid;
        $hh->_submission_time = $request->_submission_time;
        $hh->_validation_status = $request->_validation_status;
        $hh->_notes = $request->_notes;
        $hh->_status = $request->_status;
        $hh->_submitted_by = $request->_submitted_by;
        $hh->__version__ = $request->__version__;
        $hh->_tags = $request->_tags;
        $hh->_index = $request->_index;
        $hh->save();
        // dd(HouseHold::orderBy('id', 'DESC')->first());
        $transact_type = "Generate historical data with uuid " . $request->_uuid . " with year " . $request->year;
        $this->generateTransactionLog($request, "create", $transact_type);
        return redirect('/households')
            ->with('message', 'Historical data generate');
    }
    //DELETE
    public function destroy(Request $request)
    {
        $data = $this->household->findOrFail($request->id);
        $data->delete();
        //dd($request->raao_id);
        return redirect('/households')->with('warning', 'Household Deleted');
    }
    //Machine Learning
    public function analyze_reg(Request $request)
    {
        // dd("analyze");
        // $this->evaluateRegressionModel();
        // $this->handle_muni();
        $type = $request->type;
        if ($type == 'b') {
            $this->handle_bar($request);
        } else {
            $this->handle_muni();
        }
    }
    public function handle_muni()
    {
        // Step 1: Retrieve all records
        $households = HouseHold::all();

        // Step 2: Prepare data for analysis
        $data = [];
        $targets = [];

        foreach ($households as $household) {
            // Check if relative risk assessment is either G2 or G3
            if (
                $household->relative_risk_assessment === 'Basic Sanitation G2' ||
                $household->relative_risk_assessment === 'Safely Managed G3'
            ) {
                $data[] = [
                    (int) $household->risk_level,
                    (int) $household->_6_spaces,
                    (int) $household->_7_feces,
                    // Include other relevant features as needed
                ];
                $targets_num[] = $this->getMunicipality($household->municipality);
                $targets[] = $household->municipality;
            }
        }
        // dd($household);
        // Step 3: Train model
        // dd(count($data));
        if (count($data) > 0) {
            $regression = new SVR();
            $regression->train($data, $targets_num);

            // Step 4: Predict for municipalities
            $municipalityScores = [];
            $municipalities = $households->pluck('municipality')->unique();

            foreach ($municipalities as $municipality) {
                // Filter households by municipality
                $municipalityHouseholds = $households->where('municipality', $municipality);
                $municipalityData = [];

                foreach ($municipalityHouseholds as $household) {
                    $municipalityData[] = [
                        (int) $household->risk_level,
                        // (int) $this->getMunicipality($household->municipality),
                        // (int) $household->_7_feces,
                        // Include other relevant features as needed
                    ];
                }

                // Predict the score for this municipality based on the average of household data
                if (count($municipalityData) > 0) {
                    $averageData = array_map(null, ...$municipalityData);
                    // $avgData = array_map(fn($x) => array_sum($x) / count($x), $averageData);
                    $avgData = array_map(fn($x) => is_array($x) ? array_sum($x) / count($x) : $x, $averageData);
                    $municipalityScores[$municipality] = $regression->predict($avgData);
                }
            }
            // dd($municipalityScores);
            // Step 5: Sort municipalities based on their scores
            // sorted_data = dict(sorted(data.items(), key=lambda item: float(item[1])))

            // asort($municipalityScores);
            // dd($municipalityScores);
            asort($municipalityScores);
            // dd($municipalityScores);
            $recom = "The municipality of " . array_keys($municipalityScores)[0] . " with a score of " . array_values($municipalityScores)[0] . " is recommended for upgrading to G2";
            dd($recom);
            // dd($mun_sorted);
            // Output the results
            // foreach ($municipalityScores as $municipality => $score) {
            //     $this->info("$municipality: $score");
            // }
        } else {
            $this->info("No data available for analysis.");
        }
    }
    public function handle_bar(Request $request)
    {
        // Step 1: Retrieve all records
        $households = HouseHold::where('municipality', 'LIKE', '%' . $request->mun . '%')->get();

        // Step 2: Prepare data for analysis
        $data = [];
        $targets = [];
        $targets_num = [];
        $mun_num = $this->getMunicipality($request->mun);
        $mun_code = $mun_num;
        if ($mun_num <= 9) {
            $mun_code = "0" . $mun_num;
        }
        // dd($mun_code);
        $all_bar = Barangay::where('muni_filter', $mun_code)->get();
        foreach ($households as $household) {
            // Check if relative risk assessment is either G2 or G3
            if (
                $household->relative_risk_assessment === 'Zero Open Defecation G1' ||
                $household->relative_risk_assessment === 'Basic Sanitation G2' ||
                $household->relative_risk_assessment === 'Safely Managed G3'
            ) {
                $data[] = [
                    (int) $household->risk_level,
                    (int) $household->_6_spaces,
                    (int) $household->_7_feces,
                    // Include other relevant features as needed
                ];
                $targets_num[] = $this->getBarangayCode($household->municipality, $household->barangay, $all_bar);
                $targets[] = $household->barangay;
            }
        }
        // dd($household);
        // Step 3: Train model
        // dd(count($data));
        if (count($data) > 0) {
            $regression = new SVR();
            // dd($targets_num);
            $regression->train($data, $targets_num);

            // Step 4: Predict for municipalities
            $barangayScores = [];
            $barangays = $households->pluck('barangay')->unique();

            foreach ($barangays as $barangay) {
                // Filter households by municipality
                $barangayHouseholds = $households->where('barangay', $barangay);
                $barangayData = [];
                foreach ($barangayHouseholds as $household) {
                    $barangayData[] = [
                        (int) $household->risk_level,
                        // (int) $this->getMunicipality($household->municipality),
                        // (int) $household->_7_feces,
                        // Include other relevant features as needed
                    ];
                }

                // Predict the score for this municipality based on the average of household data
                if (count($barangayData) > 0) {
                    $averageData = array_map(null, ...$barangayData);
                    // $avgData = array_map(fn($x) => array_sum($x) / count($x), $averageData);
                    $avgData = array_map(fn($x) => is_array($x) ? array_sum($x) / count($x) : $x, $averageData);
                    $barangayScores[$barangay] = $regression->predict($avgData);
                }
            }
            // dd($municipalityScores);
            // Step 5: Sort municipalities based on their scores
            // sorted_data = dict(sorted(data.items(), key=lambda item: float(item[1])))

            // asort($municipalityScores);
            // dd($municipalityScores);
            asort($barangayScores);
            dd($barangayScores);
            $recom = "The barangay of " . array_keys($barangayScores)[0] . " with a score of " . array_values($barangayScores)[0] . " is recommended for upgrading to G3";
            dd($recom);
            // dd($mun_sorted);
            // Output the results
            // foreach ($municipalityScores as $municipality => $score) {
            //     $this->info("$municipality: $score");
            // }
        } else {
            // $this->info("No data available for analysis.");
            dd("No data available for analysis");
        }
    }
    public function k_nearest()
    {
        // 1. Retrieve all records
        $houseHolds = HouseHold::all();

        $data = [];
        $labels = [];

        foreach ($houseHolds as $houseHold) {
            // Encode relevant features for training
            $features = [
                $houseHold->risk_level, // Convert to numeric if necessary
                $houseHold->municipality
                // $houseHold->_6_spaces,   // This could be numeric
                // $houseHold->_7_feces,    // This could be numeric
                // Add other relevant features here
            ];

            // Append the feature set and label
            $data[] = $features;
            $labels[] = $houseHold->relative_risk_assessment; // Assuming this is already numeric/encoded
        }

        // Filter labels for G2 or G3
        $data = array_filter($data, function ($label) {
            return in_array($label, ['G2', 'G3']);
        });
        $labels = array_filter($labels, function ($label) {
            return in_array($label, ['G2', 'G3']);
        });

        $classifier = new KNearestNeighbors();
        $classifier->train($data, $labels);

        $recommendations = [];
        $municipalities = $houseHolds->pluck('municipality')->unique();

        foreach ($municipalities as $municipality) {
            $municipalityData = $houseHolds->where('municipality', $municipality);

            // Aggregate the data for the municipality
            $features = [
                $municipalityData->avg('risk_level'), // Example aggregation
                // $municipalityData->avg('_6_spaces'),   // Example aggregation
                // $municipalityData->avg('_7_feces'),    // Example aggregation
            ];

            // Predict the relative risk assessment for this municipality
            $predictedLabel = $classifier->predict($features);

            if (in_array($predictedLabel, ['G2', 'G3'])) {
                $recommendations[$municipality] = $predictedLabel;
            }
        }

        // Output the recommendations
        dd($recommendations);
    }
    public function evaluateRegressionModel()
    {
        // Step 1: Retrieve all household data
        $households = HouseHold::all();
        // $households = HouseHold::select('barangay', 'municipality', DB::raw('AVG(risk_level) as average_risk_level'))
        //     ->groupBy('barangay', 'municipality')
        //     ->get();
        // dd($households);
        // Step 2: Prepare the dataset
        $samples = [];
        $targets = [];

        foreach ($households as $household) {
            $riskAssessment = $this->encodeRiskAssessment($household->relative_risk_assessment);
            $mun_num = $this->getMunicipality($household->municipality);
            // Prepare sample features (latitude, longitude, etc.)
            $samples[] = [
                (float)$household->_Location_latitude,
                (float)$household->_Location_longitude,
                (float)$mun_num,
                // (float)$household->average_risk_level
                // Add more features as needed
            ];
            $targets[] = $riskAssessment;
        }
        dd(count($samples));
        // Step 3: Split data into training and testing sets
        $trainSize = (int)(0.8 * count($samples)); // 80% for training
        $testSize = count($samples) - $trainSize;

        $trainSamples = array_slice($samples, 0, $trainSize);
        $trainTargets = array_slice($targets, 0, $trainSize);
        $testSamples = array_slice($samples, $trainSize);
        $testTargets = array_slice($targets, $trainSize);

        // Step 4: Create the dataset for training
        $trainDataset = new ArrayDataset($trainSamples, $trainTargets);

        // Step 5: Train the regression model
        $regression = new LeastSquares(); // Use available model
        $regression->train($trainDataset->getSamples(), $trainDataset->getTargets());

        // Step 6: Make predictions on the test set
        $predicted = [];
        foreach ($testSamples as $sample) {
            $predicted[] = $regression->predict($sample);
        }

        // Step 7: Evaluate the model
        $mse = $this->calculateMSE($testTargets, $predicted);
        $r2 = $this->calculateR2($testTargets, $predicted);
        dd($mse);
        return [
            'Mean Squared Error' => $mse,
            'R2 Score' => $r2,
            'Predictions' => $predicted,
            'Actual' => $testTargets,
        ];
    }
    private function calculateMSE($actual, $predicted)
    {
        $errorSum = 0;
        $count = count($actual);

        for ($i = 0; $i < $count; $i++) {
            $errorSum += ($actual[$i] - $predicted[$i]) ** 2;
        }
        if ($count < 1) {
            $count = 1;
        }

        return $errorSum / $count; // Mean
    }

    // Custom function to calculate R²
    private function calculateR2($actual, $predicted)
    {
        $ssTotal = 0;
        $ssResidual = 0;
        $cnt_act = count($actual);
        if ($cnt_act < 1) {
            $cnt_act = 1;
        }
        $meanActual = array_sum($actual) / $cnt_act;

        foreach ($actual as $i => $value) {
            $ssTotal += ($value - $meanActual) ** 2;
            $ssResidual += ($value - $predicted[$i]) ** 2;
        }
        if ($ssTotal < 1) {
            $ssTotal = 1;
        }
        return 1 - ($ssResidual / $ssTotal); // R² Score
    }

    private function encodeRiskAssessment($riskAssessment)
    {
        switch ($riskAssessment) {
            case 'Open Defecation G0':
                return 0; // Open Defecation G0
            case 'Zero Open Defecation G1':
                return 1; // Zero Open Defecation G1
            case 'Basic Sanitation G2':
                return 2; // Basic Sanitation G2
            case 'Safely Managed G3':
                return 3;
            default:
                return null; // Undefined risk assessment
        }
    }
    private function getMunicipality($mun)
    {
        if ($mun == 'Compostela') {
            return 1;
        } else if ($mun == 'Laak') {
            return 2;
        } else if ($mun == 'Mabini') {
            return 3;
        } else if ($mun == 'Maco') {
            return 4;
        } else if ($mun == 'Maragusan') {
            return 5;
        } else if ($mun == 'Mawab') {
            return 6;
        } else if ($mun == 'Monkayo') {
            return 7;
        } else if ($mun == 'Montevista') {
            return 8;
        } else if ($mun == 'Nabunturan') {
            return 9;
        } else if ($mun == 'New Bataan') {
            return 10;
        } else if ($mun == 'Pantukan') {
            return 11;
        } else {
            return 0;
        }
    }
    private function getBarangayCode($mun, $bar, $bar_array)
    {
        // dd($bar_array);
        $id = collect($bar_array)
            ->firstWhere('barangay', $bar)['id'] ?? null;
        // dd($barangayCode);
        return $id;
    }
}
