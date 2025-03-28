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
use App\Http\Controllers\ForecastController;
use App\Http\Controllers\HealthController;
use App\Http\Controllers\HouseHoldController;
use App\Http\Controllers\InterventionController;
use App\Http\Controllers\IssueController;
use App\Http\Controllers\IssueInterventionController;
use App\Http\Controllers\MapPlotterController;
use App\Http\Controllers\OtherController;
use App\Http\Controllers\PlaceController;
use App\Http\Controllers\PythonController;
use App\Http\Controllers\RespondentController;
use App\Http\Controllers\ResponseCenterController;
use App\Http\Controllers\SchoolController;
use App\Http\Controllers\SocialInclusionController;
use App\Http\Controllers\SupplyController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\TimeSheetController;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Http;
use App\Mail\MessageMail;
use App\Models\ResponseCenter;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

// Auth::routes(); ['register' => false, 'verify' => false]
// Route::prefix('traction')->group(function () {
//     Route::get('get', [UserController::class, 'register_user'])->name('user.registration.get');
// });
Route::get('web/register', [UserController::class, 'register_user'])->name('user.registration.get');
Auth::routes(['verify' => false]);
/*
Route::get('/email', function(){
    Mail::to('email@email.com')->send(new MessageMail());
    return new MessageMail();
});
*/

Route::middleware(['auth'])->group(function () {
    Route::prefix('/')->group(function () {
        Route::get('/', [DashBoardController::class, 'index']);
        Route::get('/dashboard', [DashBoardController::class, 'index']);
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
    //Forecasts
    Route::prefix('/forecasts')->group(function () {
        Route::get('/', [ForecastController::class, 'index']);
        // Route::get('/heat', [MapPlotterController::class, 'heat_map']);
        // Route::get('/route/optimize', [MapPlotterController::class, 'route_optimize']);
    });
    // Risk level by munixipality/barangay
    Route::prefix('/sanitation-assessment')->group(function () {
        Route::get('/', [ForecastController::class, 'sanitation_level']);
        Route::get('/{mun}', [ForecastController::class, 'getBarangays']);
        Route::get('/{type}/{location}', [ForecastController::class, 'getHouseholds']);
    });
    //Respondents
    Route::prefix('/respondents')->group(function () {
        Route::get('/', [RespondentController::class, 'index']);
        // Route::get('/heat', [MapPlotterController::class, 'heat_map']);
        // Route::get('/route/optimize', [MapPlotterController::class, 'route_optimize']);
    });
    //MAP THEM
    Route::prefix('/map')->group(function () {
        Route::get('/', [MapPlotterController::class, 'index']);
        Route::get('/heat', [MapPlotterController::class, 'heat_map']);
        Route::get('/route/optimize', [MapPlotterController::class, 'route_optimize']);
        Route::get('/k/means/training', [MapPlotterController::class, 'kmeans']);
    });


    Route::prefix('/issue')->group(function () {
        Route::get('/', [IssueController::class, 'index']);
        Route::get('/view/{id}', [IssueController::class, 'view']);
        Route::get('/{id}/lfdsf/23/4afoaip/edit', [IssueController::class, 'edit']);
        Route::get('/report', [IssueController::class, 'report']);
        Route::post('/store', [IssueController::class, 'store']);
        Route::patch('/update', [IssueController::class, 'update']);
        Route::delete('/{id}', [IssueController::class, 'destroy']);
    });
    Route::prefix('/issue-intervention')->group(function () {
        Route::get('/', [IssueInterventionController::class, 'index']);
        Route::get('/view/{id}', [IssueInterventionController::class, 'view']);
        Route::get('/{id}/mgdsg/23/4agobip/edit', [IssueInterventionController::class, 'edit']);
        Route::get('/create/{issue_id}/123jk423', [IssueInterventionController::class, 'create']);
        Route::post('/store', [IssueInterventionController::class, 'store']);
        Route::patch('/update', [IssueInterventionController::class, 'update']);
        Route::delete('/{id}', [IssueInterventionController::class, 'destroy']);
    });
    Route::get('/location-search', function () {
        $query = request('q');
        $response = Http::get("https://nominatim.openstreetmap.org/search?format=json&q={$query}");
        return $response->json();
    });

    //ResponseCenters
    Route::prefix('/response-center')->group(function () {
        Route::get('/', [ResponseCenterController::class, 'index']);
    });
    Route::prefix('/survey')->group(function () {
        Route::get('/', [SurveyController::class, 'index']);
        Route::get('/household', [SurveyController::class, 'create']);
        Route::post('/store', [SurveyController::class, 'store']);
        Route::get('/household/edit/{id}', [SurveyController::class, 'edit']);
        Route::patch('/household/update/{id}', [SurveyController::class, 'update']);
    });
    // SUPPLIES
    Route::prefix('/supplies')->group(function () {
        Route::get('/', [SupplyController::class, 'index']);
        Route::get('/create', [SupplyController::class, 'create']);
        Route::post('/store', [SupplyController::class, 'store']);
        Route::get('/edit/{id}', [SupplyController::class, 'edit']);
        Route::patch('/update/{id}', [SupplyController::class, 'update']);
        Route::delete('/{id}', [SupplyController::class, 'destroy']);
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
    //Videos
    Route::prefix('/videos')->group(function () {
        Route::get('/', [DashBoardController::class, 'videos']);
    });
    //HOUSEHOLDS
    Route::prefix('/households')->group(function () {
        Route::get('/', [HouseHoldController::class, 'index']);
        Route::get('/create', [HouseHoldController::class, 'create']);
        Route::post('/store', [HouseHoldController::class, 'store']);
        Route::get('/{id}/edit', [HouseHoldController::class, 'edit']);
        Route::patch('/{id}/update', [HouseHoldController::class, 'update']);
        Route::post('/generate/historical/data', [HouseHoldController::class, 'historical']);
        Route::delete('/{id}', [HouseHoldController::class, 'destroy']);
    });
    //PLACES
    Route::prefix('/places')->group(function () {
        Route::get('/municipalities', [PlaceController::class, 'index']);
        Route::get('/{mun}/barangays', [PlaceController::class, 'bar']);
        Route::get('/barangay/{bar}/purok-sitio', [PlaceController::class, 'pur']);
    });
    //PYTHON
    Route::prefix('python')->group(function () {
        Route::get('get', [PythonController::class, 'all_households']);
    });
    //
});
