<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WaterLevel2 extends Model
{
    use HasFactory;
    protected $connection = "mysql";
    protected $table = 'water_level_2';
    protected $guarded = ['id'];
}
