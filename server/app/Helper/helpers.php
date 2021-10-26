<?php

/**
 * this function return client url
 *
 * @param  mixed $url
 * @return string
 */
function clientUrl(string $url): string
{
    $client_url = env('APP_CLIENT_URL') ?: '';
    return $client_url . $url;
}
