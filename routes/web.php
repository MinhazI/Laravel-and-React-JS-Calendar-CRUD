<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('holiday/getHoliday/{id}', 'Api\HolidayController@edit');
Route::get('holiday', 'Api\HolidayController@index');
Route::delete('holiday/delete/{id}', 'Api\HolidayController@destroy');
Route::post('holiday/add', 'Api\HolidayController@store');
Route::put('holiday/update/{id}', 'Api\HolidayController@update');
Route::get('holiday/search/results/{startdate}/', 'Api\HolidayController@show');