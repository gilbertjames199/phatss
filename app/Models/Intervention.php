<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Intervention extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function type_tags()
    {
        return $this->hasMany(InterventionTypeTag::class, 'intervention_id', 'id');
    }
}
