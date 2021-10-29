<?php

namespace App\Http\Requests\BlogPost;

use App\Traits\ApiResponseWithHttpStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateBlogPostRequest extends FormRequest
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
            "blog_category_id" => "required|exists:blog_categories,id",
            "title" => "required|string|min:2|max:191",
            "image" => "nullable|file|mimes:jpg,jpeg,gif,webp,png",
            "summery" => "required",
            "contents" => "required"
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException($this->apiResponse('Validation failed!', null, Response::HTTP_UNPROCESSABLE_ENTITY, false, $validator->errors()));
    }
}
