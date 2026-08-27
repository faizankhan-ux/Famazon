import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../Redux/ShopSlice";
import ProductCard from "../Components/ProductCard";
import Skeliton from "../Components/Loaders/Skeliton";
import debounce from "../debounce.js";

function Shop() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const items = useSelector((state) => state.shop.value);
  const dispatch = useDispatch();

  // FETCH CATEGORIES
  async function fetchCategories() {
    try {
      let res = await fetch("https://dummyjson.com/products/categories");
      let data = await res.json();
      setCategories(data);
    } catch (e) {
      console.error("Error fetching categories:", e);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  // FETCH ITEMS
  let [category, setCategory] = useState("");
  const [price, setPrice] = useState(2000);
  const [ratings, setRatings] = useState([]);
  const [allItems, setAllItems] = useState([]);

  async function getItems() {
    
    setLoading(true);
    try {
      let URL = `https://dummyjson.com/products${category !== "" ? "/category/" + category : "?limit=50"}`;
      let res = await fetch(URL);
      let data = await res.json();
      const fetched = data?.products || [];
      setAllItems(fetched);
      dispatch(update(fetched));
    } catch (e) {
      console.error("Error fetching products:", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getItems();
  }, [category]);

  // Combined filter for Price & Rating
  useEffect(() => {
    if (allItems.length === 0) return;
    let filtered = allItems.filter((elem) => elem.price <= price);

    if (ratings.length > 0) {
      filtered = filtered.filter((elem) =>
        ratings.some((r) => Math.floor(elem.rating) >= r),
      );
    }

    dispatch(update(filtered));
  }, [price, ratings, allItems]);

  const debouncedSetPrice = useMemo(
    () => debounce((val) => setPrice(Number(val)), 200),
    [],
  );

  const toggleRating = (r) => {
    setRatings((prev) =>
      prev.includes(r) ? prev.filter((item) => item !== r) : [...prev, r],
    );
  };

  return (
    <div className="min-h-screen w-full p-5 max-w-7xl mx-auto">
      <h2 className="mb-4 text-3xl font-bold text-slate-800">Shop</h2>

      <div className="flex flex-col md:flex-row h-full w-full gap-6">
        <div className="sidebar w-full md:w-[260px] shrink-0 rounded-xl border bg-white px-6 py-5 shadow-sm h-fit">
          <h3 className="mb-4 text-base font-bold text-slate-800">Categories</h3>

          <ol className="mb-8 max-h-60 space-y-2 overflow-y-auto text-sm text-neutral-700 pr-2">
            <li
              onClick={() => setCategory("")}
              className={`cursor-pointer px-2 py-1 rounded transition-colors ${
                category === ""
                  ? "bg-orange-100 text-orange-600 font-bold"
                  : "hover:bg-slate-100"
              }`}
            >
              All Categories
            </li>
            {categories.map((elem, idx) => {
              const slug = typeof elem === "string" ? elem : elem.slug;
              const name = typeof elem === "string" ? elem : elem.name;
              const isSelected = category === slug;
              return (
                <li
                  onClick={() => setCategory(slug)}
                  className={`cursor-pointer px-2 py-1 rounded transition-colors ${
                    isSelected
                      ? "bg-orange-100 text-orange-600 font-bold"
                      : "hover:bg-slate-100"
                  }`}
                  key={slug || idx}
                >
                  {name}
                </li>
              );
            })}
          </ol>

          <h3 className="mb-4 text-base font-bold text-slate-800">Filters</h3>

          <h4 className="mb-2 text-sm font-semibold text-slate-700">
            Max Price: ₹{price * 100}
          </h4>
          <input
            onChange={(e) => debouncedSetPrice(e.target.value)}
            type="range"
            min="10"
            max="3000"
            defaultValue={price}
            className="mb-1 h-1.5 w-full cursor-pointer accent-orange-500"
          />
          <div className="mb-7 flex justify-between text-xs text-neutral-500 font-medium">
            <span>₹1,000</span>
            <span>₹3,00,000</span>
          </div>

          <h4 className="mb-3 text-sm font-semibold text-slate-700">Rating</h4>
          <div className="space-y-2 text-sm">
            {[4, 3, 2].map((r) => (
              <label
                key={r}
                className="flex cursor-pointer items-center gap-2 select-none hover:opacity-80"
              >
                <input
                  type="checkbox"
                  checked={ratings.includes(r)}
                  onChange={() => toggleRating(r)}
                  className="h-4 w-4 rounded accent-orange-500 cursor-pointer"
                />
                <span className="tracking-wide text-orange-400">
                  {"★".repeat(r)}
                  <span className="text-neutral-300">
                    {"★".repeat(5 - r)}
                  </span>
                </span>
                <span className="text-xs text-slate-500">& above</span>
              </label>
            ))}
          </div>
        </div>

        <div className="w-full">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1,1,1,1,1,1,1,1,1,1,1,1,1,1,].map((_, i) => (
                <div key={i} className="h-64 rounded-xl bg-slate-300 animate-pulse" />
              ))}
            </div>
          ) : items && items.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((elem) => (
                <ProductCard
                  name={elem.title}
                  price={elem.price}
                  rating={elem.rating}
                  image={elem?.images?.[0] || elem?.thumbnail || ""}
                  id={elem.id}
                  key={elem.id}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center text-slate-500">
              <p className="text-lg font-medium">No products found matching your filters.</p>
              <button
                onClick={() => {
                  setCategory("");
                  setPrice(2000);
                  setRatings([]);
                }}
                className="mt-3 text-sm text-orange-500 hover:underline font-semibold cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Shop;
