<?php

namespace App\Http\Controllers;

use App\Models\Wish;
use Illuminate\Http\Request;

class WishController extends Controller
{
    public function index()
    {
        // Initial seed if empty
        if (Wish::count() === 0) {
            Wish::create([
                'sender_name' => 'Miles Morales ⚡',
                'message' => 'Happy birthday bro! Keep doing your own thing, you are an amazing hero!',
                'sticker' => '⚡',
                'color_tag' => 'red',
                'likes' => 7,
            ]);
            Wish::create([
                'sender_name' => 'Gwen Stacy 🕸️',
                'message' => 'Selamat ulang tahun! Jangan lupa tersenyum dan selalu percaya pada kemampuanmu.',
                'sticker' => '🌸',
                'color_tag' => 'blue',
                'likes' => 12,
            ]);
            Wish::create([
                'sender_name' => 'Peter B. Parker 🍕',
                'message' => 'Happy birthday kiddo! Remember: with great age, comes more pizza & more wisdom!',
                'sticker' => '🍕',
                'color_tag' => 'yellow',
                'likes' => 9,
            ]);
        }

        return response()->json(Wish::latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'sender_name' => 'required|string|max:60',
            'message' => 'required|string|max:500',
            'sticker' => 'nullable|string|max:10',
            'color_tag' => 'nullable|string|max:20',
        ]);

        $wish = Wish::create([
            'sender_name' => $validated['sender_name'],
            'message' => $validated['message'],
            'sticker' => $validated['sticker'] ?? '🕷️',
            'color_tag' => $validated['color_tag'] ?? 'red',
            'likes' => 0,
        ]);

        return response()->json($wish, 201);
    }

    public function like($id)
    {
        $wish = Wish::findOrFail($id);
        $wish->increment('likes');
        return response()->json(['likes' => $wish->likes]);
    }
}
