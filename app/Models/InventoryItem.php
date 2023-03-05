<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InventoryItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'item_id',
        'warehouse',
        'quantity',
        'length',
        'width',
        'heat_no',
        'lot_no',
        'sc_no',
        'supplier',
        'supplier_heat_no',
        'material_used',
        'is_excess',
        'create_user',
        'update_user'
    ];
}
