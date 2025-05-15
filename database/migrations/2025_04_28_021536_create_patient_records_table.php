<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePatientRecordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patient_records', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('middle_name');
            $table->string('last_name');
            $table->string('address_province')->nullable();
            $table->string('address_municipality')->nullable();
            $table->string('address_barangay')->nullable();
            $table->string('address_purok_sitio')->nullable();
            $table->string('address_house_number_street')->nullable();
            $table->date('birthdate');
            $table->string('sex');
            $table->string('occupation');
            $table->string('birth_place_province')->nullable();
            $table->string('birth_place_municipality')->nullable();
            $table->string('birth_place_barangay')->nullable();
            $table->string('birth_place_purok_sitio')->nullable();
            $table->string('birth_place_house_number_street')->nullable();
            $table->string('civil_status')->comment('Single/Maried/Divorced/Annulled/Widowed');
            $table->string('spouse_first')->nullable();
            $table->string('spouse_middle')->nullable();
            $table->string('spouse_last')->nullable();
            $table->string('mother_first')->nullable();
            $table->string('mother_middle')->nullable();
            $table->string('mother_last')->nullable();
            $table->string('father_first')->nullable();
            $table->string('father_middle')->nullable();
            $table->string('father_last')->nullable();
            $table->string('phil_health_member')->comment('yes/no');
            $table->string('phil_health_no')->nullable();
            $table->string('Religion')->nullable();
            $table->string('Nationality')->nullable();
            $table->string('spouse_occ')->nullable();
            $table->string('tel_no')->nullabe();
            $table->string('insurance')->nullable();
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
        Schema::dropIfExists('patient_records');
    }
}
