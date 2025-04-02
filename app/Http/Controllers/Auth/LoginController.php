<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\TransactionLog;
use App\Providers\RouteServiceProvider;
use Exception;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{

    /*
        |--------------------------------------------------------------------------
        | Login Controller
        |--------------------------------------------------------------------------
        |
        | This controller handles authenticating users for the application and
        | redirecting them to your home screen. The controller uses a trait
        | to conveniently provide its functionality to your applications.
        |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // dd('user');
        $this->middleware('guest')->except(['logout', 'web/register']);
    }

    public function login(Request $request)
    {
        // Validate the input fields
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Retrieve the user by email
        $user = \App\Models\User::where('email', $request->email)->first();

        if ($user) {
            // Retrieve the pepper from the configuration
            $pepper = config('app.pepper');

            // Combine the password with the pepper
            $pepperedPassword = $request->password . $pepper;

            // Check if the hashed password matches
            if (Hash::check($pepperedPassword, $user->password)) {
                // Login the user
                Auth::login($user);
                $host = "";
                $add = "";
                try {
                    $host = $request->header('User-Agent');
                    $add = $request->ip();
                } catch (Exception $ex) {
                }
                TransactionLog::create([
                    'user_id' => $user->id,
                    'type' => 'login',
                    'action' => 'login',
                    'address' => $host,
                    'host' => $add,
                ]);
                return redirect()->intended('dashboard'); // Replace 'dashboard' with your intended route
            }
        }

        // If authentication fails
        return back()->withErrors([
            'email' => __('The provided credentials do not match our records.'),
        ]);
    }
}
