<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\UnauthorizedException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use App\Traits\ApiResponseWithHttpStatus;

class Handler extends ExceptionHandler
{

    use ApiResponseWithHttpStatus;
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     *
     * @throws \Exception
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Exception
     */
    public function render($request, Exception $exception)
    {
        return parent::render($request, $exception);

        if ($exception instanceof ModelNotFoundException) {
            return $this->apiResponse(
                'Model not-found',
                null,
                Response::HTTP_NOT_FOUND,
                false
            );
        } else if ($exception instanceof NotFoundHttpException) {
            return $this->apiResponse(
                'Not found',
                null,
                Response::HTTP_NOT_FOUND,
                false
            );
        } else if ($exception instanceof MethodNotAllowedHttpException) {
            return $this->apiResponse(
                'Bad method',
                null,
                Response::HTTP_METHOD_NOT_ALLOWED,
                false
            );
        } else if ($exception instanceof HttpException) {
            return $this->apiResponse(
                'not found',
                null,
                Response::HTTP_NOT_FOUND,
                false
            );
        } else if ($exception instanceof UnauthorizedException) {
            return $this->apiResponse(
                'Unauthorized',
                null,
                Response::HTTP_UNAUTHORIZED,
                false
            );
        } else if ($exception instanceof AuthenticationException) {
            return $this->apiResponse(
                'Authentication error',
                null,
                Response::HTTP_UNAUTHORIZED,
                false
            );
        } else {
            return $this->apiResponse(
                $exception->getMessage(),
                null,
                Response::HTTP_INTERNAL_SERVER_ERROR,
                false
            );
        }
    }
}
