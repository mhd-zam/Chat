"use client";
import Link from "next/link";
import React from "react";

function Redirect() {
  return (
    <Link
      href={"/product/hdfsjhhsdfjkfdh"}
      className="w-full bg-gray-900 text-white py-1 text-sm font-medium hover:bg-gray-800 transition-colors"
    >
      Quick View
    </Link>
  );
}

export default Redirect;
