<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ItemController extends Controller
{
    public function items()
    {
        $items = collect(DB::table('items as i')->select(
            DB::raw("i.id as id"),
            DB::raw("i.item_code as item_code"),
            DB::raw("i.item_desc as item_desc"),
            DB::raw("i.item_category as item_category"),
            DB::raw("i.item_type as item_type"),
            DB::raw("i.item as item"),
            DB::raw("i.schedule_class as schedule_class"),
            DB::raw("i.alloy as alloy"),
            DB::raw("i.size as size"),
            DB::raw("i.weight as weight"),
            DB::raw("i.cut_weight as cut_weight"),
            DB::raw("i.cut_length as cut_length"),
            DB::raw("i.cut_width as cut_width"),
            DB::raw("i.std_material_used as std_material_used"),
            DB::raw("i.finished_code as finished_code"),
            DB::raw("i.finished_desc as finished_desc"),
            DB::raw("i.is_deleted as is_deleted"),
            DB::raw("u.firstname as update_user"),
            DB::raw("i.updated_at as updated_at"))
        ->join('users as u','i.update_user','=','u.id')
        ->where('i.is_deleted','=',0)
        ->get());
        return response()->json($items);
    }
}
