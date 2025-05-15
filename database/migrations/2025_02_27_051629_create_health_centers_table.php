<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHealthCentersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('health_centers', function (Blueprint $table) {
            $table->id();
            $table->integer('FID')->nullable();
            $table->string('DESC')->nullable();
            $table->string('type')->nullable();
            $table->string('PLC_NME')->nullable();
            $table->string('des')->nullable();
            $table->string('municipality')->nullable();
            $table->string('barangay')->nullable();
            $table->string('Hazard_Suceptibility')->nullable();
            $table->string('risk_level')->nullable();
            $table->string('LU_control')->nullable();
            $table->string('Longitude')->nullable();
            $table->string('Latitude')->nullable();
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
        Schema::dropIfExists('health_centers');
    }
}
