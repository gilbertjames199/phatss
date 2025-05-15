<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PatientRecord extends Model
{
    use HasFactory;
    protected $connection = "mysql";
    protected $table = 'patient_records';
    protected $guarded = [];

    public function patientClinicalRecord()
    {
        return $this->hasMany(PatientClinicalRecord::class, 'patient_id', 'id');
    }
}
