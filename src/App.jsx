import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import "./index.css";
import { Routes, Route } from "react-router";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import DetailProduct from "./Pages/DetailProduct";
import Search from "./Pages/Search";



function App() {
  return (
    <div className="h-screen w-full ">
      <Navbar /> 
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/productdetail/:id" element={<DetailProduct />} />
        <Route path="/search" element={<Search />} />
      </Routes>
   
    </div>
  );
}

export default App;
