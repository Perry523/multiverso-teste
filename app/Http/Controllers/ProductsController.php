<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Product::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            //Validated
            $validateProduct = Validator::make(
                $request->all(),
                [
                    'nome' => 'required',
                    'preco' => 'required',
                    'cor' => 'required',
                ]
            );

            if ($validateProduct->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation.error',
                    'errors' => $validateProduct->errors()
                ], 500);
            }

            $product = Product::create([
                'nome' => $request->nome,
                'cor' => $request->cor,
                'preco' => $request->preco,
                'peso' => $request->peso,
                'descricao' => $request->descricao,
            ]);

            return response()->json($product);
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
        //
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
    public function update(Request $request, string $id)
    {
        try {
            $validateProduct = Validator::make(
                $request->all(),
                [
                    'nome' => 'required',
                    'preco' => 'required',
                    'cor' => 'required',
                ]
            );

            if ($validateProduct->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation.error',
                    'errors' => $validateProduct->errors()
                ], 500);
            }

            $product = Product::find($id);
            $product->nome = $request->nome;
            $product->cor = $request->cor;
            $product->preco = $request->preco;
            $product->peso = $request->peso;
            $product->descricao = $request->descricao;
            $product->save();
            return response()->json($product);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): RedirectResponse
    {
        //
    }
}
