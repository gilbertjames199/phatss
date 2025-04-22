<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WaterLevel3 extends Model
{
    use HasFactory;
    protected $connection = "mysql";
    protected $table = 'water_level_3';
    protected $guarded = ['id'];
}
