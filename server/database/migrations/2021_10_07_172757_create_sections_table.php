<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sections', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('section_type_id');
            $table->string('name');
            $table->string('component_name');
            $table->longText('setting');
            $table->longText('contents');
            $table->longText('design');
            $table->softDeletes();
            $table->timestamps();

            // foreign key
            $table->foreign('section_type_id')->references('id')->on('section_types');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sections');
    }
}
