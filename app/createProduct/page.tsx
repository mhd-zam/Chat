// app/products/new/page.tsx
import axios from "axios";
import { revalidatePath } from "next/cache";
import axiosInstance from "../config/axios.instance";

const availableSizes = ["S", "M", "L", "XL"];
const availableColors = ["#000000", "#FFFFFF", "#FF0000", "#0000FF"];

async function createProduct(formData: FormData) {
  "use server";

  try {
    // Extract form data
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;
    const price = parseFloat(formData.get("price") as string);
    const offerPrice = parseFloat(formData.get("offerPrice") as string);
    const sizes = formData.getAll("sizes") as string[];
    const colors = formData.getAll("colors") as string[];
    const features = formData
      .getAll("features")
      .filter((feature) => feature !== "") as string[];

    // Validate data
    if (
      !title ||
      !image ||
      !price ||
      !offerPrice ||
      sizes.length === 0 ||
      colors.length === 0 ||
      features.length === 0
    ) {
      throw new Error("All fields are required");
    }

    // Create the product object
    const product = {
      title,
      image,
      price,
      offerPrice,
      sizes,
      colors,
      features,
    };

    // Here you would typically save to your database
    console.log("Product to be saved:", product);

    await axiosInstance.post("/createProduct", product);

    // Revalidate the products page
    revalidatePath("/products");

    // Redirect or return success message
    return { success: true };
  } catch (error) {
    console.error("Error creating product:", error);
    return {
      error:
        error instanceof Error ? error.message : "Failed to create product",
    };
  }
}

export default function NewProductPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
        >
          Add New Product
        </h1>

        <form
          action={createProduct}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <div>
            <label
              htmlFor="title"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="image"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Image URL
            </label>
            <input
              id="image"
              name="image"
              type="url"
              required
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <div>
              <label
                htmlFor="price"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Price
              </label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </div>

            <div>
              <label
                htmlFor="offerPrice"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Offer Price
              </label>
              <input
                id="offerPrice"
                name="offerPrice"
                type="number"
                step="0.01"
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Sizes
            </label>
            <div style={{ display: "flex", gap: "20px" }}>
              {availableSizes.map((size) => (
                <div
                  key={size}
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <input
                    type="checkbox"
                    id={`size-${size}`}
                    name="sizes"
                    value={size}
                  />
                  <label htmlFor={`size-${size}`}>{size}</label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Colors
            </label>
            <div style={{ display: "flex", gap: "20px" }}>
              {availableColors.map((color) => (
                <div
                  key={color}
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <input
                    type="checkbox"
                    id={`color-${color}`}
                    name="colors"
                    value={color}
                  />
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      backgroundColor: color,
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Features
            </label>
            {[1, 2, 3, 4].map((_, index) => (
              <input
                key={index}
                name="features"
                type="text"
                placeholder={`Feature ${index + 1}`}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  marginBottom: "10px",
                }}
              />
            ))}
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: "#0066cc",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
}
