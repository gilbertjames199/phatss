<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHealthFacilitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('health_facilities', function (Blueprint $table) {
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
            $table->string('Healthcare_Facility');
            $table->string('_C_1_toilet');
            $table->string('_C_2_functional');
            $table->string('_C_3_water');
            $table->string('Check_type_of_toilet_present');
            $table->string('Check_type_of_toilet_present_flush_pour_to_sewer');
            $table->string('Check_type_of_toilet_present_flush_pour_to_septic_tank');
            $table->string('Check_type_of_toilet_present_flush_pour_to_pit');
            $table->string('Check_type_of_toilet_present_ventilated_imrpoved_latrine');
            $table->string('Check_type_of_toilet_present_pit_latrine');
            $table->string('_C_4_segregation');
            $table->string('_C_5_dispose');
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
        Schema::dropIfExists('health_facilities');
    }
}
