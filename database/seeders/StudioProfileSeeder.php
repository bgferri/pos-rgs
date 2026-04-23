<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StudioProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\StudioProfile::create([
            'name' => 'Studio Foto RGS',
            'address' => 'Jl. Contoh Alamat Studio No. 123, Kota Anda',
            'phone' => '081234567890',
            'instagram' => 'https://www.instagram.com/rgs.studio_/',
            'footer_message' => 'Terima kasih telah berkunjung',
        ]);
    }
}
