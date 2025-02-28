<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create Roles
        $admin = Role::create(['name' => 'admin']);
        $editor = Role::create(['name' => 'editor']);
        $user = Role::create(['name' => 'user']);

        // Create Permissions
        $manageUsers = Permission::create(['name' => 'manage users']);
        $editPosts = Permission::create(['name' => 'edit posts']);

        // Assign Permissions to Roles
        $admin->givePermissionTo([$manageUsers, $editPosts]);
        $editor->givePermissionTo([$editPosts]);
    }
}
