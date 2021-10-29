<?php

namespace App\Http\Controllers\Api;

use App\BlogComment;
use App\BlogPost;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Traits\ApiResponseWithHttpStatus;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Requests\BlogComment\AddBlogCommentRequest;
use App\Http\Requests\BlogComment\UpdateBlogCommentRequest;

class BlogCommentController extends Controller
{
    use ApiResponseWithHttpStatus;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $blogComments = BlogComment::latest()->get();
        return $this->apiResponse("All blog comment Fetched", $blogComments, Response::HTTP_OK, true);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AddBlogCommentRequest $request)
    {
        $blogComment = new BlogComment();
        $isAdded = DB::transaction(function () use ($blogComment, $request) {
            $blogComment->comment = $request->comment;
            $blogComment->blog_post_id = $request->blog_post_id;
            $blogComment->user_id = auth()->user()->id;
            return $blogComment->save();
        });
        if ($isAdded) {
            return $this->apiResponse("Successfully blog comment added", $blogComment, Response::HTTP_OK, true);
        }
        return $this->apiResponse("Something went wrong!", null, Response::HTTP_NO_CONTENT, false);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\BlogComment  $blogComment
     * @return \Illuminate\Http\Response
     */
    public function show(BlogComment $blogComment)
    {
        return $this->apiResponse("Successfully blog comment found", $blogComment, Response::HTTP_OK, true);
    }

    public function getComment(BlogPost $blogPost)
    {
        $blogComments = $blogPost->blogComments;
        return $this->apiResponse("Successfully blog comment found", $blogComments, Response::HTTP_OK, true);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\BlogComment  $blogComment
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateBlogCommentRequest $request, BlogComment $blogComment)
    {
        $isUpdated = DB::transaction(function () use ($blogComment, $request) {
            $blogComment->comment = $request->comment;
            return $blogComment->save();
        });
        if ($isUpdated) {
            return $this->apiResponse("Successfully blog comment updated", $blogComment, Response::HTTP_OK, true);
        }

        return $this->apiResponse("Something went wrong!", null, Response::HTTP_BAD_REQUEST, false, "Something went worng!");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\BlogComment  $blogComment
     * @return \Illuminate\Http\Response
     */
    public function destroy(BlogComment $blogComment)
    {
        $isDeleted = DB::transaction(function () use ($blogComment) {
            return $blogComment->delete();
        });
        if ($isDeleted) {
            return $this->apiResponse("Successfully blog comment deleted", null, Response::HTTP_OK, true);
        }
        return $this->apiResponse("Something went wrong!", null, Response::HTTP_BAD_REQUEST, false);
    }
}
