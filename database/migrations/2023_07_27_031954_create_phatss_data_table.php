<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePhatssDataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('phatss_data', function (Blueprint $table) {
            $table->id();
            $table->string('date_survey')->nullable();
            $table->string('time_started')->nullable();
            $table->string('ENUMERATOR')->nullable();
            $table->string('district')->nullable();
            $table->string('municipality')->nullable();
            $table->string('barangay')->nullable();
            $table->string('purok_sitio')->nullable();
            $table->string('street')->nullable();
            $table->string('housenumber')->nullable();
            $table->string('unitnumber')->nullable();
            $table->string('Location')->nullable();
            $table->string('_Location_latitude')->nullable();
            $table->string('_Location_longitude')->nullable();
            $table->string('_Location_altitude')->nullable();
            $table->string('_Location_precision')->nullable();
            $table->string('name_respondent')->nullable();
            $table->string('FIRST_NAME')->nullable();
            $table->string('mname')->nullable();
            $table->string('suffix')->nullable();
            $table->string('name_respondent_001')->nullable();
            $table->string('FIRST_NAME_001')->nullable();
            $table->string('mname_001')->nullable();
            $table->string('suffix_001')->nullable();
            $table->string('_1_has_toilet')->nullable();
            $table->string('_2_toilet_used')->nullable();
            $table->string('_3_toilet_functional')->nullable();
            $table->string('_4_soap')->nullable();
            $table->string('_5_children')->nullable();
            $table->string('_6_spaces')->nullable();
            $table->string('_7_feces')->nullable();
            $table->string('_8_composting')->nullable();
            $table->string('_9_dispose')->nullable();
            $table->string('_10_emptied')->nullable();
            $table->string('_11_do_sludge')->nullable();
            $table->string('_12_do_tank')->nullable();
            $table->string('_13_sewer')->nullable();
            $table->string('_14_check')->nullable();
            $table->string('_14_check_1')->nullable();
            $table->string('_14_check_2')->nullable();
            $table->string('_14_check_3')->nullable();
            $table->string('_14_check_4')->nullable();
            $table->string('_14_check_5')->nullable();
            $table->string('_15_household')->nullable();
            $table->string('_15_1_people')->nullable();
            $table->string('_16_household')->nullable();
            $table->string('_17_using')->nullable();
            $table->string('_18_If_the_household_mediate_surroundings')->nullable();
            $table->string('Take_a_photo_for_question_18')->nullable();
            $table->string('Take_a_photo_for_question_18_URL')->nullable();
            $table->string('_19_materials')->nullable();
            $table->string('Name_of_MRF')->nullable();
            $table->string('Location_001')->nullable();
            $table->string('risk_level')->nullable();
            $table->string('Risk_Level_is_risk_level')->nullable();
            $table->string('relative_risk_assessment')->nullable();
            $table->string('Relative_risk_is_re_tive_risk_assessment')->nullable();
            $table->string('_1_Number_of_function_for_children_to_use')->nullable();
            $table->string('_2_school_soap')->nullable();
            $table->string('_3_school_gender')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('phatss_data');
    }
}
