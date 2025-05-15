<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WaterRefilling extends Model
{
    use HasFactory;
    protected $connection = "mysql";
    protected $table = 'water_refilling';
    protected $guarded = ['id'];
}
