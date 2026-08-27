import { Star } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import Skeliton from "./Loaders/Skeliton";

function ProductCard({ name = "", price = 0, rating = 0, image = "", id }) {
  const displayName = name ? name.split(" ").slice(0, 2).join(" ") : "";

  let stars = [0,0,0,0,0];
  const starCount = Math.floor(rating || 0);
  for (let i = 0; i < starCount; i++) stars[i]= 1;

  return (
    <Link
      to={`/productdetail/${id}`}
      className="h-[95%] w-full cursor-pointer bg-border-light rounded-lg flex flex-col justify-center p-5 hover:border-border-dark border border-border-light hover:scale-[1.02]  transition-all duration-300 ease-in-out hover:**:data-[img]:translate-y-[-15%] gap-1 group"
    >
      <div className="h-[80%] flex items-center justify-center overflow-">
        <img
          src={image}
          alt={name || "Product"}
          data-img
          className="h-full aspect-square object-contain transition-all duration-300 ease-in-out"
        />
      </div>

      <div>
        <h2 className="text-xl font-bold truncate">{displayName || name}</h2>
        <h3 className="font-semibold text-lg">₹{Math.round(price * 100)}</h3>
        <div className="h-5 flex items-center justify-baseline w-1/2 my-1 ">
          {stars.map((elem, idx) => {
            if (elem == 1){
              return <i
                key={idx}
                className="fa-solid fa-star text-amber-400  group-hover:animate-spin"
              ></i>;}
            else{
              return <i
                key={idx}
                className="fa-solid fa-star text-gray-400 "
              ></i>;}
          })}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
