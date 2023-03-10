<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class CitiesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        // return response([]);
        return response(City::all());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            //Validated
            $validateCity = Validator::make(
                $request->all(),
                [
                    'nome' => 'required',
                ]
            );

            if ($validateCity->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation.error',
                    'errors' => $validateCity->errors()
                ], 500);
            }

            $city = City::create([
                'nome' => $request->nome,
            ]);

            return response()->json($city);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response(City::find($id));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): RedirectResponse
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): RedirectResponse
    {
        //
    }
}
