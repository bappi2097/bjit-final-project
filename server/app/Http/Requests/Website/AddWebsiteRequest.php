<?php

namespace App\Http\Requests\Website;

use App\Traits\ApiResponseWithHttpStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Exceptions\HttpResponseException;

class AddWebsiteRequest extends FormRequest
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
            "name" => "required|string|min:2|max:191",
            "slug" => "required|string|min:2|max:191|unique:websites,slug",
            "logo" => "required|file|mimes:jpg,jpeg,gif,webp,png",
            "website_type_id" => "required|exists:website_types,id",
            "theme_id" => "required|exists:themes,id",
            "navbar_id" => "required|exists:sections,id",
            "contents" => "nullable",
            "design" => "nullable",
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException($this->apiResponse('Something went wrong!', $this, Response::HTTP_UNPROCESSABLE_ENTITY, false, $validator->errors()));
    }
}
