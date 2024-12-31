import Link from "next/link";
import React from "react";

type RedirectType = {
  url: string;
};

function Redirect({ url }: RedirectType) {
  return (
    <div className="w-full">
      <Link href={url} passHref legacyBehavior>
        <button className="w-full bg-gray-900 text-white py-1 text-sm font-medium hover:bg-gray-800 transition-colors">
          Quick View
        </button>
      </Link>
    </div>
  );
}

export default Redirect;
