<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSchoolsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('schools', function (Blueprint $table) {
            $table->id();
            $table->string('start', 50);
            $table->string('end', 50);
            $table->string('date_survey', 50);
            $table->string('time_started', 50);
            $table->string('ENUMERATOR');
            $table->string('district', 15);
            $table->string('municipality', 100);
            $table->string('barangay', 100);
            $table->string('purok_sitio', 100);
            $table->string('street', 100);
            $table->string('housenumber', 100);
            $table->string('unitnumber', 100);
            $table->string('Location', 100);
            $table->string('_Location_latitude', 75);
            $table->string('_Location_longitude', 75);
            $table->string('_Location_altitude', 75);
            $table->string('_Location_precision', 75);
            $table->string('pupils', 15);
            $table->string('toilets', 15);
            $table->string('calc_ratio', 50);
            $table->string('_C_Average_Pupil_Fu_pils_is_calc_ratio', 50);
            $table->string('_1_Number_of_functio_for_children_to_use', 15);
            $table->string('_2_school_soap', 15);
            $table->string('_3_school_gender', 15);
            $table->text('Check_type_of_toilet_present');
            $table->string('Check_type_of_toilet_present_flush_pour_to_sewer', 15);
            $table->string('Check_type_of_toilet_present_flush_pour_to_septic_tank', 15);
            $table->string('Check_type_of_toilet_present_flush_pour_to_pit', 15);
            $table->string('Check_type_of_toilet_present_ventilated_imrpoved_latrine', 15);
            $table->string('Check_type_of_toilet_present_pit_latrine', 15);
            $table->string('_4_school_compost', 15);
            $table->string('_5_school_segre', 15);
            $table->string('_id', 20);
            $table->text('_uuid', 50);
            $table->text('_submission_time', 50);
            $table->string('_validation_status', 15);
            $table->string('_notes', 15);
            $table->string('_status', 50);
            $table->string('_submitted_by', 50);
            $table->string('__version__', 100);
            $table->string('_tags', 50);
            $table->string('_index', 15);
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
        Schema::dropIfExists('schools');
    }
}
