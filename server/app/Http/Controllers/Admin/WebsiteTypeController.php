<?php

namespace App\Http\Controllers\Admin;

use App\WebsiteType;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Traits\ApiResponseWithHttpStatus;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Requests\WebsiteType\AddWebsiteTypeRequest;
use App\Http\Requests\WebsiteType\UpdateWebsiteTypeRequest;

class WebsiteTypeController extends Controller
{
    use ApiResponseWithHttpStatus;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $websiteTypes = WebsiteType::latest()->get();
        return $this->apiResponse("All Website Type Fetched", $websiteTypes, Response::HTTP_OK, true);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AddWebsiteTypeRequest $request)
    {
        $websiteType = new WebsiteType();
        $isAdded = DB::transaction(function () use ($websiteType, $request) {
            $websiteType->name = $request->name;
            if ($request->hasFile('image')) {
                $websiteType->image = Storage::disk("public")->put('website-type', $request->file('image'));
            }
            $websiteType->contents = $request->contents ?? "";
            return $websiteType->save();
        });
        if ($isAdded) {
            return $this->apiResponse("Successfully website type added", $websiteType, Response::HTTP_OK, true);
        }
        return $this->apiResponse("Something went wrong!", null, Response::HTTP_NO_CONTENT, false);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\WebsiteType  $websiteType
     * @return \Illuminate\Http\Response
     */
    public function show(WebsiteType $websiteType)
    {
        return $this->apiResponse("Successfully website type found", $websiteType, Response::HTTP_OK, true);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\WebsiteType  $websiteType
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateWebsiteTypeRequest $request, WebsiteType $websiteType)
    {
        $isUpdated = DB::transaction(function () use ($websiteType, $request) {
            $websiteType->name = $request->name;
            $websiteType->slug = $request->slug;
            if ($request->hasFile('image')) {
                if (Storage::disk("public")->exists($websiteType->image)) {
                    Storage::disk("public")->delete($websiteType->image);
                }
                $websiteType->image = Storage::disk("public")->put('website-type', $request->file('image'));
            }

            $websiteType->contents = $request->contents ?? "";
            return $websiteType->save();
        });
        if ($isUpdated) {
            return $this->apiResponse("Successfully website type updated", $websiteType, Response::HTTP_OK, true);
        }

        return $this->apiResponse("Something went wrong!", null, Response::HTTP_BAD_REQUEST, false, "Something went worng!");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\WebsiteType  $websiteType
     * @return \Illuminate\Http\Response
     */
    public function destroy(WebsiteType $websiteType)
    {
        if (Storage::disk("public")->exists($websiteType->image)) {
            Storage::disk("public")->delete($websiteType->image);
        }
        $isDeleted = DB::transaction(function () use ($websiteType) {
            return $websiteType->delete();
        });
        if ($isDeleted) {
            return $this->apiResponse("Successfully website type deleted", null, Response::HTTP_OK, true);
        }
        return $this->apiResponse("Something went wrong!", null, Response::HTTP_BAD_REQUEST, false);
    }
}
