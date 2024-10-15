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
use App\Http\Controllers\InterventionController;
use App\Http\Controllers\MapPlotterController;
use App\Http\Controllers\OtherController;
use App\Http\Controllers\SocialInclusionController;
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
        Route::post('/file/data', [ImportDataController::class, 'index']);
        Route::post('/phatts', [ImportDataController::class, 'import_phatts']);
        Route::post('/export/excel/phatts', [ImportDataController::class, 'export_phatts']);
    });
    //Route::get('/home', [HomeController::class, 'index'])->name('home');
    Route::prefix('/home')->group(function () {
        Route::get('/', [DashBoardController::class, 'index']);
    });

    //Users
    Route::prefix('/users')->group(function () {
        Route::get('/', [UserController::class, 'index'])->can('create', 'App\Model\User');
        Route::post('/', [UserController::class, 'store']);
        Route::get('/create', [UserController::class, 'create'])->can('create', 'App\Model\User');
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
    //Avatar file upload
    Route::post('/files/upload', [FileHandleController::class, 'uploadAvatar']);
    Route::delete('/files/upload/delete', [FileHandleController::class, 'destroyAvatar']);
    //Intervention
    Route::prefix('/intervention')->group(function () {
        Route::get('/', [InterventionController::class, 'index']);
    });
});
