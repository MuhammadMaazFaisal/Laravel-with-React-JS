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
}
