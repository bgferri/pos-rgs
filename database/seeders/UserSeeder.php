<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'role' => 'admin',
        ]);

        \App\Models\User::factory()->create([
            'name' => 'Kasir User',
            'email' => 'kasir@example.com',
            'role' => 'kasir',
        ]);

        \App\Models\User::factory()->create([
            'name' => 'Owner User',
            'email' => 'owner@example.com',
            'role' => 'owner',
        ]);
    }
}
