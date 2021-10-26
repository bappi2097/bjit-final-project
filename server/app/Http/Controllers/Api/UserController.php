<?php

namespace App\Http\Controllers\Api;

use App\User;
use App\Mail\VerifyEmail;
use App\Jobs\VerifyMailJob;
use Illuminate\Http\Request;
use App\Mail\ForgetPasswordEmail;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use App\Jobs\ForgetPasswordEmailJob;
use Illuminate\Support\Facades\Auth;
use App\Traits\ApiResponseWithHttpStatus;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    use ApiResponseWithHttpStatus;

    public function __construct()
    {
        Auth::shouldUse('users');
    }

    public function login(\App\Http\Requests\LoginFormRequest $request)
    {
        $input = $request->only('email', 'password');
        if (!$token = JWTAuth::attempt($input)) {
            return $this->apiResponse('Invalid credential', null, Response::HTTP_BAD_REQUEST, false);
        }

        if (!auth()->user()->hasVerifiedEmail()) {
            return $this->apiResponse('Please verify your email address before logging in.', null, Response::HTTP_UNAUTHORIZED, false);
        }

        $data = ['access_token' => $token, 'user' => Auth::user()];

        return $this->apiResponse('Welcome to dashboard', $data, Response::HTTP_OK, true);
    }

    public function register(\App\Http\Requests\RegistrationFormRequest $request)
    {
        $user = new User();
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->save();
        $credentials = $request->only('email', 'password');
        $token = JWTAuth::attempt($credentials);
        $encodedAccessToken = base64_encode(\Str::random(30));

        $url = $encodedAccessToken;

        $email = new VerifyEmail($user, $url, $token);

        if (dispatch(new VerifyMailJob($user, $email, $url))) {
            $user->remember_token = $encodedAccessToken;
            $user->save();
        }
        $data = [
            'access_token' => $token,
            'user' => Auth::user()
        ];
        return $this->apiResponse('Registration successfull. Please check email to verify.', $data, Response::HTTP_OK, true);
    }

    public function profile()
    {
        return response()->json(Auth::user());
    }

    public function logout()
    {
        if (Auth::check()) {
            $token = Auth::getToken();
            JWTAuth::setToken($token);
            JWTAuth::invalidate();
            Auth::logout();
            return $this->apiResponse('Logout Success', null, Response::HTTP_OK, true);
        } else {
            return $this->apiResponse('Logout Error', null, Response::HTTP_UNAUTHORIZED, false);
        }
    }

    public function emailVerify(Request $request)
    {
        $user = User::where('remember_token', $request->remember_token)->first();
        $data = [
            'user' => $user
        ];
        if ($user->hasVerifiedEmail()) {
            return $this->apiResponse('Your Email Already Verified', $data, Response::HTTP_OK, true);
        }

        if ($user) {
            $user->markVerified();
            return $this->apiResponse('Email verified Successfully', $data, Response::HTTP_OK, true);
        }
        return $this->apiResponse('Email does not verified', null, Response::HTTP_UNPROCESSABLE_ENTITY, false);
    }

    public function forgetPassword(Request $request)
    {
        $user = User::where('email', $request->email);

        if (!$user->exists()) {
            return $this->apiResponse('Please input valid Email', null, Response::HTTP_UNPROCESSABLE_ENTITY, false);
        }
        $user = $user->first();
        $token = base64_encode($user->email);
        $encodedAccessToken = base64_encode(\Str::random(30));

        $url = $encodedAccessToken;

        $email = new ForgetPasswordEmail($user, $token, $url);

        if (dispatch(new ForgetPasswordEmailJob($user, $email, $url))) {
            $user->remember_token = $encodedAccessToken;
            $user->save();
        }

        return $this->apiResponse('Please check your email', null, Response::HTTP_OK, true);
    }

    public function resetPassword(\App\Http\Requests\ForgetPasswordFormRequest $request, $token)
    {
        $user = User::where('email', base64_decode($token));
        if (!$user->exists()) {
            return $this->apiResponse('Please input valid Email', base64_decode($token), Response::HTTP_UNPROCESSABLE_ENTITY, false);
        }
        $user = $user->first();
        $user->password = bcrypt($request->password);
        $user->save();
        return $this->apiResponse('Password changed successfully', null, Response::HTTP_OK, true);
    }
}
