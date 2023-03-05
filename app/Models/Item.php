<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    protected $fillable = [
        'item_code',
        'item_desc',
        'item_category',
        'item_type',
        'item',
        'schedule_class',
        'alloy',
        'size',
        'weight',
        'cut_weight',
        'cut_length',
        'cut_width',
        'std_material_used',
        'finished_code',
        'finished_desc',
        'is_deleted',
        'create_user',
        'update_user'
    ];
}
