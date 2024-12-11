<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChildCareCentersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('child_care_centers', function (Blueprint $table) {
            $table->id();
            $table->string('start');
            $table->string('end');
            $table->string('date_survey');
            $table->string('time_started');
            $table->string('ENUMERATOR');
            $table->string('district');
            $table->string('municipality');
            $table->string('barangay');
            $table->string('purok_sitio');
            $table->string('street');
            $table->string('housenumber');
            $table->string('unitnumber');
            $table->string('Location');
            $table->string('_Location_latitude');
            $table->string('_Location_longitude');
            $table->string('_Location_altitude');
            $table->string('_Location_precision');
            $table->string('Childcare_Development_Center');
            $table->string('_1_cdc_toilet');
            $table->string('_2_cdc_func');
            $table->string('_3_cdc_safe');
            $table->string('Check_type_of_toilet_present');
            $table->string('Check_type_of_toilet_present_flush_pour_to_sewer');
            $table->string('Check_type_of_toilet_present_flush_pour_to_septic_tank');
            $table->string('Check_type_of_toilet_present_flush_pour_to_pit');
            $table->string('Check_type_of_toilet_present_ventilated_imrpoved_latrine');
            $table->string('Check_type_of_toilet_present_pit_latrine');
            $table->string('_4_cdc_soap');
            $table->string('_5_cdc_waste');
            $table->string('_6_cdc_garb');
            $table->string('_id');
            $table->string('_uuid');
            $table->string('_submission_time');
            $table->string('_validation_status');
            $table->string('_notes');
            $table->string('_status');
            $table->string('_submitted_by');
            $table->string('__version__');
            $table->string('_tags');
            $table->string('_index');
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
        Schema::dropIfExists('child_care_centers');
    }
}
