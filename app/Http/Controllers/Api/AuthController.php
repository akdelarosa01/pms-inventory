<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $req)
    {
        $credentials = $req->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => "Provided Username or Password is incorrect.",
                'status' => "warning"
            ]);
        }

        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user','token'));
    }

    public function logout(Request $req)
    {
        /** @var User $user */
        $user = $req->user();
        $user->currentAccessToken()->delete;

        return response('',204);
    }

    public function username()
    {
        return 'username';
    }
}
