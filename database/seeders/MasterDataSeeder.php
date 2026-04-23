<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MasterDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kategoriCetak = \App\Models\Category::create([
            'name' => 'Cetak Foto',
            'description' => 'Layanan cetak foto berbagai ukuran dari file digital',
        ]);

        $kategoriStudio = \App\Models\Category::create([
            'name' => 'Foto Studio & Pas Foto',
            'description' => 'Layanan foto di studio (Pas Foto, Foto Box, Prewed)',
        ]);

        $kategoriSewa = \App\Models\Category::create([
            'name' => 'Sewa Peralatan',
            'description' => 'Penyewaan kamera, lensa, dan aksesoris',
        ]);

        // Jasa Cetak Foto
        \App\Models\Service::create(['category_id' => $kategoriCetak->id, 'name' => 'Cetak 4R', 'price' => 5000, 'description' => 'Cetak foto ukuran 4R (10x15 cm)']);
        \App\Models\Service::create(['category_id' => $kategoriCetak->id, 'name' => 'Cetak 10R', 'price' => 25000, 'description' => 'Cetak foto ukuran 10R (20x25 cm)']);
        \App\Models\Service::create(['category_id' => $kategoriCetak->id, 'name' => 'Cetak 10R + Bingkai', 'price' => 50000, 'description' => 'Cetak 10R beserta bingkai minimalis']);

        // Jasa Studio
        \App\Models\Service::create(['category_id' => $kategoriStudio->id, 'name' => 'Pas Foto 4x6 (4 Lembar)', 'price' => 20000, 'description' => 'Foto setengah badan background merah/biru']);
        \App\Models\Service::create(['category_id' => $kategoriStudio->id, 'name' => 'Foto Box (15 Menit)', 'price' => 50000, 'description' => 'Self photo studio dengan unlimited shoot selama 15 menit + cetak 2 strip']);
        \App\Models\Service::create(['category_id' => $kategoriStudio->id, 'name' => 'Prewedding Indoor (Basic)', 'price' => 750000, 'description' => '1 Jam sesi foto, 1 konsep baju, 10 foto edit']);

        // Jasa Sewa
        \App\Models\Service::create(['category_id' => $kategoriSewa->id, 'name' => 'Sewa Canon EOS R (24 Jam)', 'price' => 250000, 'description' => 'Body Only, termasuk baterai dan charger']);
        \App\Models\Service::create(['category_id' => $kategoriSewa->id, 'name' => 'Sewa Lensa 50mm f/1.8 (24 Jam)', 'price' => 50000, 'description' => 'Lensa fix 50mm']);
    }
}
