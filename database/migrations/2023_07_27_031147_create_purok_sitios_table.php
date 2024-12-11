<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePurokSitiosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('purok_sitios', function (Blueprint $table) {
            $table->id();
            $table->string('purok_sitio')->nullable();
            $table->string('dist_filter')->nullable();
            $table->string('muni_filter')->nullable();
            $table->string('purok_filter')->nullable();
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
        Schema::dropIfExists('purok_sitios');
    }
}
