<?php

namespace App\Http\Controllers\Admin;

use App\BlogPost;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Traits\ApiResponseWithHttpStatus;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Requests\BlogPost\AddBlogPostRequest;
use App\Http\Requests\BlogPost\UpdateBlogPostRequest;

class BlogPostController extends Controller
{
    use ApiResponseWithHttpStatus;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $blogPosts = BlogPost::with(["blogComments", "blogCategory"])->latest()->get();
        return $this->apiResponse("All blog post Fetched", $blogPosts, Response::HTTP_OK, true);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AddBlogPostRequest $request)
    {
        $blogPost = new BlogPost();
        $isAdded = DB::transaction(function () use ($blogPost, $request) {
            $blogPost->title = $request->title;
            $blogPost->blog_category_id = $request->blog_category_id;
            $blogPost->user_id = auth()->user()->id;
            $blogPost->summery = $request->summery;
            $blogPost->contents = $request->contents;
            if ($request->hasFile('image')) {
                $blogPost->image = Storage::disk("public")->put('blog-posts', $request->file('image'));
            }
            return $blogPost->save();
        });
        if ($isAdded) {
            return $this->apiResponse("Successfully blog post added", $blogPost, Response::HTTP_OK, true);
        }
        return $this->apiResponse("Something went wrong!", null, Response::HTTP_NO_CONTENT, false);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\BlogPost  $blogPost
     * @return \Illuminate\Http\Response
     */
    public function show(BlogPost $blogPost)
    {
        return $this->apiResponse("Successfully blog post found", $blogPost, Response::HTTP_OK, true);
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\BlogPost  $blogPost
     * @return \Illuminate\Http\Response
     */
    public function single($slug)
    {
        $blogPost = BlogPost::where("slug", $slug)->first();
        return $this->apiResponse("Successfully blog post found", $blogPost, Response::HTTP_OK, true);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\BlogPost  $blogPost
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateBlogPostRequest $request, BlogPost $blogPost)
    {
        $isUpdated = DB::transaction(function () use ($blogPost, $request) {
            $blogPost->title = $request->title;
            $blogPost->blog_category_id = $request->blog_category_id;
            $blogPost->summery = $request->summery;
            $blogPost->contents = $request->contents;
            if ($request->hasFile('image')) {
                if (Storage::disk("public")->exists($blogPost->image)) {
                    Storage::disk("public")->delete($blogPost->image);
                }
                $blogPost->image = Storage::disk("public")->put('website-type', $request->file('image'));
            }
            return $blogPost->save();
        });
        if ($isUpdated) {
            return $this->apiResponse("Successfully blog post updated", $blogPost, Response::HTTP_OK, true);
        }

        return $this->apiResponse("Something went wrong!", null, Response::HTTP_BAD_REQUEST, false, "Something went worng!");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\BlogPost  $blogPost
     * @return \Illuminate\Http\Response
     */
    public function destroy(BlogPost $blogPost)
    {
        if (Storage::disk("public")->exists($blogPost->image)) {
            Storage::disk("public")->delete($blogPost->image);
        }
        $isDeleted = DB::transaction(function () use ($blogPost) {
            return $blogPost->delete();
        });
        if ($isDeleted) {
            return $this->apiResponse("Successfully blog post deleted", null, Response::HTTP_OK, true);
        }
        return $this->apiResponse("Something went wrong!", null, Response::HTTP_BAD_REQUEST, false);
    }

    public function UserPost()
    {
        $blogPosts = BlogPost::with(["blogComments", "blogCategory"])->where("user_id", auth()->user()->id)->latest()->paginate(10);
        return $this->apiResponse("All blog post Fetched", $blogPosts, Response::HTTP_OK, true);
    }
}
