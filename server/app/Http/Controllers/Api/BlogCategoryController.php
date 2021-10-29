<?php

namespace App\Http\Controllers\Api;

use App\BlogCategory;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Traits\ApiResponseWithHttpStatus;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Requests\BlogCategory\AddBlogCategoryRequest;
use App\Http\Requests\BlogCategory\UpdateBlogCategoryRequest;

class BlogCategoryController extends Controller
{
    use ApiResponseWithHttpStatus;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $blogCategories = BlogCategory::latest()->get();
        return $this->apiResponse("All blog category Fetched", $blogCategories, Response::HTTP_OK, true);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AddBlogCategoryRequest $request)
    {
        $blogCategory = new BlogCategory();
        $isAdded = DB::transaction(function () use ($blogCategory, $request) {
            $blogCategory->name = $request->name;
            $blogCategory->user_id = auth()->user()->id;
            return $blogCategory->save();
        });
        if ($isAdded) {
            return $this->apiResponse("Successfully blog category added", $blogCategory, Response::HTTP_OK, true);
        }
        return $this->apiResponse("Something went wrong!", null, Response::HTTP_NO_CONTENT, false);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\BlogCategory  $blogCategory
     * @return \Illuminate\Http\Response
     */
    public function show(BlogCategory $blogCategory)
    {
        return $this->apiResponse("Successfully blog category found", $blogCategory, Response::HTTP_OK, true);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\BlogCategory  $blogCategory
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateBlogCategoryRequest $request, BlogCategory $blogCategory)
    {
        $isUpdated = DB::transaction(function () use ($blogCategory, $request) {
            $blogCategory->name = $request->name;
            return $blogCategory->save();
        });
        if ($isUpdated) {
            return $this->apiResponse("Successfully blog category updated", $blogCategory, Response::HTTP_OK, true);
        }

        return $this->apiResponse("Something went wrong!", null, Response::HTTP_BAD_REQUEST, false, "Something went worng!");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\BlogCategory  $blogCategory
     * @return \Illuminate\Http\Response
     */
    public function destroy(BlogCategory $blogCategory)
    {
        $isDeleted = DB::transaction(function () use ($blogCategory) {
            return $blogCategory->delete();
        });
        if ($isDeleted) {
            return $this->apiResponse("Successfully blog category deleted", null, Response::HTTP_OK, true);
        }
        return $this->apiResponse("Something went wrong!", null, Response::HTTP_BAD_REQUEST, false);
    }
}
