import React, { useEffect, useState } from "react";
import { data, Link, useNavigate } from "react-router";
import Skeliton from "./Loaders/Skeliton";

function Hero() {
  const [heroImage, setHeroImage] = useState(null);
  const [productID, setProductID] = useState(1);

  useEffect(function () {
    let random = Math.floor(Math.random() * 100 + 1);
    fetch(`https://dummyjson.com/products/${random}`)
      .then((data) => data.json())
      .then((obj) => {
        setHeroImage(obj?.images?.[0] || obj?.thumbnail || "");
        setProductID(random == 0 ? 1 : random);

      })
      .catch((err) => console.error("Error fetching hero image:", err));
  }, []);



  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch justify-center gap-6 px-4 py-6 sm:px-6 lg:px-8 ">
      <div className="w-full lg:w-[85%] flex flex-col justify-center gap-4 sm:gap-5 p-6 sm:p-8 lg:p-10 text-lg sm:text-xl items-start shadow-[0px_7px_22px_-3px_rgba(91,91,84)] rounded-lg bg-white ">
        <h1 className="text-3xl sm:text-4xl lg:text-[5vh] font-bold leading-tight lg:w-3/4 text-slate-900">
          Shop the Latest Trends in Style
        </h1>

        <p className="text-base sm:text-lg tracking-wide text-slate-600">
          Discover new arrivals from top brands and choose what suits you
        </p>
        <Link
          to="/shop"
          className="bg-[linear-gradient(to_right,red,orange,red)] bg-[length:200%_100%] bg-right px-6 py-3 rounded-lg font-semibold cursor-pointer text-white hover:bg-left transition-[background-position] duration-300 ease-in-out inline-block"
        >
          Shop Now
        </Link>
      </div>
      <Link
        to={`/productdetail/${productID}`}
        className="w-full lg:w-[35%] min-h-[260px] sm:min-h-[320px] lg:min-h-[400px] rounded-lg flex shadow-[0px_7px_22px_-3px_rgba(91,91,84)] items-center justify-center bg-white p-4 sm:p-6 overflow-hidden"
      >
        {heroImage ? (
          <img
            src={heroImage}
            alt="Featured trend"
            className="w-full h-56 sm:h-72 lg:h-full max-h-[350px] object-contain transition-all duration-200 hover:scale-[1.1]"
          />
        ) : (
          <Skeliton />
        )}
      </Link>
    </div>
  );
}

export default Hero;
