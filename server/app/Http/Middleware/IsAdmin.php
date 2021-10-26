<?php

namespace App\Http\Middleware;

use Closure;
use App\Traits\ApiResponseWithHttpStatus;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    use ApiResponseWithHttpStatus;
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (auth()->check() && auth()->user()->is_admin) {
            return $next($request);
        }
        return $this->apiResponse('You are not authrized!', null, Response::HTTP_UNPROCESSABLE_ENTITY, false, "Authorization failed");
    }
}
