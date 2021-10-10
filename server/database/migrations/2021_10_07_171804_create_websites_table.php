<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWebsitesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('websites', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('website_type_id');
            $table->unsignedBigInteger('theme_id');
            $table->unsignedBigInteger('navbar_id');
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('logo')->nullable();
            $table->longText("contents")->nullable();
            $table->longText("design")->nullable();
            $table->softDeletes();
            $table->timestamps();

            // foreign keys
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('website_type_id')->references('id')->on('website_types');
            $table->foreign('theme_id')->references('id')->on('themes');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('websites');
    }
}
