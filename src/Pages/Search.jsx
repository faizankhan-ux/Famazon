import React from "react";
import ProductCard from "../Components/ProductCard";
import { useSelector } from "react-redux";
import Spin from "../Components/Loaders/Spin";
import { SearchX } from "lucide-react";
import { Link } from "react-router";

function Search() {
  const searchResults = useSelector((state) => state.search.Result) || [];
  const Query = useSelector((state) => state.search.Query);
  const loading = useSelector((state) => state.search.loading);

  return (
    <div className="min-h-screen w-full flex flex-col p-5 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold border-b border-slate-200 pb-3 text-slate-800">
        {Query ? `Showing Results for "${Query}"` : "Search Results"}
      </h2>

      {loading ? (
        <Spin />
      ) : searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-5">
          {searchResults.map((elem) => (
            <ProductCard
              name={elem.title}
              price={elem.price}
              rating={elem.rating}
              image={elem?.images?.[0] || elem?.thumbnail || ""}
              key={elem.id}
              id={elem.id}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center text-slate-500">
          <SearchX className="w-12 h-12 text-slate-400 mb-3" />
          <p className="text-lg font-medium">No products found for "{Query}"</p>
          <Link
            to="/shop"
            className="mt-3 text-sm text-orange-500 hover:underline font-semibold cursor-pointer"
          >
            Explore all products
          </Link>
        </div>
      )}
    </div>
  );
}

export default Search;
