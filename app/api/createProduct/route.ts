import { product } from "../../database/product";

export async function POST(request: Request) {
  try {
    product.push(request.body);
    return Response.json({
      products: request.body,
    });
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
