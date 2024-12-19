"use client";
import React, { useState } from "react";

const ProductView = () => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  const product = {
    title: "Nike Air Max 270",
    description:
      "The Nike Air Max 270 combines the exaggerated tongue from the Air Max 180 and classic elements from the Air Max 93. It features Nike's biggest heel Air unit yet, offering the plushest, smoothest ride ever.",
    price: 150.0,
    offerPrice: 129.99,
    image:
      "https://static.nike.com/a/images/f_auto/dpr_3.0,cs_srgb/w_363,c_limit/0ee4f790-971c-4333-abb6-cc85eee8951b/nike-just-do-it.png",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000", "#FFFFFF", "#FF0000", "#0000FF"],
    features: [
      "Mesh and synthetic upper for lightweight breathability",
      "Large Max Air unit delivers plush cushioning",
      "Foam midsole for responsive cushioning",
      "Rubber outsole for durable traction",
    ],
    rating: 4.5,
    reviews: 128,
    inStock: true,
  };

  const incrementQuantity = () =>
    setQuantity((prev) => (prev < 10 ? prev + 1 : prev));
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Left Column - Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((_, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer hover:opacity-75 transition-opacity"
                  >
                    <img
                      src="https://img.freepik.com/premium-photo/hd-digital-art-wallpaper-background_783884-120544.jpg?semt=ais_hybrid"
                      alt={`Product view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.title}
                </h1>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className={`w-5 h-5 ${
                          index < Math.floor(product.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600">
                    {product.reviews} reviews
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-gray-600">{product.description}</p>
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-bold text-gray-900">
                    ${product.offerPrice}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    ${product.price}
                  </span>
                  <span className="text-green-600 font-semibold">
                    Save ${(product.price - product.offerPrice).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Size Selector */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Size
                </label>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center font-medium transition-all
                        ${
                          selectedSize === size
                            ? "border-blue-600 text-blue-600"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selector */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Color
                </label>
                <div className="flex gap-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      className="w-8 h-8 rounded-full border-2 border-white ring-2 ring-gray-200 hover:ring-gray-300 transition-all"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={decrementQuantity}
                    className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                  >
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                  >
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 transition-all">
                Add to Cart
              </button>

              {/* Features */}
              <div className="border-t pt-6 space-y-4">
                <h3 className="font-semibold text-gray-900">
                  Product Features
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-gray-600"
                    >
                      <svg
                        className="w-5 h-5 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
