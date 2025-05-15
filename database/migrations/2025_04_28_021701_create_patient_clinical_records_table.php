<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePatientClinicalRecordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patient_clinical_records', function (Blueprint $table) {
            $table->id();
            $table->integer('patient_id');
            $table->integer('type_of_visit')->comment('1/0')->default(0);
            $table->string('blood_pressure')->nullable();
            $table->string('temperature')->nullable();
            $table->string('pulse_cardiac_rate')->nullable();
            $table->string('respiratory_rate')->nullable();
            $table->string('height')->nullable();
            $table->string('weight')->nullable();
            $table->string('ob_gyn_lmp')->nullable();
            $table->string('ob_gyn_edc')->nullable();
            $table->string('ob_gyn_aog')->nullable();
            $table->integer('allergies')->comment('1/0')->default(0);
            $table->string('allergies_foods')->nullable();
            $table->string('allergies_drugs')->nullable();
            $table->string('allergies_others')->nullable();
            $table->string('allergies_others_specification')->nullable();
            $table->integer('covid_vaccinated')->comment('1/0')->default(0);
            $table->text('chief_complaints')->nullable();
            $table->integer('smoker')->comment('1/0')->default(0);
            $table->integer('smoker_type_e_cigarrette')->comment('1/0')->default(0);
            $table->integer('smoker_type_cigarrette')->comment('1/0')->default(0);
            $table->integer('smoker_type_cigars')->comment('1/0')->default(0);
            $table->integer('smoker_type_pipes')->comment('1/0')->default(0);
            $table->integer('smoker_others_specify')->comment('1/0')->default(0);
            $table->integer('smoker_others_specification')->comment('1/0')->default(0);
            $table->integer('smoker_quitter')->comment('1/0')->default(0);
            $table->text('doctor_order_subjective')->nullable();
            $table->text('doctor_order_objective')->nullable();
            $table->text('doctor_order_assessment')->nullable();
            $table->text('doctor_order_plan')->nullable();
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
        Schema::dropIfExists('patient_clinical_records');
    }
}
