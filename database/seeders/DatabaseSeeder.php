<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\FirstUserSeed;
use Database\Seeders\PermissionSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        //\App\Models\User::factory(1)->create();

        $this->call([
            // PermissionSeeder::class,
            // FirstUserSeed::class,
            RolePermissionSeeder::class,
        ]);
    }
}
