<?php

use Illuminate\Database\Seeder;

class WebsiteTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\WebsiteType::class, 50)->create();
    }
}
