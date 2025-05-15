<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IssueIntervention extends Model
{
    use HasFactory;
    protected $connection = "mysql";
    protected $table = 'issue_interventions';
    protected $guarded = ['id'];

    public function Intervention()
    {
        return $this->hasOne(Intervention::class, 'id', 'intervention_id');
    }
    public function Issue()
    {
        return $this->hasOne(Issue::class, 'id', 'issue_id');
    }
}
