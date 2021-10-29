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
            $table->unsignedBigInteger('website_type_id');
            $table->string('name');
            $table->string('component_name');
            $table->longText('setting');
            $table->longText('contents');
            $table->longText('design');
            $table->boolean('is_navbar')->default(false);
            $table->softDeletes();
            $table->timestamps();

            // foreign key
            $table->foreign('website_type_id')->references('id')->on('website_types');
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
