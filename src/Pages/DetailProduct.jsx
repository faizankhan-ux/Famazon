import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { addItem, removeItem, toggle } from "../Redux/CartSlice";

function DetailProduct() {
  let { id } = useParams();
  const [product, setProduct] = useState({});
  const [image, setImage] = useState("");
  const [reviews, setReviews] = useState([]);
  let cart = useSelector((state) => state.cart.items);
  let dispatch = useDispatch();

  const isInCart = cart.some(
    (item) => (item?.id ?? item) == (product?.id ?? id),
  );

  async function fetchProduct(productID = 1) {
    const URL = `https://dummyjson.com/products/${productID}`;
    let response = await fetch(URL);
    let data = await response.json();
    setProduct(data);
    setImage(data?.images?.[0] || data?.thumbnail || "");
    setReviews(data?.reviews || []);
  }

  useEffect(
    function () {
      fetchProduct(id);
    },
    [id],
  );

  let stars = [0, 0, 0, 0, 0];
  const ratingFloor = Math.floor(product?.rating || 0);
  for (let i = 0; i < ratingFloor; i++) {
    stars[i] = 1;
  }

  return (
    <div className="h-full w-full">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-8 text-slate-800 md:grid-cols-2 ">
        <div>
          <div className="flex h-[430px] items-center justify-center rounded-xl bg-slate-200 p-8 ">
            <img
              className="h-full w-full object-contain transition-all duration-300 ease-in-out "
              src={image}
              alt={product?.title || "Product"}
            />
          </div>
          <div className="mt-4 flex gap-3 overflow-auto">
            {product?.images?.map((item) => (
              <button
                key={item}
                onClick={() => setImage(item)}
                className={`h-20 w-20 shrink-0 rounded-lg border p-2 cursor-pointer ${image === item ? "border-slate-900" : "border-slate-200"}`}
              >
                <img
                  className="h-full w-full object-contain"
                  src={item}
                  alt={product?.title || "Product"}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="mb-2 text-sm text-slate-500">
            Home / Shop / {product?.category}
          </p>
          <h1 className="text-3xl font-bold">{product?.title}</h1>
          <div className="mt-3 flex items-center gap-2 text-sm text-amber-500">
            {stars.map((elem, idx) => {
              if (elem)
                return (
                  <i key={idx} className="fa-solid fa-star text-amber-400"></i>
                );

              return (
                <i key={idx} className="fa-solid fa-star text-gray-400"></i>
              );
            })}
            <span className="text-slate-500">({product?.rating || 0})</span>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <span className="text-3xl font-bold">
              ₹{Math.round((product?.price || 0) * 100)}
            </span>
            {product?.discountPercentage && (
              <span className="rounded bg-red-100 px-2 py-1 text-xs text-red-600">
                -{Math.round(product.discountPercentage)}%
              </span>
            )}
          </div>
          <p className="mt-5 leading-7 text-slate-600 ">
            {product?.description}
          </p>
          <div className="mt-6 flex gap-3 ">
            <button
              onClick={() => {
                dispatch(toggle(product));
              }}
              className={`flex-1 rounded-lg px-6 py-3 font-semibold  text-white cursor-pointer transition-colors ${
                isInCart
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {isInCart ? "Remove from Cart" : "Add to Cart"}
            </button>
            <button className="flex-1 rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-700 cursor-pointer">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="w-full border-t bg-slate-50 px-6 py-10 md:px-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-2xl font-bold text-slate-800">
            Customer Reviews
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {reviews?.map((review, idx) => (
              <article
                key={idx}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-slate-600 text-lg">
                      {review?.reviewerName}
                    </h3>
                    <p className="font-semibold text-slate-600">
                      {review?.reviewerEmail}
                    </p>
                  </div>
                  <div
                    className="flex gap-1 text-amber-400"
                    aria-label={`${review?.rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }, (_, index) => (
                      <i
                        key={index}
                        className={`fa-solid fa-star ${index < (review?.rating || 0) ? "text-amber-400" : "text-slate-300"}`}
                      ></i>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-between gap-2">
                  <p className="mt-4 leading-7 text-text-primary text-lg font-semibold">
                    {review?.comment}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">{review?.date}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
