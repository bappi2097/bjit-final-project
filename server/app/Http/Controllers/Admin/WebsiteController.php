<?php

namespace App\Http\Controllers\Admin;

use App\Website;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Traits\ApiResponseWithHttpStatus;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Requests\Website\AddWebsiteRequest;
use App\Http\Requests\Website\UpdateWebsiteRequest;

class WebsiteController extends Controller
{
    use ApiResponseWithHttpStatus;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $websites = Website::latest()->get();
        return $this->apiResponse("All Website Fetched", $websites, Response::HTTP_OK, true);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AddWebsiteRequest $request)
    {
        $website = new Website();
        $isAdded = DB::transaction(function () use ($website, $request) {
            $website->name = $request->name;
            $website->slug = $request->slug;
            $website->user_id = auth()->user()->id;
            $website->website_type_id = $request->website_type_id;
            $website->theme_id = $request->theme_id;
            $website->navbar_id = $request->navbar_id;
            $website->design = $request->design;
            if ($request->hasFile('logo')) {
                $website->logo = Storage::disk("public")->put('website', $request->file('logo'));
            }
            $website->contents = $request->contents ?? "";
            return $website->save();
        });
        if ($isAdded) {
            return $this->apiResponse("Successfully website added", $website, Response::HTTP_OK, true);
        }
        return $this->apiResponse("Something went wrong!", null, Response::HTTP_NO_CONTENT, false);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Website  $website
     * @return \Illuminate\Http\Response
     */
    public function show(Website $website)
    {
        return $this->apiResponse("Successfully website found", $website, Response::HTTP_OK, true);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Website  $website
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateWebsiteRequest $request, Website $website)
    {
        $isUpdated = DB::transaction(function () use ($website, $request) {
            $website->name = $request->name;
            $website->user_id = auth()->user()->id;
            $website->website_type_id = $request->website_type_id;
            $website->theme_id = $request->theme_id;
            $website->navbar_id = $request->navbar_id;
            $website->design = $request->design;
            if ($request->hasFile('logo')) {
                if (Storage::disk("public")->exists($website->logo)) {
                    Storage::disk("public")->delete($website->logo);
                }
                $website->logo = Storage::disk("public")->put('website', $request->file('logo'));
            }

            $website->contents = $request->contents ?? "";
            return $website->save();
        });
        if ($isUpdated) {
            return $this->apiResponse("Successfully website updated", $website, Response::HTTP_OK, true);
        }

        return $this->apiResponse("Something went wrong!", null, Response::HTTP_BAD_REQUEST, false, "Something went worng!");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Website  $website
     * @return \Illuminate\Http\Response
     */
    public function destroy(Website $website)
    {
        if (Storage::disk("public")->exists($website->logo)) {
            Storage::disk("public")->delete($website->logo);
        }
        $isDeleted = DB::transaction(function () use ($website) {
            return $website->delete();
        });
        if ($isDeleted) {
            return $this->apiResponse("Successfully website deleted", null, Response::HTTP_OK, true);
        }
        return $this->apiResponse("Something went wrong!", null, Response::HTTP_BAD_REQUEST, false);
    }
}
