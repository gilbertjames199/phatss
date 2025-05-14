<?php

namespace App\Http\Middleware;

use App\Models\Issue;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        if (auth()->check()) {
            $profile =  User::where('id', auth()->user()->id)->first()->getFirstMedia('avatars');
            $notifs = Issue::where('hospital', '<>', NULL)->where('number_of_patients', NULL)->count();
            return array_merge(parent::share($request), [
                'auth' => auth()->user() ? [ //if there is a user
                    'user' => [
                        'username' => ucfirst(auth()->user()->name),
                        'level' => auth()->user()->level,
                        'municipality' => auth()->user()->municipality,
                        'barangay' => auth()->user()->barangay,
                        'photo' => $profile ? $profile->getUrl() : '',

                    ]

                ] : null,
                'notifs' => $notifs,
                'flash' => [
                    'message' => fn() => $request->session()->get('message'),
                    'error' => fn() => $request->session()->get('error'),
                ],
            ]);
        }

        return [];
    }
}
