import { product } from "../../../database/product";

export async function GET(request: Request, { params }) {
  try {
    const { productIndex } = params;
    return Response.json({
      product: product[productIndex],
    });
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
