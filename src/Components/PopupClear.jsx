import { useDispatch } from "react-redux";
import { clear } from "../Redux/CartSlice";

function PopupClear({ setPopUp, dispatch }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-xl">
        <h2 className="mb-3 text-xl font-semibold text-gray-900">
          Clear all items?
        </h2>
        <p className="mb-6 text-sm text-gray-600">
          Are you sure you want to remove all items? This action cannot be
          undone.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => setPopUp(false)}
            type="button"
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              dispatch(clear());
              setPopUp(false);
            }}
            type="button"
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Clear all
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupClear;
