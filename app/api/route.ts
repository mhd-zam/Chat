import { product } from "../database/product";

export async function GET(request: Request) {
  try {
    return Response.json({
      products: product,
    });
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
