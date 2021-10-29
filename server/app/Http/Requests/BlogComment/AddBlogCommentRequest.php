<?php

namespace App\Http\Requests\BlogComment;

use App\Traits\ApiResponseWithHttpStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Exceptions\HttpResponseException;

class AddBlogCommentRequest extends FormRequest
{
    use ApiResponseWithHttpStatus;
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "blog_post_id" => "required|exists:blog_posts,id",
            "comment" => "required|string|min:2|max:191"
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException($this->apiResponse('Something went wrong!', $this, Response::HTTP_UNPROCESSABLE_ENTITY, false, $validator->errors()));
    }
}
