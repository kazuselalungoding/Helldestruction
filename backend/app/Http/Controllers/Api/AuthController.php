<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try{
            $validateUser = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users,email',
                'password' => 'required|string|min:8',
            ],  [
                'email.unique' => 'The email has already been taken.',
                'email.required' => 'The email field is required.',
                'email.email' => 'The email must be a valid email address.',
                'password.required' => 'The password field is required.',
                'password.min' => 'The password must be at least 8 characters.',
                'name.required' => 'The name field is required.',
            ]);

            if($validateUser->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'Validation error',
                    'errors' => $validateUser->errors()
                ], 422);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'user',
            ]);

            Auth::login($user);

            return response()->json([
                'status' => true,
                'message' => 'User registered successfully',
                'user' => $user,
                // 'token' => $user->createToken("API TOKEN")->plainTextToken
            ], 201);
        } catch(\Throwable $e){
            return response()->json([
                'status' => false,
                'message' => 'Registration failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function login(Request $request)
    {
        try{
            $validateUser = Validator::make($request->all(), [
                'email' => 'required|string|email',
                'password' => 'required|string',
            ]);
            

            if($validateUser->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'Validation error',
                    'errors' => $validateUser->errors()
                ], 422);
            };

            
            if(!Auth::attempt($request->only(['email', 'password']))){
                return response()->json([
                    'status' => false,
                    'message' => 'Email & Password does not match our records.',
                ], 401);
            }

            $user = User::where('email', $request->email)->first();

            if($user->role === 'admin'){
                return response()->json([
                    'status' => false,
                    'message' => 'Access denied for admin users.',
                ], 403);
            }

            $request->session()->regenerate();

            return response()->json([
                'status' => true,
                'message' => 'User logged in successfully',
                'user' => $user,
                // 'token' => $user->createToken("API TOKEN")->plainTextToken
            ], 200);


        } catch(\Throwable $e){
            return response()->json([
                'status' => false,
                'message' => 'Login failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'status' => true,
            'message' => 'User logged out successfully',
        ], 200);
    }

    // test spa user
    public function user(Request $request)
    {
        return response()->json([
            'status' => true,
            'user' => $request->user(),
        ], 200);
    }
    
}
