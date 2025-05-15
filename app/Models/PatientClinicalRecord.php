<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PatientClinicalRecord extends Model
{
    use HasFactory;
    protected $connection = "mysql";
    protected $table = 'patient_clinical_records';
    protected $guarded = ['id'];

    public function patientRecord()
    {
        return $this->belongsTo(PatientClinicalRecord::class, 'patient_id');
    }
}
