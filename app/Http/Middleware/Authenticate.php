<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */

    // public function handle($request, \Closure $next, ...$guards)
    // {
    //     // Skip authentication for the specified route
    //     if ($request->getPathInfo() === '/user/registration/get') {
    //         return $next($request); // Allow access without authentication
    //     }

    //     // Otherwise, apply default authentication behavior
    //     return parent::handle($request, $next, ...$guards);
    // }

    protected function redirectTo($request)
    {
        // dd($request->pathInfo);
        // dd($request->getPathInfo());
        // if ($request->getPathInfo() == '/user/registration/get') {
        //     // return redirect('user/registration/get');
        //     return null;
        // } else
        if (! $request->expectsJson()) {
            return route('login');
        }
    }
}
