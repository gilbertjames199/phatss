<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIssueInterventionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('issue_interventions', function (Blueprint $table) {
            $table->id();
            $table->string('issue_id');
            $table->string('intervention_id');
            $table->string('status')->nullable()->comment('0 -added, 1 -on-going, 2 -completed');
            $table->string('acted_by')->nullable();
            $table->string('date_acted')->nullable();
            $table->string('date_completed')->nullable();
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
        Schema::dropIfExists('issue_interventions');
    }
}
