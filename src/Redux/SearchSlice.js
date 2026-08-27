import { createSlice } from "@reduxjs/toolkit";

const SearchSlice = createSlice({
  name: "SearchSlice",
  initialState: {
    Query: "",
    Result: [],
    loading:false,
  },
  reducers: {
    setResult: function (state, actions) {
      console.log("Result set");
      state.Result = actions.payload;
    },
    setQuery: function (state, actions) {
      state.Query = actions.payload;
    },
    setLoading:function(state,actions){
        state.loading = actions.payload
    }
  },
});

export default SearchSlice.reducer;
export const { setResult, setQuery, setLoading } = SearchSlice.actions;