import { useState } from "react";
import {
  Heart,
  Home,
  Menu,
  Search,
  ShoppingCart,
  Store,
  X,
} from "lucide-react";
import "../index.css";
import { NavLink, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setResult, setQuery, setLoading } from "../Redux/SearchSlice";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.length;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      navigate("/shop");
      return;
    }

    try {
      dispatch(setQuery(searchQuery));
      dispatch(setLoading(true));
      navigate("/search");
      let res = await fetch(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery.trim())}`,
      );
      let data = await res.json();

      dispatch(setResult(data.products || []));
    } catch (err) {
      console.error("Search failed:", err);
      dispatch(setResult([]));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
      ? "text-orange-400 bg-white/10 font-semibold shadow-sm"
      : "text-slate-300 hover:text-white hover:bg-white/5"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full bg-navbar border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <NavLink to="/" className="flex items-center group ">
              <span className="text-primary font-black text-3xl transition-transform group-hover:scale-110">
                F
              </span>
              <span className="text-2xl font-black italic tracking-tight text-white  ">
                amazon
              </span>
            </NavLink>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              <NavLink to="/" className={navLinkClass}>
                <Home className="w-4 h-4" />
                <span>Home</span>
              </NavLink>

              <NavLink to="/shop" className={navLinkClass}>
                <Store className="w-4 h-4" />
                <span>Shop</span>
              </NavLink>
            </nav>
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex-1 max-w-lg hidden sm:flex items-center relative"
          >
            <input
              type="text"
              placeholder="Search products, brands and categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/80 text-slate-100 placeholder-slate-400 text-sm rounded-full pl-10 pr-24 py-2 border border-slate-700 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <button
              type="submit"
              className="absolute right-1 px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-full transition-colors cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            

            <NavLink
              to="/cart"
              className="relative p-2 text-slate-300 hover:text-orange-400 hover:bg-white/5 rounded-full transition-colors flex items-center"
              title="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 min-w-5 flex items-center justify-center px-1 animate-pulse">
                  {cartCount}
                </span>
              )}
            </NavLink>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white md:hidden rounded-lg hover:bg-white/5 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search input (visible only on small screens) */}
        <div className="sm:hidden pb-3 pt-1">
          <form onSubmit={handleSearch} className="relative flex items-center">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 text-slate-100 placeholder-slate-400 text-sm rounded-lg pl-9 pr-20 py-2 border border-slate-700 focus:outline-none focus:border-orange-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <button
              type="submit"
              className="absolute right-1 px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-md"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-4 py-4 space-y-2">
          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-200 hover:bg-slate-800 hover:text-orange-400 font-medium"
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/shop"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-200 hover:bg-slate-800 hover:text-orange-400 font-medium"
          >
            <Store className="w-5 h-5" />
            <span>Shop</span>
          </NavLink>

          <NavLink
            to="/cart"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-4 py-2.5 rounded-lg text-slate-200 hover:bg-slate-800 hover:text-orange-400 font-medium"
          >
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-5 h-5" />
              <span>My Cart</span>
            </div>
            {cartCount > 0 && (
              <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>
      )}
    </header>
  );
}

export default Navbar;
