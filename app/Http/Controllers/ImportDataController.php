<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Box\Spout\Reader\Common\Creator\ReaderEntityFactory;
use Symfony\Component\HttpFoundation\Response;
use Box\Spout\Writer\Common\Creator\WriterEntityFactory;
use Box\Spout\Common\Entity\Row;

class ImportDataController extends Controller
{
    public function index(Request $request)
    {

        //dd("import");
        $date = Carbon::now();
        $dateTime = $date->format('Y-m-d');
        $file = $request->myfile;

        $validate = $request->validate([
            'myfile' => 'required|mimes:xlsx,csv',
        ]);

        if ($validate) {

            $fileName = $file->getClientOriginalName();
            $file->move(storage_path('app/public'), "file.xlsx");
            $reader = ReaderEntityFactory::createReaderFromFile(storage_path('app/public') . "file.xlsx");

            $reader->open(public_path() . "/storage/file.xlsx");

            $row_index_arr = [];
            $municipalities = [];
            $barangays = [];
            $puroks = [];
            foreach ($reader->getSheetIterator() as $sheet) {
                if ($sheet->getIndex() === 0) {
                    foreach ($sheet->getRowIterator() as $rowIndex => $row) {
                        $cells = $row->getCells();
                        $row_type = $cells[0]->getValue();
                        $code = $cells[1]->getValue();
                        $desc = $cells[2]->getValue();
                        $dist_filter = $cells[3]->getValue();
                        $muni_filter = $cells[4]->getValue();
                        $purok_filter = $cells[5]->getValue();

                        if ($row_type == "municipality") {
                            //dd($row_type);
                            $mun_details = [
                                "code" => $code,
                                "municipality" => $desc,
                                "dist_filter" => $dist_filter,
                                "muni_filter" => $muni_filter,
                                "purok_filter" => $purok_filter,
                            ];
                            array_push($municipalities, $mun_details);
                        }
                        if ($row_type == "barangay") {
                            $bar_details = [
                                "code" => $code,
                                "barangay" => $desc,
                                "dist_filter" => $dist_filter,
                                "muni_filter" => $muni_filter,
                                "purok_filter" => $purok_filter,
                            ];
                            array_push($barangays, $bar_details);
                        }
                        if ($row_type == "purok_sitio") {
                            $pur_details = [
                                "code" => $code,
                                "purok_sitio" => $desc,
                                "dist_filter" => $dist_filter,
                                "muni_filter" => $muni_filter,
                                "purok_filter" => $purok_filter,
                            ];
                            array_push($puroks, $pur_details);
                        }
                    }
                }
            }
            foreach ($municipalities as $key => $value) {
                DB::table('municipalities')->upsert($value, ['code']);
            }
            $chunk_bar = array_chunk($barangays, 100);
            foreach ($chunk_bar as $key => $value) {
                DB::table('barangays')->upsert($value, ['code']);
            }
            $chunk_pur = array_chunk($puroks, 100);
            foreach ($chunk_pur as $key => $value) {
                DB::table('purok_sitios')->upsert($value, ['code']);
            }
            return redirect('/')
                ->with('message', 'Import done successfully');
        } else {
            return redirect('/')
                ->with('error', 'File not validated successfully');
        }
    }
    public function import_phatts(Request $request)
    {
        //dd("phartts");
        $date = Carbon::now();
        $dateTime = $date->format('Y-m-d');
        $file = $request->myfile;
        $validate = $request->validate([
            'myfile' => 'required|mimes:xlsx,csv',
        ]);
        if ($validate) {
            $fileName = $file->getClientOriginalName();
            $file->move(storage_path('app/public'), "file.xlsx");
            $reader = ReaderEntityFactory::createReaderFromFile(storage_path('app/public') . "file.xlsx");

            $reader->open(public_path() . "/storage/file.xlsx");

            $row_index_arr = [];
            $group1 = [];
            $group2 = [];
            foreach ($reader->getSheetIterator() as $sheet) {
                if ($sheet->getIndex() === 0) {
                    foreach ($sheet->getRowIterator() as $rowIndex => $row) {
                        $cells = $row->getCells();
                        $row_type = $cells[0]->getValue();
                        $_uuid = $cells[97]->getValue();
                        //GROUP 1****************************************
                        $date_survey = $cells[0]->getValue();
                        $time_started = $cells[1]->getValue();
                        $ENUMERATOR = $cells[2]->getValue();
                        $district = $cells[3]->getValue();
                        $municipality = $cells[4]->getValue();
                        $mun = DB::table("municipalities")
                            ->where("code", $municipality)
                            ->first();
                        if ($mun) {
                            $municipality = $mun->municipality;
                        }
                        $barangay = $cells[5]->getValue();
                        $bar = DB::table("barangays")
                            ->where("code", $barangay)
                            ->first();
                        if ($bar) {
                            $barangay = $bar->barangay;
                        }
                        $purok_sitio = $cells[6]->getValue();
                        $pur = DB::table("purok_sitios")
                            ->where("code", $purok_sitio)
                            ->first();
                        if ($pur) {
                            $purok_sitio = $pur->purok_sitio;
                        }
                        $street = $cells[7]->getValue();
                        $housenumber = $cells[8]->getValue();
                        $unitnumber = $cells[9]->getValue();
                        $Location = $cells[10]->getValue();
                        $_Location_latitude = $cells[11]->getValue();
                        $_Location_longitude = $cells[12]->getValue();
                        $_Location_altitude = $cells[13]->getValue();
                        $_Location_precision = $cells[14]->getValue();
                        $name_respondent = $cells[15]->getValue();
                        $FIRST_NAME = $cells[16]->getValue();
                        $mname = $cells[17]->getValue();
                        $suffix = $cells[18]->getValue();
                        $name_respondent_001 = $cells[19]->getValue();
                        $FIRST_NAME_001 = $cells[20]->getValue();
                        $mname_001 = $cells[21]->getValue();
                        $suffix_001 = $cells[22]->getValue();
                        $_1_has_toilet = $cells[23]->getValue();
                        $_2_toilet_used = $cells[24]->getValue();
                        $_3_toilet_functional = $cells[25]->getValue();
                        $_4_soap = $cells[26]->getValue();
                        $_5_children = $cells[27]->getValue();
                        $_6_spaces = $cells[28]->getValue();
                        $_7_feces = $cells[29]->getValue();
                        $_8_composting = $cells[30]->getValue();
                        $_9_dispose = $cells[31]->getValue();
                        $_10_emptied = $cells[32]->getValue();
                        $_11_do_sludge = $cells[33]->getValue();
                        $_12_do_tank = $cells[34]->getValue();
                        $_13_sewer = $cells[35]->getValue();
                        $_14_check = $cells[36]->getValue();
                        $_14_check_1 = $cells[37]->getValue();
                        $_14_check_2 = $cells[38]->getValue();
                        $_14_check_3 = $cells[39]->getValue();
                        $_14_check_4 = $cells[40]->getValue();
                        $_14_check_5 = $cells[41]->getValue();
                        $_15_household = $cells[42]->getValue();
                        $_15_1_people = $cells[43]->getValue();
                        $_16_household = $cells[44]->getValue();
                        $_17_using = $cells[45]->getValue();
                        $_18_If_the_household_mediate_surroundings = $cells[46]->getValue();
                        $Take_a_photo_for_question_18 = $cells[47]->getValue();
                        $Take_a_photo_for_question_18_URL = $cells[48]->getValue();
                        $_19_materials = $cells[49]->getValue();
                        $Name_of_MRF = $cells[50]->getValue();
                        $Location_001 = $cells[51]->getValue();
                        $risk_level = $cells[52]->getValue();
                        $Risk_Level_is_risk_level = $cells[53]->getValue();
                        $relative_risk_assessment = $cells[54]->getValue();
                        $Relative_risk_is_re_tive_risk_assessment = $cells[55]->getValue();
                        $_1_Number_of_function_for_children_to_use = $cells[56]->getValue();
                        $_2_school_soap = $cells[57]->getValue();
                        $_3_school_gender = $cells[58]->getValue();
                        $group_1_details = [
                            "date_survey" => $date_survey,
                            "time_started" => $time_started,
                            "ENUMERATOR" => $ENUMERATOR,
                            "district" => $district,
                            "municipality" => $municipality,
                            "barangay" => $barangay,
                            "purok_sitio" => $purok_sitio,
                            "street" => $street,
                            "housenumber" => $housenumber,
                            "unitnumber" => $unitnumber,
                            "Location" => $Location,
                            "_Location_latitude" => $_Location_latitude,
                            "_Location_longitude" => $_Location_longitude,
                            "_Location_altitude" => $_Location_altitude,
                            "_Location_precision" => $_Location_precision,
                            "name_respondent" => $name_respondent,
                            "FIRST_NAME" => $FIRST_NAME,
                            "mname" => $mname,
                            "suffix" => $suffix,
                            "name_respondent_001" => $name_respondent_001,
                            "FIRST_NAME_001" => $FIRST_NAME_001,
                            "mname_001" => $mname_001,
                            "suffix_001" => $suffix_001,
                            "_1_has_toilet" => $_1_has_toilet,
                            "_2_toilet_used" => $_2_toilet_used,
                            "_3_toilet_functional" => $_3_toilet_functional,
                            "_4_soap" => $_4_soap,
                            "_5_children" => $_5_children,
                            "_6_spaces" => $_6_spaces,
                            "_7_feces" => $_7_feces,
                            "_8_composting" => $_8_composting,
                            "_9_dispose" => $_9_dispose,
                            "_10_emptied" => $_10_emptied,
                            "_11_do_sludge" => $_11_do_sludge,
                            "_12_do_tank" => $_12_do_tank,
                            "_13_sewer" => $_13_sewer,
                            "_14_check" => $_14_check,
                            "_14_check_1" => $_14_check_1,
                            "_14_check_2" => $_14_check_2,
                            "_14_check_3" => $_14_check_3,
                            "_14_check_4" => $_14_check_4,
                            "_14_check_5" => $_14_check_5,
                            "_15_household" => $_15_household,
                            "_15_1_people" => $_15_1_people,
                            "_16_household" => $_16_household,
                            "_17_using" => $_17_using,
                            "_18_If_the_household_mediate_surroundings" => $_18_If_the_household_mediate_surroundings,
                            "Take_a_photo_for_question_18" => $Take_a_photo_for_question_18,
                            "Take_a_photo_for_question_18_URL" => $Take_a_photo_for_question_18_URL,
                            "_19_materials" => $_19_materials,
                            "Name_of_MRF" => $Name_of_MRF,
                            "Location_001" => $Location_001,
                            "risk_level" => $risk_level,
                            "Risk_Level_is_risk_level" => $Risk_Level_is_risk_level,
                            "relative_risk_assessment" => $relative_risk_assessment,
                            "Relative_risk_is_re_tive_risk_assessment" => $Relative_risk_is_re_tive_risk_assessment,
                            "_1_Number_of_function_for_children_to_use" => $_1_Number_of_function_for_children_to_use,
                            "_2_school_soap" => $_2_school_soap,
                            "_3_school_gender" => $_3_school_gender,
                            "_uuid" => $_uuid,
                        ];
                        array_push($group1, $group_1_details);
                        //GROUP 2****************************************
                        $Check_type_of_toilet_present = $cells[59]->getValue();
                        $Check_type_of_toilet_present_1 = $cells[60]->getValue();
                        $Check_type_of_toilet_present_2 = $cells[61]->getValue();
                        $Check_type_of_toilet_present_3 = $cells[62]->getValue();
                        $Check_type_of_toilet_present_4 = $cells[63]->getValue();
                        $Check_type_of_toilet_present_5 = $cells[64]->getValue();
                        $_4_school_compost = $cells[65]->getValue();
                        $_5_school_segre = $cells[66]->getValue();
                        $_1_cdc_toilet = $cells[67]->getValue();
                        $_2_cdc_func = $cells[68]->getValue();
                        $_3_cdc_safe = $cells[69]->getValue();
                        $Check_type_of_toilet_present_001 = $cells[70]->getValue();
                        $Check_type_of_toilet_present_001_1 = $cells[71]->getValue();
                        $Check_type_of_toilet_present_001_2 = $cells[72]->getValue();
                        $Check_type_of_toilet_present_001_3 = $cells[73]->getValue();
                        $Check_type_of_toilet_present_001_4 = $cells[74]->getValue();
                        $Check_type_of_toilet_present_001_5 = $cells[75]->getValue();
                        $_4_cdc_soap = $cells[76]->getValue();
                        $_5_cdc_waste = $cells[77]->getValue();
                        $_6_cdc_garb = $cells[78]->getValue();
                        $_C_1_toilet = $cells[79]->getValue();
                        $_C_2_functional = $cells[80]->getValue();
                        $_C_3_water = $cells[81]->getValue();
                        $Check_type_of_toilet_present_002 = $cells[82]->getValue();
                        $Check_type_of_toilet_present_002_flush_sewer = $cells[83]->getValue();
                        $Check_type_of_toilet_present_002_flush_septic = $cells[84]->getValue();
                        $Check_type_of_toilet_present_002_flush_pit = $cells[85]->getValue();
                        $Check_type_of_toilet_present_002_ventilated = $cells[86]->getValue();
                        $Check_type_of_toilet_present_002_pit_lat = $cells[87]->getValue();
                        $_C_4_segregation = $cells[88]->getValue();
                        $_C_5_dispose = $cells[89]->getValue();
                        $no_of_heads = $cells[90]->getValue();
                        $name_enumerator = $cells[91]->getValue();
                        $pupils = $cells[92]->getValue();
                        $toilets = $cells[93]->getValue();
                        $calc_ratio = $cells[94]->getValue();
                        $_C_Average_Pupil_Fu_pils_is_calc_ratio = $cells[95]->getValue();
                        $_id = $cells[96]->getValue();

                        $_submission_time = $cells[98]->getValue();
                        $_validation_status = $cells[99]->getValue();
                        $_notes = $cells[100]->getValue();
                        $_status = $cells[101]->getValue();
                        $_submitted_by = $cells[102]->getValue();
                        $__version__ = $cells[103]->getValue();
                        $_tags = $cells[104]->getValue();
                        $_index = $cells[105]->getValue();
                        $group_2_details = [
                            "Check_type_of_toilet_present" => $Check_type_of_toilet_present,
                            "Check_type_of_toilet_present_1" => $Check_type_of_toilet_present_1,
                            "Check_type_of_toilet_present_2" => $Check_type_of_toilet_present_2,
                            "Check_type_of_toilet_present_3" => $Check_type_of_toilet_present_3,
                            "Check_type_of_toilet_present_4" => $Check_type_of_toilet_present_4,
                            "Check_type_of_toilet_present_5" => $Check_type_of_toilet_present_5,
                            "_4_school_compost" => $_4_school_compost,
                            "_5_school_segre" => $_5_school_segre,
                            "_1_cdc_toilet" => $_1_cdc_toilet,
                            "_2_cdc_func" => $_2_cdc_func,
                            "_3_cdc_safe" => $_3_cdc_safe,
                            "Check_type_of_toilet_present_001" => $Check_type_of_toilet_present_001,
                            "Check_type_of_toilet_present_001_1" => $Check_type_of_toilet_present_001_1,
                            "Check_type_of_toilet_present_001_2" => $Check_type_of_toilet_present_001_2,
                            "Check_type_of_toilet_present_001_3" => $Check_type_of_toilet_present_001_3,
                            "Check_type_of_toilet_present_001_4" => $Check_type_of_toilet_present_001_4,
                            "Check_type_of_toilet_present_001_5" => $Check_type_of_toilet_present_001_5,
                            "_4_cdc_soap" => $_4_cdc_soap,
                            "_5_cdc_waste" => $_5_cdc_waste,
                            "_6_cdc_garb" => $_6_cdc_garb,
                            "_C_1_toilet" => $_C_1_toilet,
                            "_C_2_functional" => $_C_2_functional,
                            "_C_3_water" => $_C_3_water,
                            "Check_type_of_toilet_present_002" => $Check_type_of_toilet_present_002,
                            "Check_type_of_toilet_present_002_flush_sewer" => $Check_type_of_toilet_present_002_flush_sewer,
                            "Check_type_of_toilet_present_002_flush_septic" => $Check_type_of_toilet_present_002_flush_septic,
                            "Check_type_of_toilet_present_002_flush_pit" => $Check_type_of_toilet_present_002_flush_pit,
                            "Check_type_of_toilet_present_002_ventilated" => $Check_type_of_toilet_present_002_ventilated,
                            "Check_type_of_toilet_present_002_pit_lat" => $Check_type_of_toilet_present_002_pit_lat,
                            "_C_4_segregation" => $_C_4_segregation,
                            "_C_5_dispose" => $_C_5_dispose,
                            "no_of_heads" => $no_of_heads,
                            "name_enumerator" => $name_enumerator,
                            "pupils" => $pupils,
                            "toilets" => $toilets,
                            "calc_ratio" => $calc_ratio,
                            "_C_Average_Pupil_Fu_pils_is_calc_ratio" => $_C_Average_Pupil_Fu_pils_is_calc_ratio,
                            "_id" => $_id,
                            "_uuid" => $_uuid,
                            "_submission_time" => $_submission_time,
                            "_validation_status" => $_validation_status,
                            "_notes" => $_notes,
                            "_status" => $_status,
                            "_submitted_by" => $_submitted_by,
                            "__version__" => $__version__,
                            "_tags" => $_tags,
                            "_index" => $_index,
                        ];
                        array_push($group2, $group_2_details);
                    }
                }
            }
            $chunked = array_chunk($group1, 1000);
            foreach ($chunked as $key => $value) {
                DB::table('phatss_data')->upsert($value, ['_uuid']);
            }
            $chunked = array_chunk($group2, 1000);
            foreach ($chunked as $key => $value) {
                DB::table('phatts_data2s')->upsert($value, ['_uuid']);
            }
            return redirect('/')
                ->with('message', 'Import done successfully');
        } else {
            return redirect('/')
                ->with('error', 'File not validated successfully');
        }
    }
    public function export_phatts(Request $request)
    {
        // Fetch data from the database
        $data = DB::table('phatss_data')
            ->select()
            ->join('phatts_data2s', 'phatts_data2s._uuid', 'phatss_data._uuid')
            ->get();

        // Create an XLSX writer
        $writer = WriterFactory::create(Type::XLSX);

        // Set the path to the file in the public storage folder
        $filePath = 'C:/xampp/htdocs/PhATSS/public/storage/phatts_file.xlsx';

        // Open the writer to the file
        $writer->openToFile($filePath);

        // Add header row
        $header = [
            'date_survey',
            'time_started',
            'ENUMERATOR',
            'district',
            'municipality',
            'barangay',
            'purok_sitio',
            'street',
            'housenumber',
            'unitnumber',
            'Location',
            '_Location_latitude',
            '_Location_longitude',
            '_Location_altitude',
            '_Location_precision',
            'name_respondent',
            'FIRST_NAME',
            'mname',
            'suffix',
            'name_respondent_001',
            'FIRST_NAME_001',
            'mname_001',
            'suffix_001',
            '_1_has_toilet',
            '_2_toilet_used',
            '_3_toilet_functional',
            '_4_soap',
            '_5_children',
            '_6_spaces',
            '_7_feces',
            '_8_composting',
            '_9_dispose',
            '_10_emptied',
            '_11_do_sludge',
            '_12_do_tank',
            '_13_sewer',
            '_14_check',
            '_14_check/1',
            '_14_check/2',
            '_14_check/3',
            '_14_check/4',
            '_14_check/5',
            '_15_household',
            '_15_1_people',
            '_16_household',
            '_17_using',
            '_18_If_the_household_mediate_surroundings',
            'Take_a_photo_for_question_18',
            'Take_a_photo_for_question_18_URL',
            '_19_materials',
            'Name_of_MRF',
            'Location_001',
            'risk_level',
            'Risk_Level_is_risk_level',
            'relative_risk_assessment',
            'Relative_risk_is_re_tive_risk_assessment',
            '_1_Number_of_functio_for_children_to_use',
            '_2_school_soap',
            '_3_school_gender',
            'Check_type_of_toilet_present',
            'Check_type_of_toilet_present/1',
            'Check_type_of_toilet_present/2',
            'Check_type_of_toilet_present/3',
            'Check_type_of_toilet_present/4',
            'Check_type_of_toilet_present/5',
            '_4_school_compost',
            '_5_school_segre',
            '_1_cdc_toilet',
            '_2_cdc_func',
            '_3_cdc_safe',
            'Check_type_of_toilet_present_001',
            'Check_type_of_toilet_present_001/1',
            'Check_type_of_toilet_present_001/2',
            'Check_type_of_toilet_present_001/3',
            'Check_type_of_toilet_present_001/4',
            'Check_type_of_toilet_present_001/5',
            '_4_cdc_soap',
            '_5_cdc_waste',
            '_6_cdc_garb',
            '_C_1_toilet',
            '_C_2_functional',
            '_C_3_water',
            'Check_type_of_toilet_present_002',
            'Check_type_of_toilet_present_002/flush_pour_flush_to_sewer',
            'Check_type_of_toilet_present_002/flush_pour_flush_to_septic',
            'Check_type_of_toilet_present_002/flush_pour_flush_to_pit',
            'Check_type_of_toilet_present_002/ventilated_improved_pit_latrine',
            'Check_type_of_toilet_present_002/pit_latrine',
            '_C_4_segregation',
            '_C_5_dispose',
            'no_of_heads',
            'name_enumerator',
            'pupils',
            'toilets',
            'calc_ratio',
            '_C_Average_Pupil_Fu_pils_is_calc_ratio',
            '_id',
            '_uuid',
            '_submission_time',
            '_validation_status',
            '_notes',
            '_status',
            '_submitted_by',
            '__version__',
            '_tags',
            '_index',
        ];
        $writer->addRow($header);

        // Add data rows
        foreach ($data as $row) {
            $rowData = [
                $row->column1,
                $row->column2,
                // Add more data columns as needed
            ];
            $writer->addRow($rowData);
        }

        // Close the writer
        $writer->close();

        return 'Data exported to ' . $filePath;
    }
    public function export_phatts1(Request $request)
    {
        $phatts_1 = DB::table('phatss_data')
            ->get();

        $phatts_2 = DB::table('phatts_data2s')
            ->get();
        $writer = WriterEntityFactory::createXLSXWriter();
        $p1_length = count($phatts_1);
        $p2_length = count($phatts_2);
        $p1 = intval($p1_length);
        $p2 = intval($p2_length);
        $filePath = storage_path('app/public/file.xlsx');
        $writer->openToFile($filePath);
        $cells = [
            WriterEntityFactory::createCell('date_survey'),
            WriterEntityFactory::createCell('time_started'),
            WriterEntityFactory::createCell('ENUMERATOR'),
            WriterEntityFactory::createCell('district'),
            WriterEntityFactory::createCell('municipality'),
            WriterEntityFactory::createCell('barangay'),
            WriterEntityFactory::createCell('purok_sitio'),
            WriterEntityFactory::createCell('street'),
            WriterEntityFactory::createCell('housenumber'),
            WriterEntityFactory::createCell('unitnumber'),
            WriterEntityFactory::createCell('Location'),
            WriterEntityFactory::createCell('_Location_latitude'),
            WriterEntityFactory::createCell('_Location_longitude'),
            WriterEntityFactory::createCell('_Location_altitude'),
            WriterEntityFactory::createCell('_Location_precision'),
            WriterEntityFactory::createCell('name_respondent'),
            WriterEntityFactory::createCell('FIRST_NAME'),
            WriterEntityFactory::createCell('mname'),
            WriterEntityFactory::createCell('suffix'),
            WriterEntityFactory::createCell('name_respondent_001'),
            WriterEntityFactory::createCell('FIRST_NAME_001'),
            WriterEntityFactory::createCell('mname_001'),
            WriterEntityFactory::createCell('suffix_001'),
            WriterEntityFactory::createCell('_1_has_toilet'),
            WriterEntityFactory::createCell('_2_toilet_used'),
            WriterEntityFactory::createCell('_3_toilet_functional'),
            WriterEntityFactory::createCell('_4_soap'),
            WriterEntityFactory::createCell('_5_children'),
            WriterEntityFactory::createCell('_6_spaces'),
            WriterEntityFactory::createCell('_7_feces'),
            WriterEntityFactory::createCell('_8_composting'),
            WriterEntityFactory::createCell('_9_dispose'),
            WriterEntityFactory::createCell('_10_emptied'),
            WriterEntityFactory::createCell('_11_do_sludge'),
            WriterEntityFactory::createCell('_12_do_tank'),
            WriterEntityFactory::createCell('_13_sewer'),
            WriterEntityFactory::createCell('_14_check'),
            WriterEntityFactory::createCell('_14_check/1'),
            WriterEntityFactory::createCell('_14_check/2'),
            WriterEntityFactory::createCell('_14_check/3'),
            WriterEntityFactory::createCell('_14_check/4'),
            WriterEntityFactory::createCell('_14_check/5'),
            WriterEntityFactory::createCell('_15_household'),
            WriterEntityFactory::createCell('_15_1_people'),
            WriterEntityFactory::createCell('_16_household'),
            WriterEntityFactory::createCell('_17_using'),
            WriterEntityFactory::createCell('_18_If_the_household_mediate_surroundings'),
            WriterEntityFactory::createCell('Take_a_photo_for_question_18'),
            WriterEntityFactory::createCell('Take_a_photo_for_question_18_URL'),
            WriterEntityFactory::createCell('_19_materials'),
            WriterEntityFactory::createCell('Name_of_MRF'),
            WriterEntityFactory::createCell('Location_001'),
            WriterEntityFactory::createCell('risk_level'),
            WriterEntityFactory::createCell('Risk_Level_is_risk_level'),
            WriterEntityFactory::createCell('relative_risk_assessment'),
            WriterEntityFactory::createCell('Relative_risk_is_re_tive_risk_assessment'),
            WriterEntityFactory::createCell('_1_Number_of_functio_for_children_to_use'),
            WriterEntityFactory::createCell('_2_school_soap'),
            WriterEntityFactory::createCell('_3_school_gender'),
            WriterEntityFactory::createCell('Check_type_of_toilet_present'),
            WriterEntityFactory::createCell('Check_type_of_toilet_present/1'),
            WriterEntityFactory::createCell('Check_type_of_toilet_present/2'),
            WriterEntityFactory::createCell('Check_type_of_toilet_present/3'),
            WriterEntityFactory::createCell('Check_type_of_toilet_present/4'),
            WriterEntityFactory::createCell('Check_type_of_toilet_present/5'),
            WriterEntityFactory::createCell('_4_school_compost'),
            WriterEntityFactory::createCell('_5_school_segre'),
            WriterEntityFactory::createCell('_1_cdc_toilet'),
            WriterEntityFactory::createCell('_2_cdc_func'),
            WriterEntityFactory::createCell('_3_cdc_safe'),
            WriterEntityFactory::createCell('Check_type_of_toilet_present_001'),
            WriterEntityFactory::createCell('Check_type_of_toilet_present_001/1'),
            WriterEntityFactory::createCell('Check_type_of_toilet_present_001/2'),
            WriterEntityFactory::createCell('Check_type_of_toilet_present_001/3'),
            WriterEntityFactory::createCell('Check_type_of_toilet_present_001/4'),
            WriterEntityFactory::createCell('Check_type_of_toilet_present_001/5'),
            WriterEntityFactory::createCell('_4_cdc_soap'),
            WriterEntityFactory::createCell('_5_cdc_waste'),
            WriterEntityFactory::createCell('_6_cdc_garb'),
            WriterEntityFactory::createCell('_C_1_toilet'),
            WriterEntityFactory::createCell('_C_2_functional'),
            WriterEntityFactory::createCell('_C_3_water'),
            WriterEntityFactory::createCell('Check_type_of_toilet_present_002'),
            WriterEntityFactory::createCell('Check_type_of_toilet_present_002/flush_pour_flush_to_sewer'),
            WriterEntityFactory::createCell('Check_type_of_toilet_present_002/flush_pour_flush_to_septic'),
            WriterEntityFactory::createCell('Check_type_of_toilet_present_002/flush_pour_flush_to_pit'),
            WriterEntityFactory::createCell('Check_type_of_toilet_present_002/ventilated_improved_pit_latrine'),
            WriterEntityFactory::createCell('Check_type_of_toilet_present_002/pit_latrine'),
            WriterEntityFactory::createCell('_C_4_segregation'),
            WriterEntityFactory::createCell('_C_5_dispose'),
            WriterEntityFactory::createCell('no_of_heads'),
            WriterEntityFactory::createCell('name_enumerator'),
            WriterEntityFactory::createCell('pupils'),
            WriterEntityFactory::createCell('toilets'),
            WriterEntityFactory::createCell('calc_ratio'),
            WriterEntityFactory::createCell('_C_Average_Pupil_Fu_pils_is_calc_ratio'),
            WriterEntityFactory::createCell('_id'),
            WriterEntityFactory::createCell('_uuid'),
            WriterEntityFactory::createCell('_submission_time'),
            WriterEntityFactory::createCell('_validation_status'),
            WriterEntityFactory::createCell('_notes'),
            WriterEntityFactory::createCell('_status'),
            WriterEntityFactory::createCell('_submitted_by'),
            WriterEntityFactory::createCell('__version__'),
            WriterEntityFactory::createCell('_tags'),
            WriterEntityFactory::createCell('_index'),

        ];
        $singleRow = WriterEntityFactory::createRow($cells);
        $writer->addRow($singleRow);
        $writer->close();
        $fileContent = file_get_contents($filePath);
        dd($fileContent);
        // Set the appropriate headers to make the browser download the file
        $response = new Response($fileContent, 200, [
            'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition' => 'attachment; filename="your_file.xlsx"',
        ]);

        // Send the response to the browser
        return $response;
        // if($p1==$p2){
        //     for($i=0; $i<$p1; $i++){

        //     }
        // }else{
        //     dd("p1 is not equal to p2");
        // }
    }
    public function import_household_2(Request $request)
    {
        dd($request);
        $date = Carbon::now();
        $dateTime = $date->format('Y-m-d');
        $file = $request->myfile;
        $validate = $request->validate([
            'myfile' => 'required|mimes:xlsx,csv',
        ]);
        if ($validate) {
            $fileName = $file->getClientOriginalName();
            $file->move(storage_path('app/public'), "file.xlsx");
            $reader = ReaderEntityFactory::createReaderFromFile(storage_path('app/public') . "file.xlsx");

            $reader->open(public_path() . "/storage/file.xlsx");

            $row_index_arr = [];
            $group1 = [];
            $group2 = [];
            foreach ($reader->getSheetIterator() as $sheet) {
                if ($sheet->getIndex() === 0) {
                    foreach ($sheet->getRowIterator() as $rowIndex => $row) {
                        $cells = $row->getCells();
                        $row_type = $cells[0]->getValue();
                        $_uuid = $cells[97]->getValue();
                        //GROUP 1****************************************
                        $date_survey = $cells[0]->getValue();
                        $time_started = $cells[1]->getValue();
                        $ENUMERATOR = $cells[2]->getValue();
                        $district = $cells[3]->getValue();
                        $municipality = $cells[4]->getValue();

                        $barangay = $cells[5]->getValue();

                        $purok_sitio = $cells[6]->getValue();

                        $street = $cells[7]->getValue();
                        $housenumber = $cells[8]->getValue();
                        $unitnumber = $cells[9]->getValue();
                        $Location = $cells[10]->getValue();
                        $_Location_latitude = $cells[11]->getValue();
                        $_Location_longitude = $cells[12]->getValue();
                        $_Location_altitude = $cells[13]->getValue();
                        $_Location_precision = $cells[14]->getValue();
                        $name_respondent = $cells[15]->getValue();
                        $FIRST_NAME = $cells[16]->getValue();
                        $mname = $cells[17]->getValue();
                        $suffix = $cells[18]->getValue();
                        $name_respondent_001 = $cells[19]->getValue();
                        $FIRST_NAME_001 = $cells[20]->getValue();
                        $mname_001 = $cells[21]->getValue();
                        $suffix_001 = $cells[22]->getValue();
                        $_1_has_toilet = $cells[23]->getValue();
                        $_2_toilet_used = $cells[24]->getValue();
                        $_3_toilet_functional = $cells[25]->getValue();
                        $_4_soap = $cells[26]->getValue();
                        $_5_children = $cells[27]->getValue();
                        $_6_spaces = $cells[28]->getValue();
                        $_7_feces = $cells[29]->getValue();
                        $_8_composting = $cells[30]->getValue();
                        $_9_dispose = $cells[31]->getValue();
                        $_10_emptied = $cells[32]->getValue();
                        $_11_do_sludge = $cells[33]->getValue();
                        $_12_do_tank = $cells[34]->getValue();
                        $_13_sewer = $cells[35]->getValue();
                        $_14_check = $cells[36]->getValue();
                        $_14_check_1 = $cells[37]->getValue();
                        $_14_check_2 = $cells[38]->getValue();
                        $_14_check_3 = $cells[39]->getValue();
                        $_14_check_4 = $cells[40]->getValue();
                        $_14_check_5 = $cells[41]->getValue();
                        $_15_household = $cells[42]->getValue();
                        $_15_1_people = $cells[43]->getValue();
                        $_16_household = $cells[44]->getValue();
                        $_17_using = $cells[45]->getValue();
                        $_18_If_the_household_mediate_surroundings = $cells[46]->getValue();
                        $Take_a_photo_for_question_18 = $cells[47]->getValue();
                        $Take_a_photo_for_question_18_URL = $cells[48]->getValue();
                        $_19_materials = $cells[49]->getValue();
                        $Name_of_MRF = $cells[50]->getValue();
                        $Location_001 = $cells[51]->getValue();
                        $risk_level = $cells[52]->getValue();
                        $Risk_Level_is_risk_level = $cells[53]->getValue();
                        $relative_risk_assessment = $cells[54]->getValue();
                        $Relative_risk_is_re_tive_risk_assessment = $cells[55]->getValue();
                        $_1_Number_of_function_for_children_to_use = $cells[56]->getValue();
                        $_2_school_soap = $cells[57]->getValue();
                        $_3_school_gender = $cells[58]->getValue();

                        $mun = DB::table("municipalities")
                            ->where("code", $municipality)
                            ->first();
                        if ($mun) {
                            $municipality = $mun->municipality;
                        }
                        $bar = DB::table("barangays")
                            ->where("code", $barangay)
                            ->first();
                        if ($bar) {
                            $barangay = $bar->barangay;
                        }
                        $pur = DB::table("purok_sitios")
                            ->where("code", $purok_sitio)
                            ->first();
                        if ($pur) {
                            $purok_sitio = $pur->purok_sitio;
                        }
                        $group_1_details = [
                            "date_survey" => $date_survey,
                            "time_started" => $time_started,
                            "ENUMERATOR" => $ENUMERATOR,
                            "district" => $district,
                            "municipality" => $municipality,
                            "barangay" => $barangay,
                            "purok_sitio" => $purok_sitio,
                            "street" => $street,
                            "housenumber" => $housenumber,
                            "unitnumber" => $unitnumber,
                            "Location" => $Location,
                            "_Location_latitude" => $_Location_latitude,
                            "_Location_longitude" => $_Location_longitude,
                            "_Location_altitude" => $_Location_altitude,
                            "_Location_precision" => $_Location_precision,
                            "name_respondent" => $name_respondent,
                            "FIRST_NAME" => $FIRST_NAME,
                            "mname" => $mname,
                            "suffix" => $suffix,
                            "name_respondent_001" => $name_respondent_001,
                            "FIRST_NAME_001" => $FIRST_NAME_001,
                            "mname_001" => $mname_001,
                            "suffix_001" => $suffix_001,
                            "_1_has_toilet" => $_1_has_toilet,
                            "_2_toilet_used" => $_2_toilet_used,
                            "_3_toilet_functional" => $_3_toilet_functional,
                            "_4_soap" => $_4_soap,
                            "_5_children" => $_5_children,
                            "_6_spaces" => $_6_spaces,
                            "_7_feces" => $_7_feces,
                            "_8_composting" => $_8_composting,
                            "_9_dispose" => $_9_dispose,
                            "_10_emptied" => $_10_emptied,
                            "_11_do_sludge" => $_11_do_sludge,
                            "_12_do_tank" => $_12_do_tank,
                            "_13_sewer" => $_13_sewer,
                            "_14_check" => $_14_check,
                            "_14_check_1" => $_14_check_1,
                            "_14_check_2" => $_14_check_2,
                            "_14_check_3" => $_14_check_3,
                            "_14_check_4" => $_14_check_4,
                            "_14_check_5" => $_14_check_5,
                            "_15_household" => $_15_household,
                            "_15_1_people" => $_15_1_people,
                            "_16_household" => $_16_household,
                            "_17_using" => $_17_using,
                            "_18_If_the_household_mediate_surroundings" => $_18_If_the_household_mediate_surroundings,
                            "Take_a_photo_for_question_18" => $Take_a_photo_for_question_18,
                            "Take_a_photo_for_question_18_URL" => $Take_a_photo_for_question_18_URL,
                            "_19_materials" => $_19_materials,
                            "Name_of_MRF" => $Name_of_MRF,
                            "Location_001" => $Location_001,
                            "risk_level" => $risk_level,
                            "Risk_Level_is_risk_level" => $Risk_Level_is_risk_level,
                            "relative_risk_assessment" => $relative_risk_assessment,
                            "Relative_risk_is_re_tive_risk_assessment" => $Relative_risk_is_re_tive_risk_assessment,
                            "_1_Number_of_function_for_children_to_use" => $_1_Number_of_function_for_children_to_use,
                            "_2_school_soap" => $_2_school_soap,
                            "_3_school_gender" => $_3_school_gender,
                            "_uuid" => $_uuid,
                        ];
                        array_push($group1, $group_1_details);
                        //GROUP 2****************************************
                        $Check_type_of_toilet_present = $cells[59]->getValue();
                        $Check_type_of_toilet_present_1 = $cells[60]->getValue();
                        $Check_type_of_toilet_present_2 = $cells[61]->getValue();
                        $Check_type_of_toilet_present_3 = $cells[62]->getValue();
                        $Check_type_of_toilet_present_4 = $cells[63]->getValue();
                        $Check_type_of_toilet_present_5 = $cells[64]->getValue();
                        $_4_school_compost = $cells[65]->getValue();
                        $_5_school_segre = $cells[66]->getValue();
                        $_1_cdc_toilet = $cells[67]->getValue();
                        $_2_cdc_func = $cells[68]->getValue();
                        $_3_cdc_safe = $cells[69]->getValue();
                        $Check_type_of_toilet_present_001 = $cells[70]->getValue();
                        $Check_type_of_toilet_present_001_1 = $cells[71]->getValue();
                        $Check_type_of_toilet_present_001_2 = $cells[72]->getValue();
                        $Check_type_of_toilet_present_001_3 = $cells[73]->getValue();
                        $Check_type_of_toilet_present_001_4 = $cells[74]->getValue();
                        $Check_type_of_toilet_present_001_5 = $cells[75]->getValue();
                        $_4_cdc_soap = $cells[76]->getValue();
                        $_5_cdc_waste = $cells[77]->getValue();
                        $_6_cdc_garb = $cells[78]->getValue();
                        $_C_1_toilet = $cells[79]->getValue();
                        $_C_2_functional = $cells[80]->getValue();
                        $_C_3_water = $cells[81]->getValue();
                        $Check_type_of_toilet_present_002 = $cells[82]->getValue();
                        $Check_type_of_toilet_present_002_flush_sewer = $cells[83]->getValue();
                        $Check_type_of_toilet_present_002_flush_septic = $cells[84]->getValue();
                        $Check_type_of_toilet_present_002_flush_pit = $cells[85]->getValue();
                        $Check_type_of_toilet_present_002_ventilated = $cells[86]->getValue();
                        $Check_type_of_toilet_present_002_pit_lat = $cells[87]->getValue();
                        $_C_4_segregation = $cells[88]->getValue();
                        $_C_5_dispose = $cells[89]->getValue();
                        $no_of_heads = $cells[90]->getValue();
                        $name_enumerator = $cells[91]->getValue();
                        $pupils = $cells[92]->getValue();
                        $toilets = $cells[93]->getValue();
                        $calc_ratio = $cells[94]->getValue();
                        $_C_Average_Pupil_Fu_pils_is_calc_ratio = $cells[95]->getValue();
                        $_id = $cells[96]->getValue();

                        $_submission_time = $cells[98]->getValue();
                        $_validation_status = $cells[99]->getValue();
                        $_notes = $cells[100]->getValue();
                        $_status = $cells[101]->getValue();
                        $_submitted_by = $cells[102]->getValue();
                        $__version__ = $cells[103]->getValue();
                        $_tags = $cells[104]->getValue();
                        $_index = $cells[105]->getValue();
                        $group_2_details = [
                            "Check_type_of_toilet_present" => $Check_type_of_toilet_present,
                            "Check_type_of_toilet_present_1" => $Check_type_of_toilet_present_1,
                            "Check_type_of_toilet_present_2" => $Check_type_of_toilet_present_2,
                            "Check_type_of_toilet_present_3" => $Check_type_of_toilet_present_3,
                            "Check_type_of_toilet_present_4" => $Check_type_of_toilet_present_4,
                            "Check_type_of_toilet_present_5" => $Check_type_of_toilet_present_5,
                            "_4_school_compost" => $_4_school_compost,
                            "_5_school_segre" => $_5_school_segre,
                            "_1_cdc_toilet" => $_1_cdc_toilet,
                            "_2_cdc_func" => $_2_cdc_func,
                            "_3_cdc_safe" => $_3_cdc_safe,
                            "Check_type_of_toilet_present_001" => $Check_type_of_toilet_present_001,
                            "Check_type_of_toilet_present_001_1" => $Check_type_of_toilet_present_001_1,
                            "Check_type_of_toilet_present_001_2" => $Check_type_of_toilet_present_001_2,
                            "Check_type_of_toilet_present_001_3" => $Check_type_of_toilet_present_001_3,
                            "Check_type_of_toilet_present_001_4" => $Check_type_of_toilet_present_001_4,
                            "Check_type_of_toilet_present_001_5" => $Check_type_of_toilet_present_001_5,
                            "_4_cdc_soap" => $_4_cdc_soap,
                            "_5_cdc_waste" => $_5_cdc_waste,
                            "_6_cdc_garb" => $_6_cdc_garb,
                            "_C_1_toilet" => $_C_1_toilet,
                            "_C_2_functional" => $_C_2_functional,
                            "_C_3_water" => $_C_3_water,
                            "Check_type_of_toilet_present_002" => $Check_type_of_toilet_present_002,
                            "Check_type_of_toilet_present_002_flush_sewer" => $Check_type_of_toilet_present_002_flush_sewer,
                            "Check_type_of_toilet_present_002_flush_septic" => $Check_type_of_toilet_present_002_flush_septic,
                            "Check_type_of_toilet_present_002_flush_pit" => $Check_type_of_toilet_present_002_flush_pit,
                            "Check_type_of_toilet_present_002_ventilated" => $Check_type_of_toilet_present_002_ventilated,
                            "Check_type_of_toilet_present_002_pit_lat" => $Check_type_of_toilet_present_002_pit_lat,
                            "_C_4_segregation" => $_C_4_segregation,
                            "_C_5_dispose" => $_C_5_dispose,
                            "no_of_heads" => $no_of_heads,
                            "name_enumerator" => $name_enumerator,
                            "pupils" => $pupils,
                            "toilets" => $toilets,
                            "calc_ratio" => $calc_ratio,
                            "_C_Average_Pupil_Fu_pils_is_calc_ratio" => $_C_Average_Pupil_Fu_pils_is_calc_ratio,
                            "_id" => $_id,
                            "_uuid" => $_uuid,
                            "_submission_time" => $_submission_time,
                            "_validation_status" => $_validation_status,
                            "_notes" => $_notes,
                            "_status" => $_status,
                            "_submitted_by" => $_submitted_by,
                            "__version__" => $__version__,
                            "_tags" => $_tags,
                            "_index" => $_index,
                        ];
                        array_push($group2, $group_2_details);
                    }
                }
            }
            $chunked = array_chunk($group1, 1000);
            foreach ($chunked as $key => $value) {
                DB::table('phatss_data')->upsert($value, ['_uuid']);
            }
            $chunked = array_chunk($group2, 1000);
            foreach ($chunked as $key => $value) {
                DB::table('phatts_data2s')->upsert($value, ['_uuid']);
            }
            return redirect('/')
                ->with('message', 'Import done successfully');
        } else {
            return redirect('/')
                ->with('error', 'File not validated successfully');
        }
    }
    public function import_household(Request $request)
    {
        // dd("rgergergergergre");
        $date = Carbon::now();
        $dateTime = $date->format('Y-m-d');
        $file = $request->myfile;
        $validate = $request->validate([
            'myfile' => 'required|mimes:xlsx,csv',
        ]);
        if ($validate) {
            $fileName = $file->getClientOriginalName();
            $file->move(storage_path('app/public'), "file.xlsx");
            $reader = ReaderEntityFactory::createReaderFromFile(storage_path('app/public') . "file.xlsx");

            $reader->open(public_path() . "/storage/file.xlsx");

            $row_index_arr = [];
            $group1 = [];
            $group2 = [];
            foreach ($reader->getSheetIterator() as $sheet) {
                if ($sheet->getIndex() === 0) {
                    foreach ($sheet->getRowIterator() as $rowIndex => $row) {
                        // dd("rowIndex: " . $rowIndex);
                        if ($rowIndex > 1) {
                            $cells = $row->getCells();
                            $row_type = $cells[0]->getValue();
                            // $_uuid = $cells[97]->getValue();
                            //GROUP 1****************************************
                            $date_survey = $cells[0]->getValue();
                            $time_started = $cells[1]->getValue();
                            $ENUMERATOR = $cells[2]->getValue();
                            $district = $cells[3]->getValue();
                            $municipality = $cells[4]->getValue();
                            $barangay = $cells[5]->getValue();
                            $purok_sitio = $cells[6]->getValue();
                            $street = $cells[7]->getValue();
                            $housenumber = $cells[8]->getValue();
                            $unitnumber = $cells[9]->getValue();
                            $Location = $cells[10]->getValue();
                            $_Location_latitude = $cells[11]->getValue();
                            $_Location_longitude = $cells[12]->getValue();
                            $_Location_altitude = $cells[13]->getValue();
                            $_Location_precision = $cells[14]->getValue();
                            $LAST_NAME = $cells[15]->getValue();
                            $FIRST_NAME = $cells[16]->getValue();
                            $MIDDLENAME = $cells[17]->getValue();
                            $SUFFIX = $cells[18]->getValue();
                            $LAST_NAME2 = $cells[19]->getValue();
                            $FIRST_NAME2 = $cells[20]->getValue();
                            $MIDDLENAME2 = $cells[21]->getValue();
                            $SUFFIX2 = $cells[22]->getValue();
                            $_1_has_toilet = $cells[23]->getValue();
                            $_2_toilet_used = $cells[24]->getValue();
                            $_3_toilet_functional = $cells[25]->getValue();
                            $_4_soap = $cells[26]->getValue();
                            $_5_children = $cells[27]->getValue();
                            $_6_spaces = $cells[28]->getValue();
                            $_7_feces = $cells[29]->getValue();
                            $_8_composting = $cells[30]->getValue();
                            $_9_dispose = $cells[31]->getValue();
                            $_10_emptied = $cells[32]->getValue();
                            $_11_do_sludge = $cells[33]->getValue();
                            $_12_do_tank = $cells[34]->getValue();
                            $_13_sewer = $cells[35]->getValue();
                            $_14_check = $cells[36]->getValue();
                            $_14_check_flush_pour_to_sewer = $cells[37]->getValue();
                            $_14_check_flush_pour_to_septic_tank = $cells[38]->getValue();
                            $_14_check_flush_pour_to_pit = $cells[39]->getValue();
                            $_14_check_ventilated_imrpoved_pit_Latrine = $cells[40]->getValue();
                            $_14_check_pit_latrine = $cells[41]->getValue();
                            $_15_household = $cells[42]->getValue();
                            $_15_1_people = $cells[43]->getValue();
                            $_16_household = $cells[44]->getValue();
                            $_17_using = $cells[45]->getValue();
                            $_18_If_the_household_mediate_surroundings = $cells[46]->getValue();
                            $Take_a_photo_for_question_18 = $cells[47]->getValue();
                            $Take_a_photo_for_question_18_url = $cells[48]->getValue();
                            $_19_materials = $cells[49]->getValue();
                            $Name_of_MRF = $cells[50]->getValue();
                            $location_mrf = $cells[51]->getValue();
                            $risk_level = $cells[52]->getValue();
                            $risk_level_value = $cells[53]->getValue();
                            $relative_risk_assessment = $cells[54]->getValue();
                            $Relative_risk_is_re_tive_risk_assessment = $cells[55]->getValue();
                            $_id = $cells[56]->getValue();
                            $_uuid = $cells[57]->getValue();
                            $_submission_time = $cells[58]->getValue();
                            $_validation_status = $cells[59]->getValue();
                            $_notes = $cells[60]->getValue();
                            $_status = $cells[61]->getValue();
                            $_submitted_by = $cells[62]->getValue();
                            $__version__ = $cells[63]->getValue();
                            $_tags = $cells[64]->getValue();
                            $_index = $cells[65]->getValue();
                            $mun = DB::table("municipalities")
                                ->where("code", $municipality)
                                ->first();
                            if ($mun) {
                                $municipality = $mun->municipality;
                            }
                            $bar = DB::table("barangays")
                                ->where("code", $barangay)
                                ->first();
                            if ($bar) {
                                $barangay = $bar->barangay;
                            }
                            $pur = DB::table("purok_sitios")
                                ->where("code", $purok_sitio)
                                ->first();
                            if ($pur) {
                                $purok_sitio = $pur->purok_sitio;
                            }
                            $group_1_details = [
                                "date_survey" => $date_survey,
                                "time_started" => $time_started,
                                "ENUMERATOR" => $ENUMERATOR,
                                "district" => $district,
                                "municipality" => $municipality,
                                "barangay" => $barangay,
                                "purok_sitio" => $purok_sitio,
                                "street" => $street,
                                "housenumber" => $housenumber,
                                "unitnumber" => $unitnumber,
                                "Location" => $Location,
                                "_Location_latitude" => $_Location_latitude,
                                "_Location_longitude" => $_Location_longitude,
                                "_Location_altitude" => $_Location_altitude,
                                "_Location_precision" => $_Location_precision,
                                "LAST_NAME" => $LAST_NAME,
                                "FIRST_NAME" => $FIRST_NAME,
                                "MIDDLENAME" => $MIDDLENAME,
                                "SUFFIX" => $SUFFIX,
                                "LAST_NAME2" => $LAST_NAME2,
                                "FIRST_NAME2" => $FIRST_NAME2,
                                "MIDDLENAME2" => $MIDDLENAME2,
                                "SUFFIX2" => $SUFFIX2,
                                "_1_has_toilet" => $_1_has_toilet,
                                "_2_toilet_used" => $_2_toilet_used,
                                "_3_toilet_functional" => $_3_toilet_functional,
                                "_4_soap" => $_4_soap,
                                "_5_children" => $_5_children,
                                "_6_spaces" => $_6_spaces,
                                "_7_feces" => $_7_feces,
                                "_8_composting" => $_8_composting,
                                "_9_dispose" => $_9_dispose,
                                "_10_emptied" => $_10_emptied,
                                "_11_do_sludge" => $_11_do_sludge,
                                "_12_do_tank" => $_12_do_tank,
                                "_13_sewer" => $_13_sewer,
                                "_14_check" => $_14_check,
                                "_14_check_flush_pour_to_sewer" => $_14_check_flush_pour_to_sewer,
                                "_14_check_flush_pour_to_septic_tank" => $_14_check_flush_pour_to_septic_tank,
                                "_14_check_flush_pour_to_pit" => $_14_check_flush_pour_to_pit,
                                "_14_check_ventilated_imrpoved_pit_Latrine" => $_14_check_ventilated_imrpoved_pit_Latrine,
                                "_14_check_pit_latrine" => $_14_check_pit_latrine,
                                "_15_household" => $_15_household,
                                "_15_1_people" => $_15_1_people,
                                "_16_household" => $_16_household,
                                "_17_using" => $_17_using,
                                "_18_If_the_household_mediate_surroundings" => $_18_If_the_household_mediate_surroundings,
                                "Take_a_photo_for_question_18" => $Take_a_photo_for_question_18,
                                "Take_a_photo_for_question_18_url" => $Take_a_photo_for_question_18_url,
                                "_19_materials" => $_19_materials,
                                "Name_of_MRF" => $Name_of_MRF,
                                "location_mrf" => $location_mrf,
                                "risk_level" => $risk_level,
                                "risk_level_value" => $risk_level_value,
                                "relative_risk_assessment" => $relative_risk_assessment,
                                "Relative_risk_is_re_tive_risk_assessment" => $Relative_risk_is_re_tive_risk_assessment,
                                "_id" => $_id,
                                "_uuid" => $_uuid,
                                "_submission_time" => $_submission_time,
                                "_validation_status" => $_validation_status,
                                "_notes" => $_notes,
                                "_status" => $_status,
                                "_submitted_by" => $_submitted_by,
                                "__version__" => $__version__,
                                "_tags" => $_tags,
                                "_index" => $_index,
                            ];
                            array_push($group1, $group_1_details);
                        }
                    }
                }
            }
            $chunkSize = 500;
            $chunked = array_chunk($group1, $chunkSize);
            // dd($chunked);
            foreach ($chunked as $key => $value) {
                // Normalize the UUIDs
                foreach ($value as &$row) {
                    $row['_uuid'] = strtolower(trim($row['_uuid']));
                }

                foreach ($value as $row) {
                    // Check if a record with the same _uuid already exists
                    $existingRecord = DB::table('house_holds')
                        ->where('_uuid', $row['_uuid'])
                        ->first();

                    if ($existingRecord) {
                        // Update the existing record
                        DB::table('house_holds')
                            ->where('_uuid', $row['_uuid'])
                            ->update([
                                // 'ENUMERATOR' => $row['ENUMERATOR'],
                                'date_survey' => $row['date_survey'],
                                'time_started' => $row['time_started'],
                                'ENUMERATOR' => $row['ENUMERATOR'],
                                'district' => $row['district'],
                                'municipality' => $row['municipality'],
                                'barangay' => $row['barangay'],
                                'purok_sitio' => $row['purok_sitio'],
                                'street' => $row['street'],
                                'housenumber' => $row['housenumber'],
                                'unitnumber' => $row['unitnumber'],
                                'Location' => $row['Location'],
                                '_Location_latitude' => $row['_Location_latitude'],
                                '_Location_longitude' => $row['_Location_longitude'],
                                '_Location_altitude' => $row['_Location_altitude'],
                                '_Location_precision' => $row['_Location_precision'],
                                'LAST_NAME' => $row['LAST_NAME'],
                                'FIRST_NAME' => $row['FIRST_NAME'],
                                'MIDDLENAME' => $row['MIDDLENAME'],
                                'SUFFIX' => $row['SUFFIX'],
                                'LAST_NAME2' => $row['LAST_NAME2'],
                                'FIRST_NAME2' => $row['FIRST_NAME2'],
                                'MIDDLENAME2' => $row['MIDDLENAME2'],
                                'SUFFIX2' => $row['SUFFIX2'],
                                '_1_has_toilet' => $row['_1_has_toilet'],
                                '_2_toilet_used' => $row['_2_toilet_used'],
                                '_3_toilet_functional' => $row['_3_toilet_functional'],
                                '_4_soap' => $row['_4_soap'],
                                '_5_children' => $row['_5_children'],
                                '_6_spaces' => $row['_6_spaces'],
                                '_7_feces' => $row['_7_feces'],
                                '_8_composting' => $row['_8_composting'],
                                '_9_dispose' => $row['_9_dispose'],
                                '_10_emptied' => $row['_10_emptied'],
                                '_11_do_sludge' => $row['_11_do_sludge'],
                                '_12_do_tank' => $row['_12_do_tank'],
                                '_13_sewer' => $row['_13_sewer'],
                                '_14_check' => $row['_14_check'],
                                '_14_check_flush_pour_to_sewer' => $row['_14_check_flush_pour_to_sewer'],
                                '_14_check_flush_pour_to_septic_tank' => $row['_14_check_flush_pour_to_septic_tank'],
                                '_14_check_flush_pour_to_pit' => $row['_14_check_flush_pour_to_pit'],
                                '_14_check_ventilated_imrpoved_pit_Latrine' => $row['_14_check_ventilated_imrpoved_pit_Latrine'],
                                '_14_check_pit_latrine' => $row['_14_check_pit_latrine'],
                                '_15_household' => $row['_15_household'],
                                '_15_1_people' => $row['_15_1_people'],
                                '_16_household' => $row['_16_household'],
                                '_17_using' => $row['_17_using'],
                                '_18_If_the_household_mediate_surroundings' => $row['_18_If_the_household_mediate_surroundings'],
                                'Take_a_photo_for_question_18' => $row['Take_a_photo_for_question_18'],
                                'Take_a_photo_for_question_18_url' => $row['Take_a_photo_for_question_18_url'],
                                '_19_materials' => $row['_19_materials'],
                                'Name_of_MRF' => $row['Name_of_MRF'],
                                'location_mrf' => $row['location_mrf'],
                                'risk_level' => $row['risk_level'],
                                'risk_level_value' => $row['risk_level_value'],
                                'relative_risk_assessment' => $row['relative_risk_assessment'],
                                'Relative_risk_is_re_tive_risk_assessment' => $row['Relative_risk_is_re_tive_risk_assessment'],
                                '_id' => $row['_id'],
                                '_uuid' => $row['_uuid'],
                                '_submission_time' => $row['_submission_time'],
                                '_validation_status' => $row['_validation_status'],
                                '_notes' => $row['_notes'],
                                '_status' => $row['_status'],
                                '_submitted_by' => $row['_submitted_by'],
                                '__version__' => $row['__version__'],
                                '_tags' => $row['_tags'],
                                '_index' => $row['_index'],
                            ]);
                    } else {
                        // Insert the new record
                        DB::table('house_holds')->insert($row);
                    }
                }
            }
            // foreach ($chunked as $key => $value) {
            //     // dd($value);
            //     DB::table('house_holds')->upsert(
            //         $value,
            //         ['_uuid'],
            //         [
            //             'date_survey',
            //             'time_started',
            //             'ENUMERATOR',
            //             'district',
            //             'municipality',
            //             'barangay',
            //             'purok_sitio',
            //             'street',
            //             'housenumber',
            //             'unitnumber',
            //             'Location',
            //             '_Location_latitude',
            //             '_Location_longitude',
            //             '_Location_altitude',
            //             '_Location_precision',
            //             'LAST_NAME',
            //             'FIRST_NAME',
            //             'MIDDLENAME',
            //             'SUFFIX',
            //             'LAST_NAME2',
            //             'FIRST_NAME2',
            //             'MIDDLENAME2',
            //             'SUFFIX2',
            //             '_1_has_toilet',
            //             '_2_toilet_used',
            //             '_3_toilet_functional',
            //             '_4_soap',
            //             '_5_children',
            //             '_6_spaces',
            //             '_7_feces',
            //             '_8_composting',
            //             '_9_dispose',
            //             '_10_emptied',
            //             '_11_do_sludge',
            //             '_12_do_tank',
            //             '_13_sewer',
            //             '_14_check',
            //             '_14_check_flush_pour_to_sewer',
            //             '_14_check_flush_pour_to_septic_tank',
            //             '_14_check_flush_pour_to_pit',
            //             '_14_check_ventilated_imrpoved_pit_Latrine',
            //             '_14_check_pit_latrine',
            //             '_15_household',
            //             '_15_1_people',
            //             '_16_household',
            //             '_17_using',
            //             '_18_If_the_household_mediate_surroundings',
            //             'Take_a_photo_for_question_18',
            //             'Take_a_photo_for_question_18_url',
            //             '_19_materials',
            //             'Name_of_MRF',
            //             'location_mrf',
            //             'risk_level',
            //             'risk_level_value',
            //             'relative_risk_assessment',
            //             'Relative_risk_is_re_tive_risk_assessment',
            //             '_id',
            //             '_uuid',
            //             '_submission_time',
            //             '_validation_status',
            //             '_notes',
            //             '_status',
            //             '_submitted_by',
            //             '__version__',
            //             '_tags',
            //             '_index',
            //         ]
            //     );
            // }
            // $chunked = array_chunk($group2, 1000);
            // foreach ($chunked as $key => $value) {
            //     DB::table('phatts_data2s')->upsert($value, ['_uuid']);
            // }
            return redirect('/')
                ->with('message', 'Import done successfully');
        } else {
            return redirect('/')
                ->with('error', 'File not validated successfully');
        }
    }
    public function import_schools(Request $request)
    {
        // dd("school");
        $date = Carbon::now();
        $dateTime = $date->format('Y-m-d');
        $file = $request->myfile;
        $validate = $request->validate([
            'myfile' => 'required|mimes:xlsx,csv',
        ]);
        if ($validate) {
            $fileName = $file->getClientOriginalName();
            $file->move(storage_path('app/public'), "file.xlsx");
            $reader = ReaderEntityFactory::createReaderFromFile(storage_path('app/public') . "file.xlsx");

            $reader->open(public_path() . "/storage/file.xlsx");

            $row_index_arr = [];
            $group1 = [];
            $group2 = [];
            foreach ($reader->getSheetIterator() as $sheet) {
                if ($sheet->getIndex() === 0) {
                    foreach ($sheet->getRowIterator() as $rowIndex => $row) {
                        // dd("rowIndex: " . $rowIndex);
                        if ($rowIndex > 1) {
                            $cells = $row->getCells();
                            $row_type = $cells[0]->getValue();
                            // $_uuid = $cells[97]->getValue();
                            //GROUP 1****************************************
                            $start = $cells[0]->getValue();
                            $end = $cells[1]->getValue();
                            $date_survey = $cells[2]->getValue();
                            $time_started = $cells[3]->getValue();
                            $ENUMERATOR = $cells[4]->getValue();
                            $district = $cells[5]->getValue();
                            $municipality = $cells[6]->getValue();
                            $barangay = $cells[7]->getValue();
                            $purok_sitio = $cells[8]->getValue();
                            $street = $cells[9]->getValue();
                            $housenumber = $cells[10]->getValue();
                            $unitnumber = $cells[11]->getValue();
                            $Location = $cells[12]->getValue();
                            $_Location_latitude = $cells[13]->getValue();
                            $_Location_longitude = $cells[14]->getValue();
                            $_Location_altitude = $cells[15]->getValue();
                            $_Location_precision = $cells[16]->getValue();
                            $pupils = $cells[17]->getValue();
                            $toilets = $cells[18]->getValue();
                            $calc_ratio = $cells[19]->getValue();
                            $_C_Average_Pupil_Fu_pils_is_calc_ratio = $cells[20]->getValue();
                            $_1_Number_of_functio_for_children_to_use = $cells[21]->getValue();
                            $_2_school_soap = $cells[22]->getValue();
                            $_3_school_gender = $cells[23]->getValue();
                            $Check_type_of_toilet_present = $cells[24]->getValue();
                            $Check_type_of_toilet_present_flush_pour_to_sewer = $cells[25]->getValue();
                            $Check_type_of_toilet_present_flush_pour_to_septic_tank = $cells[26]->getValue();
                            $Check_type_of_toilet_present_flush_pour_to_pit = $cells[27]->getValue();
                            $Check_type_of_toilet_present_ventilated_imrpoved_latrine = $cells[28]->getValue();
                            $Check_type_of_toilet_present_pit_latrine = $cells[29]->getValue();
                            $_4_school_compost = $cells[30]->getValue();
                            $_5_school_segre = $cells[31]->getValue();
                            $_id = $cells[32]->getValue();
                            $_uuid = $cells[33]->getValue();
                            $_submission_time = $cells[34]->getValue();
                            $_validation_status = $cells[35]->getValue();
                            $_notes = $cells[36]->getValue();
                            $_status = $cells[37]->getValue();
                            $_submitted_by = $cells[38]->getValue();
                            $__version__ = $cells[39]->getValue();
                            $_tags = $cells[40]->getValue();
                            $_index = $cells[41]->getValue();
                            $mun = DB::table("municipalities")
                                ->where("code", $municipality)
                                ->first();
                            if ($mun) {
                                $municipality = $mun->municipality;
                            }
                            $bar = DB::table("barangays")
                                ->where("code", $barangay)
                                ->first();
                            if ($bar) {
                                $barangay = $bar->barangay;
                            }
                            $pur = DB::table("purok_sitios")
                                ->where("code", $purok_sitio)
                                ->first();
                            if ($pur) {
                                $purok_sitio = $pur->purok_sitio;
                            }
                            $group_1_details = [
                                "start" => $start,
                                "end" => $end,
                                "date_survey" => $date_survey,
                                "time_started" => $time_started,
                                "ENUMERATOR" => $ENUMERATOR,
                                "district" => $district,
                                "municipality" => $municipality,
                                "barangay" => $barangay,
                                "purok_sitio" => $purok_sitio,
                                "street" => $street,
                                "housenumber" => $housenumber,
                                "unitnumber" => $unitnumber,
                                "Location" => $Location,
                                "_Location_latitude" => $_Location_latitude,
                                "_Location_longitude" => $_Location_longitude,
                                "_Location_altitude" => $_Location_altitude,
                                "_Location_precision" => $_Location_precision,
                                "pupils" => $pupils,
                                "toilets" => $toilets,
                                "calc_ratio" => $calc_ratio,
                                "_C_Average_Pupil_Fu_pils_is_calc_ratio" => $_C_Average_Pupil_Fu_pils_is_calc_ratio,
                                "_1_Number_of_functio_for_children_to_use" => $_1_Number_of_functio_for_children_to_use,
                                "_2_school_soap" => $_2_school_soap,
                                "_3_school_gender" => $_3_school_gender,
                                "Check_type_of_toilet_present" => $Check_type_of_toilet_present,
                                "Check_type_of_toilet_present_flush_pour_to_sewer" => $Check_type_of_toilet_present_flush_pour_to_sewer,
                                "Check_type_of_toilet_present_flush_pour_to_septic_tank" => $Check_type_of_toilet_present_flush_pour_to_septic_tank,
                                "Check_type_of_toilet_present_flush_pour_to_pit" => $Check_type_of_toilet_present_flush_pour_to_pit,
                                "Check_type_of_toilet_present_ventilated_imrpoved_latrine" => $Check_type_of_toilet_present_ventilated_imrpoved_latrine,
                                "Check_type_of_toilet_present_pit_latrine" => $Check_type_of_toilet_present_pit_latrine,
                                "_4_school_compost" => $_4_school_compost,
                                "_5_school_segre" => $_5_school_segre,
                                "_id" => $_id,
                                "_uuid" => $_uuid,
                                "_submission_time" => $_submission_time,
                                "_validation_status" => $_validation_status,
                                "_notes" => $_notes,
                                "_status" => $_status,
                                "_submitted_by" => $_submitted_by,
                                "__version__" => $__version__,
                                "_tags" => $_tags,
                                "_index" => $_index,
                            ];
                            array_push($group1, $group_1_details);
                        }
                    }
                }
            }
            $chunkSize = 500;
            $chunked = array_chunk($group1, $chunkSize);
            // dd($chunked);
            foreach ($chunked as $key => $value) {
                // Normalize the UUIDs
                // foreach ($value as &$row) {
                //     $row['_uuid'] = strtolower(trim($row['_uuid']));
                // }

                foreach ($value as $row) {
                    $row['_uuid'] = strtolower(trim($row['_uuid']));
                    // Check if a record with the same _uuid already exists
                    $existingRecord = DB::table('schools')
                        ->where('_uuid', $row['_uuid'])
                        ->first();

                    if ($existingRecord) {
                        // Update the existing record
                        DB::table('schools')
                            ->where('_uuid', $row['_uuid'])
                            ->update([
                                // 'ENUMERATOR' => $row['ENUMERATOR'],
                                'start' => $row['start'],
                                'end' => $row['end'],
                                'date_survey' => $row['date_survey'],
                                'time_started' => $row['time_started'],
                                'ENUMERATOR' => $row['ENUMERATOR'],
                                'district' => $row['district'],
                                'municipality' => $row['municipality'],
                                'barangay' => $row['barangay'],
                                'purok_sitio' => $row['purok_sitio'],
                                'street' => $row['street'],
                                'housenumber' => $row['housenumber'],
                                'unitnumber' => $row['unitnumber'],
                                'Location' => $row['Location'],
                                '_Location_latitude' => $row['_Location_latitude'],
                                '_Location_longitude' => $row['_Location_longitude'],
                                '_Location_altitude' => $row['_Location_altitude'],
                                '_Location_precision' => $row['_Location_precision'],
                                'pupils' => $row['pupils'],
                                'toilets' => $row['toilets'],
                                'calc_ratio' => $row['calc_ratio'],
                                '_C_Average_Pupil_Fu_pils_is_calc_ratio' => $row['_C_Average_Pupil_Fu_pils_is_calc_ratio'],
                                '_1_Number_of_functio_for_children_to_use' => $row['_1_Number_of_functio_for_children_to_use'],
                                '_2_school_soap' => $row['_2_school_soap'],
                                '_3_school_gender' => $row['_3_school_gender'],
                                'Check_type_of_toilet_present' => $row['Check_type_of_toilet_present'],
                                'Check_type_of_toilet_present_flush_pour_to_sewer' => $row['Check_type_of_toilet_present_flush_pour_to_sewer'],
                                'Check_type_of_toilet_present_flush_pour_to_septic_tank' => $row['Check_type_of_toilet_present_flush_pour_to_septic_tank'],
                                'Check_type_of_toilet_present_flush_pour_to_pit' => $row['Check_type_of_toilet_present_flush_pour_to_pit'],
                                'Check_type_of_toilet_present_ventilated_imrpoved_latrine' => $row['Check_type_of_toilet_present_ventilated_imrpoved_latrine'],
                                'Check_type_of_toilet_present_pit_latrine' => $row['Check_type_of_toilet_present_pit_latrine'],
                                '_4_school_compost' => $row['_4_school_compost'],
                                '_5_school_segre' => $row['_5_school_segre'],
                                '_id' => $row['_id'],
                                '_uuid' => $row['_uuid'],
                                '_submission_time' => $row['_submission_time'],
                                '_validation_status' => $row['_validation_status'],
                                '_notes' => $row['_notes'],
                                '_status' => $row['_status'],
                                '_submitted_by' => $row['_submitted_by'],
                                '__version__' => $row['__version__'],
                                '_tags' => $row['_tags'],
                                '_index' => $row['_index'],

                            ]);
                    } else {
                        // Insert the new record
                        DB::table('schools')->insert($row);
                    }
                }
            }

            return redirect('/')
                ->with('message', 'Import done successfully');
        } else {
            return redirect('/')
                ->with('error', 'File not validated successfully');
        }
    }
    public function import_cdc(Request $request)
    {
        // dd("child development center");
        $date = Carbon::now();
        $dateTime = $date->format('Y-m-d');
        $file = $request->myfile;
        $validate = $request->validate([
            'myfile' => 'required|mimes:xlsx,csv',
        ]);
        if ($validate) {
            $fileName = $file->getClientOriginalName();
            $file->move(storage_path('app/public'), "file.xlsx");
            $reader = ReaderEntityFactory::createReaderFromFile(storage_path('app/public') . "file.xlsx");

            $reader->open(public_path() . "/storage/file.xlsx");

            $row_index_arr = [];
            $group1 = [];
            $group2 = [];
            foreach ($reader->getSheetIterator() as $sheet) {
                if ($sheet->getIndex() === 0) {
                    foreach ($sheet->getRowIterator() as $rowIndex => $row) {
                        // dd("rowIndex: " . $rowIndex);
                        if ($rowIndex > 1) {
                            $cells = $row->getCells();
                            $row_type = $cells[0]->getValue();
                            // $_uuid = $cells[97]->getValue();
                            //GROUP 1****************************************
                            $start = $cells[0]->getValue();
                            $end = $cells[1]->getValue();
                            $date_survey = $cells[2]->getValue();
                            $time_started = $cells[3]->getValue();
                            $ENUMERATOR = $cells[4]->getValue();
                            $district = $cells[5]->getValue();
                            $municipality = $cells[6]->getValue();
                            $barangay = $cells[7]->getValue();
                            $purok_sitio = $cells[8]->getValue();
                            $street = $cells[9]->getValue();
                            $housenumber = $cells[10]->getValue();
                            $unitnumber = $cells[11]->getValue();
                            $Location = $cells[12]->getValue();
                            $_Location_latitude = $cells[13]->getValue();
                            $_Location_longitude = $cells[14]->getValue();
                            $_Location_altitude = $cells[15]->getValue();
                            $_Location_precision = $cells[16]->getValue();
                            $Childcare_Development_Center = $cells[17]->getValue();
                            $_1_cdc_toilet = $cells[18]->getValue();
                            $_2_cdc_func = $cells[19]->getValue();
                            $_3_cdc_safe = $cells[20]->getValue();
                            $Check_type_of_toilet_present = $cells[21]->getValue();
                            $Check_type_of_toilet_present_flush_pour_to_sewer = $cells[22]->getValue();
                            $Check_type_of_toilet_present_flush_pour_to_septic_tank = $cells[23]->getValue();
                            $Check_type_of_toilet_present_flush_pour_to_pit = $cells[24]->getValue();
                            $Check_type_of_toilet_present_ventilated_imrpoved_latrine = $cells[25]->getValue();
                            $Check_type_of_toilet_present_pit_latrine = $cells[26]->getValue();
                            $_4_cdc_soap = $cells[27]->getValue();
                            $_5_cdc_waste = $cells[28]->getValue();
                            $_6_cdc_garb = $cells[29]->getValue();
                            $_id = $cells[30]->getValue();
                            $_uuid = $cells[31]->getValue();
                            $_submission_time = $cells[32]->getValue();
                            $_validation_status = $cells[33]->getValue();
                            $_notes = $cells[34]->getValue();
                            $_status = $cells[35]->getValue();
                            $_submitted_by = $cells[36]->getValue();
                            $__version__ = $cells[37]->getValue();
                            $_tags = $cells[38]->getValue();
                            $_index = $cells[39]->getValue();
                            $mun = DB::table("municipalities")
                                ->where("code", $municipality)
                                ->first();
                            if ($mun) {
                                $municipality = $mun->municipality;
                            }
                            $bar = DB::table("barangays")
                                ->where("code", $barangay)
                                ->first();
                            if ($bar) {
                                $barangay = $bar->barangay;
                            }
                            $pur = DB::table("purok_sitios")
                                ->where("code", $purok_sitio)
                                ->first();
                            if ($pur) {
                                $purok_sitio = $pur->purok_sitio;
                            }
                            $group_1_details = [
                                "start" => $start,
                                "end" => $end,
                                "date_survey" => $date_survey,
                                "time_started" => $time_started,
                                "ENUMERATOR" => $ENUMERATOR,
                                "district" => $district,
                                "municipality" => $municipality,
                                "barangay" => $barangay,
                                "purok_sitio" => $purok_sitio,
                                "street" => $street,
                                "housenumber" => $housenumber,
                                "unitnumber" => $unitnumber,
                                "Location" => $Location,
                                "_Location_latitude" => $_Location_latitude,
                                "_Location_longitude" => $_Location_longitude,
                                "_Location_altitude" => $_Location_altitude,
                                "_Location_precision" => $_Location_precision,
                                "Childcare_Development_Center" => $Childcare_Development_Center,
                                "_1_cdc_toilet" => $_1_cdc_toilet,
                                "_2_cdc_func" => $_2_cdc_func,
                                "_3_cdc_safe" => $_3_cdc_safe,
                                "Check_type_of_toilet_present" => $Check_type_of_toilet_present,
                                "Check_type_of_toilet_present_flush_pour_to_sewer" => $Check_type_of_toilet_present_flush_pour_to_sewer,
                                "Check_type_of_toilet_present_flush_pour_to_septic_tank" => $Check_type_of_toilet_present_flush_pour_to_septic_tank,
                                "Check_type_of_toilet_present_flush_pour_to_pit" => $Check_type_of_toilet_present_flush_pour_to_pit,
                                "Check_type_of_toilet_present_ventilated_imrpoved_latrine" => $Check_type_of_toilet_present_ventilated_imrpoved_latrine,
                                "Check_type_of_toilet_present_pit_latrine" => $Check_type_of_toilet_present_pit_latrine,
                                "_4_cdc_soap" => $_4_cdc_soap,
                                "_5_cdc_waste" => $_5_cdc_waste,
                                "_6_cdc_garb" => $_6_cdc_garb,
                                "_id" => $_id,
                                "_uuid" => $_uuid,
                                "_submission_time" => $_submission_time,
                                "_validation_status" => $_validation_status,
                                "_notes" => $_notes,
                                "_status" => $_status,
                                "_submitted_by" => $_submitted_by,
                                "__version__" => $__version__,
                                "_tags" => $_tags,
                                "_index" => $_index,
                            ];
                            array_push($group1, $group_1_details);
                        }
                    }
                }
            }
            $chunkSize = 500;
            $chunked = array_chunk($group1, $chunkSize);
            // dd($chunked);
            foreach ($chunked as $key => $value) {
                // Normalize the UUIDs
                // foreach ($value as &$row) {
                //     $row['_uuid'] = strtolower(trim($row['_uuid']));
                // }

                foreach ($value as $row) {
                    $row['_uuid'] = strtolower(trim($row['_uuid']));
                    // Check if a record with the same _uuid already exists
                    $existingRecord = DB::table('child_care_centers')
                        ->where('_uuid', $row['_uuid'])
                        ->first();

                    if ($existingRecord) {
                        // Update the existing record
                        DB::table('child_care_centers')
                            ->where('_uuid', $row['_uuid'])
                            ->update([
                                // 'ENUMERATOR' => $row['ENUMERATOR'],
                                'start' => $row['start'],
                                'end' => $row['end'],
                                'date_survey' => $row['date_survey'],
                                'time_started' => $row['time_started'],
                                'ENUMERATOR' => $row['ENUMERATOR'],
                                'district' => $row['district'],
                                'municipality' => $row['municipality'],
                                'barangay' => $row['barangay'],
                                'purok_sitio' => $row['purok_sitio'],
                                'street' => $row['street'],
                                'housenumber' => $row['housenumber'],
                                'unitnumber' => $row['unitnumber'],
                                'Location' => $row['Location'],
                                '_Location_latitude' => $row['_Location_latitude'],
                                '_Location_longitude' => $row['_Location_longitude'],
                                '_Location_altitude' => $row['_Location_altitude'],
                                '_Location_precision' => $row['_Location_precision'],
                                'Childcare_Development_Center' => $row['Childcare_Development_Center'],
                                '_1_cdc_toilet' => $row['_1_cdc_toilet'],
                                '_2_cdc_func' => $row['_2_cdc_func'],
                                '_3_cdc_safe' => $row['_3_cdc_safe'],
                                'Check_type_of_toilet_present' => $row['Check_type_of_toilet_present'],
                                'Check_type_of_toilet_present_flush_pour_to_sewer' => $row['Check_type_of_toilet_present_flush_pour_to_sewer'],
                                'Check_type_of_toilet_present_flush_pour_to_septic_tank' => $row['Check_type_of_toilet_present_flush_pour_to_septic_tank'],
                                'Check_type_of_toilet_present_flush_pour_to_pit' => $row['Check_type_of_toilet_present_flush_pour_to_pit'],
                                'Check_type_of_toilet_present_ventilated_imrpoved_latrine' => $row['Check_type_of_toilet_present_ventilated_imrpoved_latrine'],
                                'Check_type_of_toilet_present_pit_latrine' => $row['Check_type_of_toilet_present_pit_latrine'],
                                '_4_cdc_soap' => $row['_4_cdc_soap'],
                                '_5_cdc_waste' => $row['_5_cdc_waste'],
                                '_6_cdc_garb' => $row['_6_cdc_garb'],
                                '_id' => $row['_id'],
                                '_uuid' => $row['_uuid'],
                                '_submission_time' => $row['_submission_time'],
                                '_validation_status' => $row['_validation_status'],
                                '_notes' => $row['_notes'],
                                '_status' => $row['_status'],
                                '_submitted_by' => $row['_submitted_by'],
                                '__version__' => $row['__version__'],
                                '_tags' => $row['_tags'],
                                '_index' => $row['_index'],
                            ]);
                    } else {
                        // Insert the new record
                        DB::table('child_care_centers')->insert($row);
                    }
                }
            }

            return redirect('/')
                ->with('message', 'Import done successfully');
        } else {
            return redirect('/')
                ->with('error', 'File not validated successfully');
        }
    }
    public function import_health(Request $request)
    {
        // dd("import health facilities");
        $date = Carbon::now();
        $dateTime = $date->format('Y-m-d');
        $file = $request->myfile;
        $validate = $request->validate([
            'myfile' => 'required|mimes:xlsx,csv',
        ]);
        if ($validate) {
            $fileName = $file->getClientOriginalName();
            $file->move(
                storage_path('app/public'),
                "file.xlsx"
            );
            $reader = ReaderEntityFactory::createReaderFromFile(storage_path('app/public') . "file.xlsx");

            $reader->open(public_path() . "/storage/file.xlsx");

            $row_index_arr = [];
            $group1 = [];
            $group2 = [];
            foreach ($reader->getSheetIterator() as $sheet) {
                if ($sheet->getIndex() === 0) {
                    foreach ($sheet->getRowIterator() as $rowIndex => $row) {
                        // dd("rowIndex: " . $rowIndex);
                        if ($rowIndex > 1) {
                            $cells = $row->getCells();
                            $row_type = $cells[0]->getValue();
                            // $_uuid = $cells[97]->getValue();
                            //GROUP 1****************************************
                            $start = $cells[0]->getValue();
                            $end = $cells[1]->getValue();
                            $date_survey = $cells[2]->getValue();
                            $time_started = $cells[3]->getValue();
                            $ENUMERATOR = $cells[4]->getValue();
                            $district = $cells[5]->getValue();
                            $municipality = $cells[6]->getValue();
                            $barangay = $cells[7]->getValue();
                            $purok_sitio = $cells[8]->getValue();
                            $street = $cells[9]->getValue();
                            $housenumber = $cells[10]->getValue();
                            $unitnumber = $cells[11]->getValue();
                            $Location = $cells[12]->getValue();
                            $_Location_latitude = $cells[13]->getValue();
                            $_Location_longitude = $cells[14]->getValue();
                            $_Location_altitude = $cells[15]->getValue();
                            $_Location_precision = $cells[16]->getValue();
                            $Healthcare_Facility = $cells[17]->getValue();
                            $_C_1_toilet = $cells[18]->getValue();
                            $_C_2_functional = $cells[19]->getValue();
                            $_C_3_water = $cells[20]->getValue();
                            $Check_type_of_toilet_present = $cells[21]->getValue();
                            $Check_type_of_toilet_present_flush_pour_to_sewer = $cells[22]->getValue();
                            $Check_type_of_toilet_present_flush_pour_to_septic_tank = $cells[23]->getValue();
                            $Check_type_of_toilet_present_flush_pour_to_pit = $cells[24]->getValue();
                            $Check_type_of_toilet_present_ventilated_imrpoved_latrine = $cells[25]->getValue();
                            $Check_type_of_toilet_present_pit_latrine = $cells[26]->getValue();
                            $_C_4_segregation = $cells[27]->getValue();
                            $_C_5_dispose = $cells[28]->getValue();
                            $_id = $cells[29]->getValue();
                            $_uuid = $cells[30]->getValue();
                            $_submission_time = $cells[31]->getValue();
                            $_validation_status = $cells[32]->getValue();
                            $_notes = $cells[33]->getValue();
                            $_status = $cells[34]->getValue();
                            $_submitted_by = $cells[35]->getValue();
                            $__version__ = $cells[36]->getValue();
                            $_tags = $cells[37]->getValue();
                            $_index = $cells[38]->getValue();
                            $mun = DB::table("municipalities")
                                ->where("code", $municipality)
                                ->first();
                            if ($mun) {
                                $municipality = $mun->municipality;
                            }
                            $bar = DB::table("barangays")
                                ->where("code", $barangay)
                                ->first();
                            if ($bar) {
                                $barangay = $bar->barangay;
                            }
                            $pur = DB::table("purok_sitios")
                                ->where("code", $purok_sitio)
                                ->first();
                            if ($pur) {
                                $purok_sitio = $pur->purok_sitio;
                            }
                            $group_1_details = [
                                "start" => $start,
                                "end" => $end,
                                "date_survey" => $date_survey,
                                "time_started" => $time_started,
                                "ENUMERATOR" => $ENUMERATOR,
                                "district" => $district,
                                "municipality" => $municipality,
                                "barangay" => $barangay,
                                "purok_sitio" => $purok_sitio,
                                "street" => $street,
                                "housenumber" => $housenumber,
                                "unitnumber" => $unitnumber,
                                "Location" => $Location,
                                "_Location_latitude" => $_Location_latitude,
                                "_Location_longitude" => $_Location_longitude,
                                "_Location_altitude" => $_Location_altitude,
                                "_Location_precision" => $_Location_precision,
                                "Healthcare_Facility" => $Healthcare_Facility,
                                "_C_1_toilet" => $_C_1_toilet,
                                "_C_2_functional" => $_C_2_functional,
                                "_C_3_water" => $_C_3_water,
                                "Check_type_of_toilet_present" => $Check_type_of_toilet_present,
                                "Check_type_of_toilet_present_flush_pour_to_sewer" => $Check_type_of_toilet_present_flush_pour_to_sewer,
                                "Check_type_of_toilet_present_flush_pour_to_septic_tank" => $Check_type_of_toilet_present_flush_pour_to_septic_tank,
                                "Check_type_of_toilet_present_flush_pour_to_pit" => $Check_type_of_toilet_present_flush_pour_to_pit,
                                "Check_type_of_toilet_present_ventilated_imrpoved_latrine" => $Check_type_of_toilet_present_ventilated_imrpoved_latrine,
                                "Check_type_of_toilet_present_pit_latrine" => $Check_type_of_toilet_present_pit_latrine,
                                "_C_4_segregation" => $_C_4_segregation,
                                "_C_5_dispose" => $_C_5_dispose,
                                "_id" => $_id,
                                "_uuid" => $_uuid,
                                "_submission_time" => $_submission_time,
                                "_validation_status" => $_validation_status,
                                "_notes" => $_notes,
                                "_status" => $_status,
                                "_submitted_by" => $_submitted_by,
                                "__version__" => $__version__,
                                "_tags" => $_tags,
                                "_index" => $_index,
                            ];
                            array_push($group1, $group_1_details);
                        }
                    }
                }
            }
            $chunkSize = 500;
            $chunked = array_chunk($group1, $chunkSize);
            // dd($chunked);
            foreach ($chunked as $key => $value) {
                // Normalize the UUIDs
                // foreach ($value as &$row) {
                //     $row['_uuid'] = strtolower(trim($row['_uuid']));
                // }

                foreach ($value as $row) {
                    $row['_uuid'] = strtolower(trim($row['_uuid']));
                    // Check if a record with the same _uuid already exists
                    $existingRecord = DB::table('health_facilities')
                        ->where('_uuid', $row['_uuid'])
                        ->first();

                    if ($existingRecord) {
                        // Update the existing record
                        DB::table('health_facilities')
                            ->where('_uuid', $row['_uuid'])
                            ->update([
                                // 'ENUMERATOR' => $row['ENUMERATOR'],
                                'start' => $row['0'],
                                'end' => $row['1'],
                                'date_survey' => $row['2'],
                                'time_started' => $row['3'],
                                'ENUMERATOR' => $row['4'],
                                'district' => $row['5'],
                                'municipality' => $row['6'],
                                'barangay' => $row['7'],
                                'purok_sitio' => $row['8'],
                                'street' => $row['9'],
                                'housenumber' => $row['10'],
                                'unitnumber' => $row['11'],
                                'Location' => $row['12'],
                                '_Location_latitude' => $row['13'],
                                '_Location_longitude' => $row['14'],
                                '_Location_altitude' => $row['15'],
                                '_Location_precision' => $row['16'],
                                'Healthcare_Facility' => $row['17'],
                                '_C_1_toilet' => $row['18'],
                                '_C_2_functional' => $row['19'],
                                '_C_3_water' => $row['20'],
                                'Check_type_of_toilet_present' => $row['21'],
                                'Check_type_of_toilet_present_flush_pour_to_sewer' => $row['22'],
                                'Check_type_of_toilet_present_flush_pour_to_septic_tank' => $row['23'],
                                'Check_type_of_toilet_present_flush_pour_to_pit' => $row['24'],
                                'Check_type_of_toilet_present_ventilated_imrpoved_latrine' => $row['25'],
                                'Check_type_of_toilet_present_pit_latrine' => $row['26'],
                                '_C_4_segregation' => $row['27'],
                                '_C_5_dispose' => $row['28'],
                                '_id' => $row['29'],
                                '_uuid' => $row['30'],
                                '_submission_time' => $row['31'],
                                '_validation_status' => $row['32'],
                                '_notes' => $row['33'],
                                '_status' => $row['34'],
                                '_submitted_by' => $row['35'],
                                '__version__' => $row['36'],
                                '_tags' => $row['37'],
                                '_index' => $row['38'],
                            ]);
                    } else {
                        // Insert the new record
                        DB::table('health_facilities')->insert($row);
                    }
                }
            }

            return redirect('/')
                ->with('message', 'Import done successfully');
        } else {
            return redirect('/')
                ->with('error', 'File not validated successfully');
        }
    }
}
