<?php

namespace App\Http\Controllers\Admin;

use App\Page;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Traits\ApiResponseWithHttpStatus;
use App\Http\Requests\Page\AddPageRequest;
use App\Http\Requests\Page\UpdatePageRequest;
use Symfony\Component\HttpFoundation\Response;

class PageController extends Controller
{
    use ApiResponseWithHttpStatus;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pages = Page::latest()->get();
        return $this->apiResponse("All page Fetched", $pages, Response::HTTP_OK, true);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AddPageRequest $request)
    {
        $page = new Page();
        $isAdded = DB::transaction(function () use ($page, $request) {
            $page->title = $request->title;
            $page->design = $request->design;
            $page->contents = $request->contents;
            return $page->save();
        });
        if ($isAdded) {
            return $this->apiResponse("Successfully page added", $page, Response::HTTP_OK, true);
        }
        return $this->apiResponse("Something went wrong!", null, Response::HTTP_NO_CONTENT, false);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function show(Page $page)
    {
        return $this->apiResponse("Successfully page found", $page, Response::HTTP_OK, true);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePageRequest $request, Page $page)
    {
        $isUpdated = DB::transaction(function () use ($page, $request) {
            $page->title = $request->title;
            $page->design = $request->design;
            $page->contents = $request->contents;
            return $page->save();
        });
        if ($isUpdated) {
            return $this->apiResponse("Successfully page updated", $page, Response::HTTP_OK, true);
        }

        return $this->apiResponse("Something went wrong!", null, Response::HTTP_BAD_REQUEST, false, "Something went worng!");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function destroy(Page $page)
    {
        $isDeleted = DB::transaction(function () use ($page) {
            return $page->delete();
        });
        if ($isDeleted) {
            return $this->apiResponse("Successfully page deleted", null, Response::HTTP_OK, true);
        }
        return $this->apiResponse("Something went wrong!", null, Response::HTTP_BAD_REQUEST, false);
    }
}
