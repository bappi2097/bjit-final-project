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

    Route::get('email/verify/{token}', 'Api\UserController@emailVerify')->name('email-verify');
    Route::group(['prefix' => 'user'], function () {
        Route::post('register', 'Api\UserController@register');
        Route::post('login', 'Api\UserController@login')->name('login');
        Route::post('forget-password', 'Api\UserController@forgetPassword');
        Route::post('reset-password', 'Api\UserController@resetPassword')->name('password.reset-submit');
        Route::get('reset-password/{token}', 'Api\UserController@resetPasswordForm');

        Route::group(['middleware' => ['auth:users', 'verified']], function () {
            Route::post('logout', 'Api\UserController@logout');
            Route::get('profile', 'Api\UserController@profile');
        });
    });
});
