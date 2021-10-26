<?php

namespace App\Http\Controllers\Admin;

use App\Section;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Traits\ApiResponseWithHttpStatus;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Requests\Section\AddSectionRequest;
use App\Http\Requests\Section\UpdateSectionRequest;

class SectionController extends Controller
{
    use ApiResponseWithHttpStatus;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $sections = Section::with("websiteType")->latest()->get();
        return $this->apiResponse("All Section Fetched", $sections, Response::HTTP_OK, true);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AddSectionRequest $request)
    {
        $section = new Section();
        $isAdded = DB::transaction(function () use ($section, $request) {
            $section->name = $request->name;
            $section->component_name = $request->component_name;
            $section->website_type_id = $request->website_type_id;
            $section->setting = $request->setting;
            $section->contents = $request->contents;
            $section->design = $request->design;
            return $section->save();
        });

        if ($isAdded) {
            return $this->apiResponse("Successfully Section added", $section, Response::HTTP_OK, true);
        }
        return $this->apiResponse("Something went wrong!", null, Response::HTTP_NO_CONTENT, false);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Section  $section
     * @return \Illuminate\Http\Response
     */
    public function show(Section $section)
    {
        $section->loadMissing("websiteType");
        return $this->apiResponse("Successfully Section found", $section, Response::HTTP_OK, true);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Section  $section
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSectionRequest $request, Section $section)
    {
        $isUpdated = DB::transaction(function () use ($section, $request) {
            $section->name = $request->name;
            $section->component_name = $request->component_name;
            $section->setting = $request->setting;
            $section->contents = $request->contents;
            $section->design = $request->design;
            return $section->save();
        });

        if ($isUpdated) {
            return $this->apiResponse("Successfully Section updated", $section, Response::HTTP_OK, true);
        }

        return $this->apiResponse("Something went wrong!", null, Response::HTTP_BAD_REQUEST, false, "Something went worng!");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Section  $section
     * @return \Illuminate\Http\Response
     */
    public function destroy(Section $section)
    {
        $isDeleted = DB::transaction(function () use ($section) {
            return $section->delete();
        });

        if ($isDeleted) {
            return $this->apiResponse("Successfully Section deleted", null, Response::HTTP_OK, true);
        }

        return $this->apiResponse("Something went wrong!", null, Response::HTTP_BAD_REQUEST, false);
    }
}
