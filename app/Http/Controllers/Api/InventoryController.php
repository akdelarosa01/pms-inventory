<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $inventories = DB::table('items as i')
                            ->leftJoin('inventory_items as ii','i.id','=','ii.item_id')
                            ->select(
                                DB::raw("ii.id as id"),
                                DB::raw("ii.id as item_id"),
                                DB::raw("i.item_code as item_code"),
                                DB::raw("i.item_desc as item_desc"),
                                DB::raw("i.item_category as item_category"),
                                DB::raw("i.item_type as item_type"),
                                DB::raw("ii.warehouse as warehouse"),
                                DB::raw("ii.quantity as quantity"),
                                DB::raw("ii.length as length"),
                                DB::raw("ii.width as width"),
                                DB::raw("ii.heat_no as heat_no"),
                                DB::raw("ii.lot_no as lot_no"),
                                DB::raw("ii.sc_no as sc_no"),
                                DB::raw("ii.supplier as supplier"),
                                DB::raw("ii.supplier_heat_no as supplier_heat_no"),
                                DB::raw("ii.material_used as material_used"),
                                DB::raw("ii.is_excess as is_excess"),
                                DB::raw("ii.updated_at as updated_at"),
                            )
                            ->get();
        return response()->json($inventories);
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
