<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class DashBoardController extends Controller 
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    //$totalAll = $this->totalAll();

    
    
    public function index()
    {
        //dd('create: '.auth()->user()->can('create',User::class).'edit: '.auth()->user()->can('edit',User::class).'delete: '.auth()->user()->can('delete',User::class));
        
        return inertia('Home', [
            "can" => [
                'createUser' => Auth::user()->can('create', User::class),
                'editUser' =>Auth::user()->can('edit', User::class),
                'deleteUser' =>Auth::user()->can('delete', User::class),
                'canViewUsers' =>Auth::user()->can('can_view_users', User::class),
                'canInsertUsers' =>Auth::user()->can('can_insert_users', User::class),
                'canEditUsers' =>Auth::user()->can('can_edit_users', User::class),
                'canDeleteUsers' =>Auth::user()->can('can_delete_users', User::class),
                'canUpdateUserPermissions' =>Auth::user()->can('can_update_user_permissions', User::class),
            ],
        ]);
    }
    
    
}
