<?php

namespace App\Http\Controllers;

use App\Models\StudioProfile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudioProfileController extends Controller
{
    public function edit()
    {
        $profile = StudioProfile::first() ?? StudioProfile::create([
            'name' => 'Studio Foto RGS',
            'footer_message' => 'Terima kasih telah berkunjung',
            'instagram' => 'https://www.instagram.com/rgs.studio_/'
        ]);

        return Inertia::render('settings/studio', [
            'profile' => $profile
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'nullable|string',
            'phone' => 'nullable|string|max:20',
            'instagram' => 'nullable|string|url',
            'footer_message' => 'nullable|string',
        ]);

        $profile = StudioProfile::first();
        if ($profile) {
            $profile->update($validated);
        } else {
            StudioProfile::create($validated);
        }

        return redirect()->back()->with('success', 'Profil studio berhasil diperbarui.');
    }
}
