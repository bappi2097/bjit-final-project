<?php

namespace App\Traits;

use Symfony\Component\HttpFoundation\Response;

trait ApiResponseWithHttpStatus
{
    /**
     * apiResponse
     *
     * @param  string $message
     * @param  mixed $data
     * @param  int $code
     * @param  bool $status
     * @param  mixed $errors
     */
    public function apiResponse(string $message, $data = null, int $code = Response::HTTP_OK, bool $status = true, $errors = null)
    {
        return response([
            "message" => $message,
            "data" => $data,
            "status" => $status,
            "errors" => $errors
        ], $code);
    }
}
