<?php

namespace App\Http\Controllers\Admin;

use App\Theme;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Traits\ApiResponseWithHttpStatus;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Requests\Theme\AddThemeRequest;
use App\Http\Requests\Theme\UpdateThemeRequest;

class ThemeController extends Controller
{
    use ApiResponseWithHttpStatus;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $themes = Theme::latest()->get();
        return $this->apiResponse("All Theme Fetched", $themes, Response::HTTP_OK, true);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AddThemeRequest $request)
    {
        $theme = new Theme();
        $isAdded = DB::transaction(function () use ($theme, $request) {
            $theme->name = $request->name;
            $theme->design = $request->design;
            return $theme->save();
        });
        if ($isAdded) {
            return $this->apiResponse("Successfully theme added", $theme, Response::HTTP_OK, true);
        }
        return $this->apiResponse("Something went wrong!", null, Response::HTTP_NO_CONTENT, false);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Theme  $theme
     * @return \Illuminate\Http\Response
     */
    public function show(Theme $theme)
    {
        return $this->apiResponse("Successfully theme found", $theme, Response::HTTP_OK, true);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Theme  $theme
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateThemeRequest $request, Theme $theme)
    {
        $isUpdated = DB::transaction(function () use ($theme, $request) {
            $theme->name = $request->name;
            $theme->design = $request->design ?? "";
            return $theme->save();
        });
        if ($isUpdated) {
            return $this->apiResponse("Successfully theme updated", $theme, Response::HTTP_OK, true);
        }

        return $this->apiResponse("Something went wrong!", null, Response::HTTP_BAD_REQUEST, false, "Something went worng!");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Theme  $theme
     * @return \Illuminate\Http\Response
     */
    public function destroy(Theme $theme)
    {
        $isDeleted = DB::transaction(function () use ($theme) {
            return $theme->delete();
        });
        if ($isDeleted) {
            return $this->apiResponse("Successfully theme deleted", null, Response::HTTP_OK, true);
        }
        return $this->apiResponse("Something went wrong!", null, Response::HTTP_BAD_REQUEST, false);
    }
}
