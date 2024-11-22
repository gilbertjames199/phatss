<?php

use App\Http\Controllers\FileHandleController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ImportDataController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\DashBoardController;
use App\Http\Controllers\EducationController;
use App\Http\Controllers\GovernmentController;
use App\Http\Controllers\EconomicController;
use App\Http\Controllers\HealthController;
use App\Http\Controllers\HouseHoldController;
use App\Http\Controllers\InterventionController;
use App\Http\Controllers\MapPlotterController;
use App\Http\Controllers\OtherController;
use App\Http\Controllers\PlaceController;
use App\Http\Controllers\SchoolController;
use App\Http\Controllers\SocialInclusionController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\TimeSheetController;
use Illuminate\Support\Facades\Mail;
use App\Mail\MessageMail;
use Inertia\Inertia;

Auth::routes(['verify' => true]);
/*
Route::get('/email', function(){
    Mail::to('email@email.com')->send(new MessageMail());
    return new MessageMail();
});
*/
Route::middleware('auth')->group(function () {
    Route::prefix('/')->group(function () {
        Route::get('/', [DashBoardController::class, 'index']);
    });
    Route::prefix('/import')->group(function () {
        Route::get('/', [ImportDataController::class, 'importindex']);
        Route::post('/file/data', [ImportDataController::class, 'index']);
        Route::post('/phatts', [ImportDataController::class, 'import_phatts']);
        Route::post('/export/excel/phatts', [ImportDataController::class, 'export_phatts']);
        Route::post('/house/hold/data/import/h', [ImportDataController::class, 'import_household']);
        Route::post('/schools/ddo/data/import/sc/hool', [ImportDataController::class, 'import_schools']);
        Route::post('/child/development/center/data/import/child/care', [ImportDataController::class, 'import_cdc']);
        Route::post('/health/care/center/data/import/health/care/centers/hospitals', [ImportDataController::class, 'import_health']);
    });
    //Route::get('/home', [HomeController::class, 'index'])->name('home');
    Route::prefix('/home')->group(function () {
        Route::get('/', [DashBoardController::class, 'index']);
    });

    //Users
    Route::prefix('/users')->group(function () {
        // ->can('create', 'App\Model\User');
        Route::get('/', [UserController::class, 'index']);
        Route::post('/', [UserController::class, 'store']);
        // ->can('create', 'App\Model\User')
        Route::get('/create', [UserController::class, 'create']);
        Route::get('/{id}/edit', [UserController::class, 'edit']);
        Route::delete('/{id}', [UserController::class, 'destroy']);
        Route::patch('/{id}', [UserController::class, 'update']);
        Route::patch('/update_verified_at', [UserController::class, 'update_verified_at']);
        Route::get('/change-password', [UserController::class, 'changePassword']);
        Route::post('/update-password', [UserController::class, 'updatePassword']);
        Route::get('/settings', [UserController::class, 'settings']);
        Route::post('/change-name', [UserController::class, 'changeName']);
        Route::post('/change-photo', [UserController::class, 'changePhoto']);
        Route::post('user-permissions', [UserController::class, 'userPermissions']);
        Route::get('/update-permissions', [UserController::class, 'updatePermissions']);
        Route::post('/get-barangays', [UserController::class, 'getBarangays']);
        Route::post('/get-puroks', [UserController::class, 'getPuroks']);
    });
    //Charts

    //MAP THEM
    Route::prefix('/map')->group(function () {
        Route::get('/', [MapPlotterController::class, 'index']);
        Route::get('/heat', [MapPlotterController::class, 'heat_map']);
    });
    Route::prefix('/survey')->group(function () {
        Route::get('/', [SurveyController::class, 'index']);
        Route::get('/household', [SurveyController::class, 'create']);
        Route::post('/store', [SurveyController::class, 'store']);
        Route::get('/household/edit/{id}', [SurveyController::class, 'edit']);
        Route::patch('/household/update/{id}', [SurveyController::class, 'update']);
    });
    //Avatar file upload
    Route::post('/files/upload', [FileHandleController::class, 'uploadAvatar']);
    Route::delete('/files/upload/delete', [FileHandleController::class, 'destroyAvatar']);
    //Intervention
    Route::prefix('/intervention')->group(function () {
        Route::get('/', [InterventionController::class, 'index']);
        Route::get('/create', [InterventionController::class, 'create']);
        Route::post('/store', [InterventionController::class, 'store']);
        Route::get('/{id}/edit', [InterventionController::class, 'edit']);
        Route::patch('/update', [InterventionController::class, 'update']);
        Route::delete('/{id}', [InterventionController::class, 'destroy']);
    });
    //Schools
    Route::prefix('/school')->group(function () {
        Route::get('/', [SchoolController::class, 'index']);
        Route::get('/create', [SchoolController::class, 'create']);
        Route::post('/store', [SchoolController::class, 'store']);
        Route::get('/{id}/edit', [SchoolController::class, 'edit']);
        Route::patch('/update', [SchoolController::class, 'update']);
        Route::delete('/{id}', [SchoolController::class, 'destroy']);
    });
    //Reg
    Route::prefix('/reg')->group(function () {
        Route::get('/analyze', [HouseHoldController::class, 'analyze_reg']);
    });
    //HOUSEHOLDS
    Route::prefix('/households')->group(function () {
        Route::get('/', [HouseHoldController::class, 'index']);
        Route::get('/create', [HouseHoldController::class, 'create']);
        Route::post('/store', [HouseHoldController::class, 'store']);
        Route::get('/{id}/edit', [HouseHoldController::class, 'edit']);
        Route::patch('/{id}/update', [HouseHoldController::class, 'update']);
        Route::delete('/{id}', [HouseHoldController::class, 'destroy']);
    });
    //PLACES
    Route::prefix('/places')->group(function () {
        Route::get('/municipalities', [PlaceController::class, 'index']);
        Route::get('/{mun}/barangays', [PlaceController::class, 'bar']);
        Route::get('/barangay/{bar}/purok-sitio', [PlaceController::class, 'pur']);
    });
});
