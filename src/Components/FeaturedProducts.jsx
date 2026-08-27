import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Link } from "react-router";


function FeaturedProducts() {
  const [featuredPrdoucts, setFeaturedPrdoucts] = useState([]);
  const [limit, setLimit] = useState(30)
  const [skip, setSkip] = useState(0)

  // useEffect( ,[])

  async function fetchFeaturedPrdoucts() {
    let response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
    let data = await response.json();
  
    console.log(data)
    let prev = [...featuredPrdoucts , ...data?.products];

    setFeaturedPrdoucts(prev);
  }

  useEffect(() => {
    fetchFeaturedPrdoucts();
  }, [limit,skip]);

  function loadMore(){
    console.log(limit,skip)
    setSkip(skip + 30)
  }

  return (
    <div className="w-[95%]  bg-white flex flex-col justify-start rounded-2xl p-4 gap-3 shdadow-[0px_7px_22px_-3px_rgba(91,91,84)] ">
      <div className="w-full flex justify-between ">
        <h2 className="font-bold text-2xl">Featured products </h2>
        <Link to='/shop' className="text-text-muted font-semibold cursor-pointer">view all</Link>
      </div>

      <div className="grid flex-1   grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 p-5 ">
        {featuredPrdoucts.map((elem) => (
          <ProductCard
            name={elem.title}
            price={elem.price}
            rating={elem.rating}
            image={elem?.images[0]}
            key={elem.id}
            id={elem.id}
          />
        ))}
      </div>

      <div className="flex justify-center ">
        <button
        onClick={loadMore}
        className="p-2 rounded-lg bg-primary text-white font-bold cursor-pointer">
          Load more{" "}
        </button>
      </div>
    </div>
  );
}

export default FeaturedProducts;
