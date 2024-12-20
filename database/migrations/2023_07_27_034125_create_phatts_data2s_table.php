<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePhattsData2sTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('phatts_data2s', function (Blueprint $table) {
            $table->id();
            $table->string('Check_type_of_toilet_present')->nullable();
            $table->string('Check_type_of_toilet_present_1')->nullable();
            $table->string('Check_type_of_toilet_present_2')->nullable();
            $table->string('Check_type_of_toilet_present_3')->nullable();
            $table->string('Check_type_of_toilet_present_4')->nullable();
            $table->string('Check_type_of_toilet_present_5')->nullable();
            $table->string('_4_school_compost')->nullable();
            $table->string('_5_school_segre')->nullable();
            $table->string('_1_cdc_toilet')->nullable();
            $table->string('_2_cdc_func')->nullable();
            $table->string('_3_cdc_safe')->nullable();
            $table->string('Check_type_of_toilet_present_001')->nullable();
            $table->string('Check_type_of_toilet_present_001_1')->nullable();
            $table->string('Check_type_of_toilet_present_001_2')->nullable();
            $table->string('Check_type_of_toilet_present_001_3')->nullable();
            $table->string('Check_type_of_toilet_present_001_4')->nullable();
            $table->string('Check_type_of_toilet_present_001_5')->nullable();
            $table->string('_4_cdc_soap')->nullable();
            $table->string('_5_cdc_waste')->nullable();
            $table->string('_6_cdc_garb')->nullable();
            $table->string('_C_1_toilet')->nullable();
            $table->string('_C_2_functional')->nullable();
            $table->string('_C_3_water')->nullable();
            $table->string('Check_type_of_toilet_present_002')->nullable();
            $table->string('Check_type_of_toilet_present_002_flush_sewer')->nullable();
            $table->string('Check_type_of_toilet_present_002_flush_septic')->nullable();
            $table->string('Check_type_of_toilet_present_002_flush_pit')->nullable();
            $table->string('Check_type_of_toilet_present_002_ventilated')->nullable();
            $table->string('Check_type_of_toilet_present_002_pit_lat')->nullable();
            $table->string('_C_4_segregation')->nullable();
            $table->string('_C_5_dispose')->nullable();
            $table->string('no_of_heads')->nullable();
            $table->string('name_enumerator')->nullable();
            $table->string('pupils')->nullable();
            $table->string('toilets')->nullable();
            $table->string('calc_ratio')->nullable();
            $table->string('_C_Average_Pupil_Fu_pils_is_calc_ratio')->nullable();
            $table->string('_id')->nullable();
            $table->text('_uuid')->nullable();
            $table->string('_submission_time')->nullable();
            $table->string('_validation_status')->nullable();
            $table->string('_notes')->nullable();
            $table->string('_status')->nullable();
            $table->string('_submitted_by')->nullable();
            $table->string('__version__')->nullable();
            $table->string('_tags')->nullable();
            $table->string('_index')->nullable();
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
        Schema::dropIfExists('phatts_data2s');
    }
}
