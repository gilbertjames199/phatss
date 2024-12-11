<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InterventionTypeTag extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function types()
    {
        return $this->hasMany(InterventionType::class, 'id', 'intervention_type_id');
    }
}
