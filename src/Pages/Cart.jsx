import {clear} from "../Redux/CartSlice"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import ProductCard from "../Components/ProductCard";
import { Eraser } from "lucide-react";
import PopupClear from "../Components/PopupClear";
import { useState } from "react";


function Cart() {
  let items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch()
  const [popUp, setPopUp] = useState(false)
  
  const totalPrice = items.reduce((acc, item) => {
    return acc + (item?.price ? Math.round(item.price * 100) : 0);
  }, 0);

  return (
    <div className="min-h-[calc(100vh-60px)] w-full flex flex-col items-start p-6 max-w-7xl mx-auto ">
      <div className="flex justify-between items-center w-full mb-6 pb-4 border-b">
          {popUp && <PopupClear setPopUp={setPopUp} dispatch={dispatch} />}
        <h2 className="text-2xl font-bold text-slate-800">Shopping Cart</h2>
        <div className="flex h-full justify-between gap-2">
          <span className="text-slate-500 font-medium">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
          <Eraser
          onClick={() => setPopUp(true)}
          className="text-red-500 cursor-pointer " />
        </div>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full py-20 text-center gap-4">
          <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-3xl text-slate-400">
            🛒
          </div>
          <h3 className="text-xl font-bold text-slate-700">
            Your Cart is Empty
          </h3>
          <p className="text-slate-500 max-w-md">
            Looks like you haven't added anything to your cart yet. Explore our
            products and start shopping!
          </p>
          <Link
            to="/shop"
            className="mt-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="w-full flex flex-col lg:flex-row gap-8">
          <div className="flex-1 rounded-2xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {items.map((prod, idx) => {
              const image = prod?.images?.[0] || prod?.thumbnail || "";
              return (
                <ProductCard
                  name={prod?.title || `Product #${prod?.id || prod}`}
                  price={prod?.price || 0}
                  rating={prod?.rating || 0}
                  image={image}
                  id={prod?.id || prod}
                  key={prod?.id ? `${prod.id}-${idx}` : idx}
                />
              );
            })}
          </div>

          <div className="w-full lg:w-80 h-fit bg-slate-50 border rounded-2xl p-6 flex flex-col gap-4 sticky top-20">
            <h3 className="text-lg font-bold text-slate-800">Order Summary</h3>
            <div className="flex justify-between text-slate-600">
              <span>Subtotal ({items.length} items)</span>
              <span className="font-semibold text-slate-800">
                ₹{totalPrice}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Shipping</span>
              <span className="text-green-600 font-semibold">Free</span>
            </div>
            <hr className="border-slate-200" />
            <div className="flex justify-between text-lg font-bold text-slate-900">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
            <button className="w-full mt-2 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl cursor-pointer transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
