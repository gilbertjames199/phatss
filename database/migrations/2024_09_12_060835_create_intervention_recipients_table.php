<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInterventionRecipientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('intervention_recipients', function (Blueprint $table) {
            $table->id();
            $table->integer('intervention_id');
            $table->string('purok_sitio');
            $table->string('barangay');
            $table->string('municipality');
            $table->string('uuid');
            $table->date('implemented_date_from');
            $table->date('implemented_date_to');
            $table->text('description');
            // $table->string('concerned_office')
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
        Schema::dropIfExists('intervention_recipients');
    }
}
