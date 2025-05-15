<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHouseHoldsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('house_holds', function (Blueprint $table) {
            $table->id();
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
            $table->string('LAST_NAME');
            $table->string('FIRST_NAME');
            $table->string('MIDDLENAME');
            $table->string('SUFFIX');
            $table->string('LAST_NAME2');
            $table->string('FIRST_NAME2');
            $table->string('MIDDLENAME2');
            $table->string('SUFFIX2');
            $table->string('_1_has_toilet', 15);
            $table->string('_2_toilet_used', 15);
            $table->string('_3_toilet_functional', 15);
            $table->string('_4_soap', 15);
            $table->string('_5_children', 15);
            $table->string('_6_spaces', 15);
            $table->string('_7_feces', 15);
            $table->string('_8_composting', 15);
            $table->string('_9_dispose', 15);
            $table->string('_10_emptied', 15);
            $table->string('_11_do_sludge');
            $table->string('_12_do_tank');
            $table->text('_13_sewer', 15);
            $table->text('_14_check');
            $table->string('_14_check_flush_pour_to_sewer', 15);
            $table->string('_14_check_flush_pour_to_septic_tank', 15);
            $table->string('_14_check_flush_pour_to_pit', 15);
            $table->string('_14_check_ventilated_imrpoved_pit_Latrine', 15);
            $table->string('_14_check_pit_latrine', 15);
            $table->string('_15_household', 15);
            $table->text('_15_1_people');
            $table->string('_16_household', 15);
            $table->string('_17_using', 15);
            $table->text('_18_If_the_household_mediate_surroundings');
            $table->text('Take_a_photo_for_question_18');
            $table->text('Take_a_photo_for_question_18_url');
            $table->string('_19_materials', 15);
            $table->text('Name_of_MRF');
            $table->text('location_mrf');
            $table->string('risk_level', 15);
            $table->text('risk_level_value');
            $table->text('relative_risk_assessment');
            $table->text('Relative_risk_is_re_tive_risk_assessment');
            $table->string('_id', 15);
            $table->text('_uuid')->unique();
            $table->string('_submission_time');
            $table->string('_validation_status', 15);
            $table->string('_notes');
            $table->string('_status');
            $table->string('_submitted_by', 100);
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
        Schema::dropIfExists('house_holds');
    }
}
