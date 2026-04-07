<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Addresses;
use Illuminate\Http\Request;

class AddressController extends Controller
{

    public function index(Request $request)
    {
        $user = $request->user();

        $addresses = Addresses::where('user_id', $user->id)
            ->latest()
            ->get();

        return response()->json([
            'status' => 'success',
            'addresses' => $addresses,
        ], 200);
    }


    public function store(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'recipient_name' => 'required|string|max:255',
            'street' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'province' => 'required|string|max:255',
            'postal_code' => 'required|string|max:20',
            'country' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
        ]);

        $address = Addresses::create([
            'user_id' => $user->id,
            'recipient_name' => $validated['recipient_name'],
            'street' => $validated['street'],
            'city' => $validated['city'],
            'province' => $validated['province'],
            'postal_code' => $validated['postal_code'],
            'country' => $validated['country'],
            'phone' => $validated['phone'],
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Address created successfully',
            'address' => $address,
        ], 201);
    }


    public function show(Request $request, $id)
    {
        $user = $request->user();

        $address = Addresses::where('user_id', $user->id)
            ->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'address' => $address,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $user = $request->user();

        $address = Addresses::where('user_id', $user->id)
            ->findOrFail($id);

        $validated = $request->validate([
            'recipient_name' => 'required|string|max:255',
            'street' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'province' => 'required|string|max:255',
            'postal_code' => 'required|string|max:20',
            'country' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
        ]);

        $address->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Address updated successfully',
            'address' => $address,
        ], 200);
    }

    public function remove(Request $request, $id)
    {
        $user = $request->user();

        $address = Addresses::where('user_id', $user->id)
            ->findOrFail($id);

        $address->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Address deleted successfully',
        ], 200);
    }
}