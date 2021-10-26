<?php

namespace App\Http\Controllers\Admin;

use App\User;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Traits\ApiResponseWithHttpStatus;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Requests\User\AddUserRequest;
use App\Http\Requests\User\UpdateUserRequest;

class UserController extends Controller
{
    use ApiResponseWithHttpStatus;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::get();
        return $this->apiResponse("All User Fetched", $users, Response::HTTP_OK, true);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AddUserRequest $request)
    {
        $user = new User();
        $isAdded = DB::transaction(function () use ($user, $request) {
            $user->first_name = $request->first_name;
            $user->last_name = $request->last_name;
            $user->email = $request->email;
            $user->password = "";
            $user->email_verified_at = now();
            if ($request->hasFile('image')) {
                $user->image = Storage::disk("public")->put('user', $request->file('image'));
            }
            return $user->save();
        });
        if ($isAdded) {
            return $this->apiResponse("Successfully user added", $user, Response::HTTP_OK, true);
        }
        return $this->apiResponse("Something went wrong!", null, Response::HTTP_NO_CONTENT, false);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return $this->apiResponse("Successfully user found", $user, Response::HTTP_OK, true);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $isUpdated = DB::transaction(function () use ($user, $request) {
            $user->first_name = $request->first_name;
            $user->last_name = $request->last_name;
            $user->email = $request->email;
            if ($request->hasFile('image')) {
                if (Storage::disk("public")->exists($user->image)) {
                    Storage::disk("public")->delete($user->image);
                }
                $user->image = Storage::disk("public")->put('user', $request->file('image'));
            }
            return $user->save();
        });
        if ($isUpdated) {
            return $this->apiResponse("Successfully user updated", $user, Response::HTTP_OK, true);
        }

        return $this->apiResponse("Something went wrong!", null, Response::HTTP_BAD_REQUEST, false, "Something went worng!");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        if (Storage::disk("public")->exists($user->image)) {
            Storage::disk("public")->delete($user->image);
        }
        $isDeleted = DB::transaction(function () use ($user) {
            return $user->delete();
        });
        if ($isDeleted) {
            return $this->apiResponse("Successfully user deleted", null, Response::HTTP_OK, true);
        }
        return $this->apiResponse("Something went wrong!", null, Response::HTTP_BAD_REQUEST, false);
    }
}
