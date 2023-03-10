<?php

namespace App\Http\Controllers;

use App\Models\Store;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class StoresController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $stores = Store::all();
        return response()->json($stores);
    }

    public function productsByStore(Request $request)
    {
        $store = Store::find($request->query('id'));
        return response()->json($store->products);
    }

    public function linkProductToStore(Request $request)
    {
        $store = Store::find($request->store_id);
        $store->products()->attach($request->products_to_link);
        $store->products()->detach($request->products_to_remove);
        return response()->json($store->products);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        try {
            //Validated
            $validateCity = Validator::make(
                $request->all(),
                [
                    'nomeFantasia' => 'required',
                    'cnpj' => 'required',
                    'endereco' => 'required',
                    'nicho' => 'required',
                    'cidade' => ['required', 'number'],
                ]
            );

            if ($validateCity->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation.error',
                    'errors' => $validateCity->errors()
                ], 500);
            }

            $city = Store::create([
                'nomeFantasia' => $request->nomeFantasia,
                'cnpj' => $request->cnpj,
                'nicho' => $request->nicho,
                'endereco' => $request->endereco,
                'cidade' => $request->cidade,
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
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            //Validated
            $validateCity = Validator::make(
                $request->all(),
                [
                    'nomeFantasia' => 'required',
                    'cnpj' => 'required',
                    'endereco' => 'required',
                    'nicho' => 'required',
                    'cidade' => ['required', 'integer'],
                ]
            );

            if ($validateCity->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation.error',
                    'errors' => $validateCity->errors()
                ], 500);
            }
            $store = Store::create([
                'nomeFantasia' => $request->nomeFantasia,
                'cnpj' => $request->cnpj,
                'nicho' => $request->nicho,
                'endereco' => $request->endereco,
                'city_id' => $request->cidade,
            ]);

            return response()->json($store);
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
    public function show(string $id): Response
    {
        $store = Store::find($id);
        $store->products;
        return response($store);
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
