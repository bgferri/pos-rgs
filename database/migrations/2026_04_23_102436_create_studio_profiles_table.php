<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('studio_profiles', function (Blueprint $table) {
            $table->id();
            $table->string('name')->default('Studio Foto RGS');
            $table->text('address')->nullable();
            $table->string('phone')->nullable();
            $table->string('instagram')->nullable();
            $table->string('footer_message')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('studio_profiles');
    }
};
