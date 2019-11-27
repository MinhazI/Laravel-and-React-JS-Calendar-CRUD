<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Holidays;

class HolidayController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $result = Holidays::all();

        return $result;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $holiday = new Holidays();
        $holiday->name = $request->holidayName;
        $holiday->start_date = $request->holidayStartDate;
        $holiday->end_date = $request->holidayEndDate;

        $holiday->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($startDate)
    {

        $holiday = Holidays::where
        ('start_date', '==', $startDate)
        ->orWhere('end_date', '==', $startDate)
        ->get();
        
        return $holiday;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $holiday = Holidays::find($id);
        return $holiday;
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $holiday = Holidays::find($id);
        $holiday->name = $request->holidayName;
        $holiday->start_date = $request->holidayStartDate;
        $holiday->end_date = $request->holidayEndDate;
        
        $holiday->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

        $holiday = Holidays::find($id);
        $holiday->delete();
        //
    }
}
