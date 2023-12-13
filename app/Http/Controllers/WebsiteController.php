<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Products;

class WebsiteController extends Controller
{
    public function search(Request $request)
    {
        $products = Products::where('status', 1)->where('product_name', 'like', '%' . $request->search . '%')->get();
        return $products;
    }

    public function index(Request $request)
    {
        $products = Products::where('status', 1)->get();
        return $products;
    }

    public function destroy(Request $request, $id)
    {
        $product = Products::find($id);
        $product->status = 0;
        $product->save();
        return response()->json([
            'message' => 'Product deleted successfully!',
        ], 200);
    }

    public function show(Request $request, $id)
    {
        $product = Products::find($id);
        return $product;
    }

    public function update(Request $request, $id)
    {
        dd($request->all());
        $product = Products::find($id);
        $product->product_name = $request->name;
        $product->price = $request->price;
        $product->description = $request->description;
        $product->save();
        return response()->json([
            'message' => 'Product updated successfully!',
        ], 200);
    }
}
