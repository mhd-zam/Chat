"use server";
import React from "react";
import Redirect from "./component/Redirect";
import { product } from "./database/product";
import axios from "axios";
import axiosInstance from "./config/axios.instance";

export async function getProductData() {
  const response = await axiosInstance.get("/");
  return response.data;
}

const ProductGrid = async () => {
  const calculateDiscount = (price, offerPrice) => {
    return Math.round(((price - offerPrice) / price) * 100);
  };

  const { products } = await getProductData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Featured Products
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Discover our amazing collection with the best deals
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products?.map((product, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  -{calculateDiscount(product.price, product?.offerPrice)}%
                </div>
              </div>

              {/* Content Container */}
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2 h-14 line-clamp-2">
                  {product.title}
                </h2>

                {/* Price Container */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.offerPrice?.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ${product.price?.toFixed(2)}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 group-hover:shadow-md">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to Cart
                </button>

                {/* Quick View Button - Appears on Hover */}
                <div className="absolute inset-x-0 -bottom-10 group-hover:bottom-0 transition-all duration-200">
                  {/* <button className="w-full bg-gray-900 text-white py-1 text-sm font-medium hover:bg-gray-800 transition-colors">
                    Quick View
                  </button> */}
                  <Redirect url={`/product/${index}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
