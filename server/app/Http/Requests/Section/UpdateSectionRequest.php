<?php

namespace App\Http\Requests\Section;

use App\Traits\ApiResponseWithHttpStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateSectionRequest extends FormRequest
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
            "component_name" => "required|string|min:2|max:191",
            "setting" => "required",
            "contents" => "required",
            "design" => "required"
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException($this->apiResponse('Validation failed!', null, Response::HTTP_UNPROCESSABLE_ENTITY, false, $validator->errors()));
    }
}