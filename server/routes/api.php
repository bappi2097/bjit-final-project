<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/', function (Request $request) {
    return json_encode([
        "status" => http_response_code(200)
    ]);
});

Route::group(['prefix' => 'v1'], function () {

    Route::get('email/verify', 'Api\UserController@emailVerify')->name('email-verify');
    Route::group(['prefix' => 'user'], function () {
        Route::post('register', 'Api\UserController@register');
        Route::post('login', 'Api\UserController@login')->name('login');
        Route::post('forget-password', 'Api\UserController@forgetPassword');
        Route::post('reset-password/{token}', 'Api\UserController@resetPassword')->name('password.reset-submit');

        Route::group(['middleware' => ['auth:users', 'verified']], function () {
            Route::post('logout', 'Api\UserController@logout');
            Route::get('profile', 'Api\UserController@profile');
        });
    });

    Route::group(["as" => "admin.", "prefix" => "admin", "middleware" => ['auth:users', 'verified', "admin"]], function () {
        Route::get("dashboard", "Admin\DashboardController@getDashboardInfo")->name("dashboard-info");

        Route::prefix('user')->name("user.")->group(function () {
            Route::get("/", "Admin\UserController@index")->name("index");
            Route::post("/", "Admin\UserController@store")->name("store");
            Route::get("/{user}", "Admin\UserController@show")->name("show");
            Route::put("/{user}", "Admin\UserController@update")->name("update");
            Route::delete("/{user}", "Admin\UserController@destroy")->name("destroy");
        });

        Route::prefix('website-type')->name("website-type.")->group(function () {
            Route::get("/", "Admin\WebsiteTypeController@index")->name("index");
            Route::post("/", "Admin\WebsiteTypeController@store")->name("store");
            Route::get("/{websiteType}", "Admin\WebsiteTypeController@show")->name("show");
            Route::put("/{websiteType}", "Admin\WebsiteTypeController@update")->name("update");
            Route::delete("/{websiteType}", "Admin\WebsiteTypeController@destroy")->name("destroy");
        });

        Route::prefix('website')->name("website.")->group(function () {
            Route::get("/", "Admin\WebsiteController@index")->name("index");
            Route::post("/", "Admin\WebsiteController@store")->name("store");
            Route::get("/{website}", "Admin\WebsiteController@show")->name("show");
            Route::put("/{website}", "Admin\WebsiteController@update")->name("update");
            Route::delete("/{website}", "Admin\WebsiteController@destroy")->name("destroy");
        });

        Route::prefix('theme')->name("theme.")->group(function () {
            Route::get("/", "Admin\ThemeController@index")->name("index");
            Route::post("/", "Admin\ThemeController@store")->name("store");
            Route::get("/{theme}", "Admin\ThemeController@show")->name("show");
            Route::put("/{theme}", "Admin\ThemeController@update")->name("update");
            Route::delete("/{theme}", "Admin\ThemeController@destroy")->name("destroy");
        });

        Route::prefix('section')->name("section.")->group(function () {
            Route::get("/", "Admin\SectionController@index")->name("index");
            Route::post("/", "Admin\SectionController@store")->name("store");
            Route::get("/{section}", "Admin\SectionController@show")->name("show");
            Route::put("/{section}", "Admin\SectionController@update")->name("update");
            Route::delete("/{section}", "Admin\SectionController@destroy")->name("destroy");
        });

        Route::prefix('page')->name("page.")->group(function () {
            Route::get("/", "Admin\PageController@index")->name("index");
            Route::post("/", "Admin\PageController@store")->name("store");
            Route::get("/{page}", "Admin\PageController@show")->name("show");
            Route::put("/{page}", "Admin\PageController@update")->name("update");
            Route::delete("/{page}", "Admin\PageController@destroy")->name("destroy");
        });
    });
});
