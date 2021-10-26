<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\WebsiteType;
use Faker\Generator as Faker;

$factory->define(WebsiteType::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'image' => $faker->imageUrl(640, 480),
        'contents' => Str::random(10),
    ];
});
