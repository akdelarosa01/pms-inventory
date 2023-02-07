<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Throwable;

class ItemController extends Controller
{
    public function index()
    {
        return $this->items();
    }


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

    public function show($id)
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
        ->where('i.id',$id)
        ->first());
        return response()->json($items);
    }

    public function store(Request $request)
    {

    }

    public function update(Request $request, $id)
    {
        try {
            $item = Item::find($id);

            DB::beginTransaction();

            switch ($request->item_category) {
                case "RAW MATERIAL":
                    $item->id = $request->id;
                    $item->item_type = $request->item_type;
                    $item->item_code = $request->item_code;
                    $item->item_desc = $request->item_desc;
                    $item->item = $request->item;
                    $item->schedule_class = $request->schedule_class;
                    $item->alloy = $request->alloy;
                    $item->size = $request->size;
                    $item->weight = $request->weight;
                    break;
                case "FINISHED GOODS":
                    $item->id = $request->id;
                    $item->item_type = $request->item_type;
                    $item->item_code = $request->item_code;
                    $item->item_desc = $request->item_desc;
                    $item->item = $request->item;
                    $item->schedule_class = $request->schedule_class;
                    $item->alloy = $request->alloy;
                    $item->size = $request->size;
                    $item->weight = $request->weight;
                    $item->cut_weight = $request->cut_weight;
                    $item->cut_length = $request->cut_length;
                    $item->cut_width = $request->cut_width;
                    $item->std_material_used = $request->std_material_used;
                    break;
                default:
                    $item->id = $request->id;
                    $item->item_type = $request->item_type;
                    $item->item_code = $request->item_code;
                    $item->item_desc = $request->item_desc;
                    $item->item = $request->item;
                    $item->schedule_class = $request->schedule_class;
                    $item->alloy = $request->alloy;
                    $item->size = $request->size;
                    $item->weight = $request->weight;
                    $item->cut_weight = $request->cut_weight;
                    $item->cut_length = $request->cut_length;
                    $item->cut_width = $request->cut_width;
                    $item->std_material_used = $request->std_material_used;
                    $item->finished_code = $request->finished_code;
                    $item->finished_desc = $request->finished_desc;
                    break;
            }

            $item->update_user = Auth::user()->id;

            if ($item->update()) {
                DB::commit();
                return response([
                            'message' => "Item details was successfully saved.",
                            'status' => "success"
                        ]);
            }
        } catch (Throwable $th) {
            DB::rollBack();
            return response([
                        'message' => $th->getMessage(),
                        'status' => "error"
                    ]);
        }

        return response([
            'message' => "Saving Item details was unsuccessful.",
            'status' => "warning"
        ]);
    }

    public function destroy($id)
    {
        try {
            $item = Item::find($id);

            DB::beginTransaction();

            $item->is_deleted = 1;
            $item->update_user = Auth::user()->id;

            if ($item->update()) {
                DB::commit();
                return response([
                            'message' => "Item details was successfully deleted.",
                            'status' => "success"
                        ]);
            }
        } catch (Throwable $th) {
            DB::rollBack();
            return response([
                        'message' => $th->getMessage(),
                        'status' => "error"
                    ]);
        }

        return response([
            'message' => "Deleting Item details was unsuccessful.",
            'status' => "warning"
        ]);
    }

    // public function save_item(Request $request)
    // {
    //     try {
    //         DB::beginTransaction();

    //         $item = new Item();

    //         switch ($request->item_category) {
    //             case "RAW MATERIAL":
    //                 $item->item_category = $request->item_category;
    //                 $item->item_type = $request->item_type;
    //                 $item->item_code = $request->item_code;
    //                 $item->item_desc = $request->item_desc;
    //                 $item->item = $request->item;
    //                 $item->schedule_class = $request->schedule_class;
    //                 $item->alloy = $request->alloy;
    //                 $item->size = $request->size;
    //                 $item->weight = $request->weight;
                    
    //                 break;
    //             case "CRUDE":
    //                 $item->item_category = $request->item_category;
    //                 $item->item_type = $request->item_type;
    //                 $item->item_code = $request->item_code;
    //                 $item->item_desc = $request->item_desc;
    //                 $item->item = $request->item;
    //                 $item->schedule_class = $request->schedule_class;
    //                 $item->alloy = $request->alloy;
    //                 $item->size = $request->size;
    //                 $item->weight = $request->weight;
    //                 $item->cut_weight = $request->cut_weight;
    //                 $item->cut_length = $request->cut_length;
    //                 $item->cut_width = $request->cut_width;
    //                 $item->std_material_used = $request->std_material_used;
    //                 $item->finished_code = $request->finished_code;
    //                 $item->finished_desc = $request->finished_desc;
    //                 break;
    //             default:
    //                 $item->item_category = $request->item_category;
    //                 $item->item_type = $request->item_type;
    //                 $item->item_code = $request->item_code;
    //                 $item->item_desc = $request->item_desc;
    //                 $item->item = $request->item;
    //                 $item->schedule_class = $request->schedule_class;
    //                 $item->alloy = $request->alloy;
    //                 $item->size = $request->size;
    //                 $item->weight = $request->weight;
    //                 $item->cut_weight = $request->cut_weight;
    //                 $item->cut_length = $request->cut_length;
    //                 $item->cut_width = $request->cut_width;
    //                 $item->std_material_used = $request->std_material_used;
    //                 break;
    //         }

    //         $item->create_user = 1;
    //         $item->update_user = 1;
            
    //         if ($item->save()) {
    //             DB::commit();
    //             return response([
    //                 'message' => "Item details was successfully saved.",
    //                 'status' => "success"
    //             ]);
    //         }
    //     } catch (Throwable $th) {
    //         DB::rollBack();
    //         return response([
    //             'message' => $th->getMessage(),
    //             'status' => "error"
    //         ]);
    //     }
    // }
}
