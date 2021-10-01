<?php

namespace App\Http\Controllers\Api;

use App\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Traits\ApiResponseWithHttpStatus;
use App\Http\Requests\PostStoreFormRequest;
use Symfony\Component\HttpFoundation\Response;

class PostController extends Controller
{
    use ApiResponseWithHttpStatus;

    public function index()
    {
        $posts = Post::with('categories')->paginate(10);
        return $this->apiResponse("Reponse successful", $posts);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PostStoreFormRequest $request)
    {
        $data = [
            "user_id" => auth()->user()->id,
            "title" => $request->title,
            "slug" => $request->slug,
            "summery" => $request->summery,
            "description" => $request->description
        ];

        $category_ids = $request->category;
        if ($request->hasFile('image')) {
            $data["image"] = Storage::disk("public")->put('post', $request->file('image'));
        }

        $post = new Post($data);

        if ($post->save()) {
            $post->categories()->sync($category_ids);
            return $this->apiResponse("Post Added Succesfully", $post);
        }
        return $this->apiResponse("Something went wrong!", null, Response::HTTP_UNPROCESSABLE_ENTITY, false);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        if (Storage::disk("public")->exists($post->image)) {
            Storage::disk("public")->delete($post->image);
        }
        $post->categories()->detach();
        if ($post->delete()) {
            return $this->apiResponse("Post Deleted Succesfully");
        }
        return $this->apiResponse("Something went wrong!", null, Response::HTTP_UNPROCESSABLE_ENTITY, false);
    }
}
