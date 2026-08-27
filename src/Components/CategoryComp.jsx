import React from "react";
import categoryCard from "../../Assets/StaticCategory";
import CategCard from "./CategCard";
import './Components.css';

function CategoryComp() {
  return (
    <div className="h-[30%] w-full  rounded-2xl shadow-[0px_7px_22px_-3px_rgba(91,91,84)] my-5 flex flex-col p-3 items-start justify-center ">
      <h2 className="font-bold text-2xl mt-4 ml-2">Categories</h2>

      <div className="flex items-center justify-center gap-5 h-full w-full  py-3 flex-nowrap scrollbar-gutter-stable overflow-auto">
        {categoryCard.map((elem, id) => (
          <CategCard
            url={elem.img_url}
            name={elem.name}
            key={id}
            slug={elem.slug}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryComp;
