import React, { useEffect, useState } from "react";
import { Link } from "react-router";

function CategCard({ name, url, slug }) {
  const [img_url, setImg_url] = useState(url || "");

  async function fetchImage() {
    if (!slug) return;
    try {
      let response = await fetch(
        `https://dummyjson.com/products/category/${slug}`,
      );
      let data = await response.json();
      let image =
        data?.products?.[0]?.images?.[0] || data?.products?.[0]?.thumbnail;
      if (image) {
        setImg_url(image);
      }
    } catch (err) {
      console.error("Failed to load category image:", err);
    }
  }

  useEffect(() => {
    fetchImage();
  }, [slug]);

  return (
    <Link
      to="/shop"
      className="h-full min-w-[120px] text-center font-semibold cursor-pointer hover:shadow-md rounded-2xl hover:bg-gray-100 flex flex-col items-center justify-around p-4 transition-all"
    >
      <img
        src={img_url || url}
        alt={name}
        className="h-20 w-20 object-contain rounded-lg"
      />
      <h3 className="text-sm mt-2 text-slate-700">{name}</h3>
    </Link>
  );
}

export default CategCard;
