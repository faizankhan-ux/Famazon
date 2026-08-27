import React from "react";
import { Loader2 } from "lucide-react";

function Spin() {
  return (
    <div className="flex flex-col items-center justify-center py-20 w-full col-span-full">
      <Loader2
        className="h-10 w-10 animate-spin text-primary"
        aria-label="Loading"
      />
      <p className="text-slate-500 font-medium text-sm">Loading...</p>
    </div>
  );
}

export default Spin;
