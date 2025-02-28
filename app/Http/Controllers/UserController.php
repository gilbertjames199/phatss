<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Permission;
use App\Models\TemporaryFile;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function __construct(User $model)
    {
        $this->middleware(['auth', 'verified']);
        $this->model = $model;
    }

    public function index(Request $request)
    {
        // dd("user");
        // $user_data;
        // if (Auth::user()->can('create', User::class)) {
        $user_data = $this->model->when($request->search, function ($query, $searchItem) {
            $query->where('name', 'like', '%' . $searchItem . '%');
        })
            ->orderBy('created_at', 'desc')
            ->simplePaginate(10)
            ->withQueryString()
            ->through(fn($user) => [
                'id' => $user->id,
                'name' => $user->name,
                "can" => [
                    'edit' => auth()->user()->can('edit', $user),
                    'delete' => auth()->user()->can('delete', $user),
                    'canViewUsers' => auth()->user()->can('can_view_users', $user),
                    'canInsertUsers' => auth()->user()->can('can_insert_users', $user),
                    'canEditUsers' => auth()->user()->can('can_edit_users', $user),
                    'canDeleteUsers' => auth()->user()->can('can_delete_users', $user),
                    'canUpdateUserPermissions' => auth()->user()->can('can_update_user_permissions', $user),
                ],
            ]);

        return inertia('Users/Index', [
            //returns an array of users with name field only
            // "permissions_all" => Permission::all(),
            "users" => $user_data,
            "filters" => $request->only(['search']),
            // "can" => [
            //     'createUser' => Auth::user()->can('create', User::class),
            //     'editUser' => Auth::user()->can('edit', User::class),
            //     'deleteUser' => Auth::user()->can('delete', User::class),
            //     'canViewUsers' => Auth::user()->can('can_view_users', User::class),
            //     'canInsertUsers' => Auth::user()->can('can_insert_users', User::class),
            //     'canEditUsers' => Auth::user()->can('can_edit_users', User::class),
            //     'canDeleteUsers' => Auth::user()->can('can_delete_users', User::class),
            //     'canUpdateUserPermissions' => Auth::user()->can('can_update_user_permissions', User::class),
            // ],
        ]);
        // } else {
        //     return inertia('Forbidden/Index', [
        //         "can" => [
        //             'createUser' => Auth::user()->can('create', User::class),
        //             'editUser' => Auth::user()->can('edit', User::class),
        //             'deleteUser' => Auth::user()->can('delete', User::class),
        //         ],
        //     ]);
        // }
    }

    //********************************** */
    public function userPermissions(Request $request)
    {
        //dd($request->id);
        $user_permissions = [];
        $user = User::find($request->id);
        //$user = User::find(2);
        //dd($user);
        //$user = $this->model->findOrFail($request->id);
        foreach ($user->permissions as $permission) {
            /*if($permission->pivot->permission_id==="3"){
                $found=true;
            }*/
            array_push($user_permissions, $permission->pivot->permission_id);
        }
        return $user_permissions;
    }

    public function allPermissions(Request $request)
    {
        return Permission::all();
    }


    public function create()
    {

        // $permissions = DB::table('permissions')->get();
        $barangay = DB::table('barangays')
            ->select(DB::raw('(barangays.barangay)'), 'municipalities.municipality')
            ->join('municipalities', 'barangays.muni_filter', "municipalities.code")
            ->get();
        // $municipalities = DB::table('y01_personal_infos')
        //     ->distinct()
        //     ->select(DB::raw('(y01_personal_infos.municipality)'))
        //     ->get();
        // dd($barangay);
        return inertia('Users/Create', [
            // "permissions" => $permissions,
            "barangays" => $barangay,
            // "municipalities" => $municipalities,
            "can" => [
                'createUser' => Auth::user()->can('create', User::class),
                'editUser' => Auth::user()->can('edit', User::class),
                'deleteUser' => Auth::user()->can('delete', User::class),
            ],
        ]);
    }


    public function store(Request $request)
    {
        // dd($request);

        // Define the pepper (retrieved securely from environment/config)
        $pepper = config('app.pepper'); // Ensure 'app.pepper' is set in your config or .env

        // Combine the password with the pepper
        $pepperedPassword = $request->password . $pepper;

        // Hash the password with salt and pepper
        $hashedPassword = Hash::make($pepperedPassword);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $hashedPassword,
            'level' => $request->level,
            'barangay' => $request->barangay,
            'municipality' => $request->municipality
        ]);


        // dd($hashedPassword);
        return redirect('/users')->with('message', 'User created');
    }



    public function edit(Request $request, $id)
    {

        // $permissions = DB::table('permissions')->get();
        $data = $this->model->where('id', $id)->first([
            'name',
            'id',
            'email',
            'level',
            'municipality',
            'barangay'
        ]);

        return inertia('Users/Create', [
            "editData" => $data,
            // "permissions" => $permissions,
            "can" => [
                'createUser' => Auth::user()->can('create', User::class),
                'editUser' => Auth::user()->can('edit', User::class),
                'deleteUser' => Auth::user()->can('delete', User::class),
            ],
        ]);
    }

    public function update(Request $request)
    {
        $data = $this->model->findOrFail($request->id);
        $data->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);
        return redirect('/users')->with('message', 'Successfully updated data of ' . $request->name . '!');
    }

    public function destroy(Request $request)
    {
        $data = $this->model->findOrFail($request->id);
        $data->delete();

        return redirect('/users')->with('message', 'User deleted');
    }

    public function changePassword()
    {
        //return inertia("Users/ChangePassword");
        return inertia('Users/ChangePassword', [
            "can" => [
                'createUser' => Auth::user()->can('create', User::class),
                'editUser' => Auth::user()->can('edit', User::class),
                'deleteUser' => Auth::user()->can('delete', User::class),
            ],
        ]);
    }

    public function updatePassword(Request $request)
    {
        $old = $request->old;
        $new = $request->new;
        $confirm = $request->confirm;

        if (!Hash::check($old, auth()->user()->password)) {
            return back()->with('error', 'Wrong Credentials');
        }

        if ($new !== $confirm) {
            return back()->with('error', 'Not the same');
        }

        $user = $this->model->findOrFail(auth()->user()->id);
        $user->password = bcrypt($new);
        $user->save();

        return back()->with('message', 'Password Updated');
    }

    public function settings()
    {
        //return inertia('Users/Settings');
        return inertia('Users/Settings', [
            "can" => [
                'createUser' => Auth::user()->can('create', User::class),
                'editUser' => Auth::user()->can('edit', User::class),
                'deleteUser' => Auth::user()->can('delete', User::class),
            ],
        ]);
    }

    public function changeName(Request $request)
    {
        $data = $this->model->findOrFail(auth()->user()->id);
        $data->update([
            'name' => $request->name,
        ]);
        return redirect('/users/settings')->with('message', 'User updated');
        /*return inertia('Users/Settings', [
            "can" => [
                'createUser' => Auth::user()->can('create', User::class),
                'editUser' =>Auth::user()->can('edit', User::class),
                'deleteUser' =>Auth::user()->can('delete', User::class),
            ],
        ])->with('message', 'User updated');*/
    }

    public function changePhoto(Request $request)
    {
        $data = $this->model->findOrFail(auth()->user()->id);

        $temporaryFile = TemporaryFile::where('folder', $request->folder)->first();

        if ($temporaryFile) {
            $data->addMedia(storage_path('app/avatars/tmp/' . $request->folder . '/' . $temporaryFile->filename))
                ->toMediaCollection('avatars');

            rmdir(storage_path('app/avatars/tmp/' . $request->folder));
            $temporaryFile->delete();
        }

        return redirect('/users/settings')->with('message', 'User updated');
    }

    public function updatePermissions(Request $request)
    {
        //retrieving all user permission
        $user_permissions = [];
        $user = User::find($request->my_id);
        $id = $request->my_id;
        $myArrLength = 0;
        $permissionsLength = 0;
        foreach ($user->permissions as $permission) {
            array_push($user_permissions, $permission->pivot->permission_id);
        }
        //newly updated permissions
        /*
            1.)  Find my_arr in permission_user table
            2.)  If not found, insert my_arr
            3.)  Find user_permissions in my_arr
            4.)  If not found, delete
        */

        $my_arr = $request->value;

        //dd($my_arr,$newArr,$user_permissions);
        //dd(array_diff($newArr));
        if ($my_arr) {
            $newArr = array_diff($user_permissions, $my_arr);

            if ($newArr) {
                foreach ($newArr as $newAr) {
                    DB::table('permission_user')
                        ->where([['permission_id', $newAr], ['user_id', $id]])
                        ->delete();
                }
            }
            $found = false;
            $myArrLength = count($my_arr);
            foreach ($my_arr as $my_ar) {
                $found = $this->findNewPermissions($id, $my_ar);
                if ($found) {
                } else {
                    DB::table('permission_user')->insert(['permission_id' => $my_ar, 'user_id' => $id]);
                }
                foreach ($user_permissions as $user_permission) {
                }
            }
        } else {
            DB::table('permission_user')
                ->where('user_id', '=', $id)
                ->delete();
        }
        if ($user_permissions) {
            $permissionsLength = count($user_permissions);
        } else {
        }
        return redirect('/users')->with('message', 'Permissions updated');
        //dd($my_arr);
    }

    public function findNewPermissions($u_id, $p_id)
    {
        $found = [];
        $found = DB::table('permission_user')
            ->select('permission_id')
            ->where([['permission_id', $p_id], ['user_id', $u_id]])
            ->get();
        if (count($found) != 0) {
            return true;
        } else {
            return false;
        }
    }

    public function update_verified_at()
    {
        $my_id = Auth::user()->id;
        dd($my_id);
        if ($my_id == 1) {
        } else {
            $data = $this->model->findOrFail($my_id);
            $data->update([
                'email_verified_at' => NULL,
            ]);
        }
    }

    public function getBarangays(Request $request)
    {
        $mun_where = $request->mun;
        //dd($mun_where);
        $data = DB::table('y01_personal_infos')
            ->distinct()
            ->select(DB::raw('(y01_personal_infos.barangay)'))
            ->where('y01_personal_infos.municipality', 'LIKE', '%' . $mun_where . '%')
            ->orderBy('y01_personal_infos.barangay', 'ASC')
            ->get();
        return ['data' => $data];
    }

    public function getPuroks(Request $request)
    {
        $data = DB::table('y01_personal_infos')
            ->distinct()
            ->select(DB::raw('(y01_personal_infos.purok_sitio)'))
            ->where([['y01_personal_infos.barangay', 'LIKE', '%' . $request->bar . '%'], ['y01_personal_infos.municipality', 'LIKE', '%' . $request->mun . '%']])
            ->orderBy('y01_personal_infos.purok_sitio', 'ASC')
            ->get();
        return ['data' => $data];
    }

    public function getPersonnel(Request $request)
    {
        $personnel = json_decode(file_get_contents(storage_path() . "/personnel.json"), true);
        return $personnel;
    }

    public function register_user(Request $reuqest)
    {
        dd('register_user');
    }
}
