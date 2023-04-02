import { createSlice } from "@reduxjs/toolkit";
import { fetchFotos } from "./searchThunk";


export const searchSlice = createSlice({
    name: 'fotos',
    initialState: {
        searchedItem:"",
        status: "none",
        data: [],
    },
    reducers:{
      setSearchItem(state, action){
        state.searchedItem =  action.payload;
      },
      deleteStore(state, action){
        state.searchedItem = "";
        state.status = "none";
        state.data = [];
      }
    },
    extraReducers(builder) {
        builder
          .addCase(fetchFotos.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.data = action.payload;
          })
          .addCase(fetchFotos.rejected, (state, action) => {
            state.status = "failed";
          })
          .addCase(fetchFotos.pending, (state, action) => {
            state.status = "loading";
          });
      },
}
)

export const getSearchItem = (state) => state.search.searchedItem
export const getSearchStatus = (state) => state.search.status;
export const getSearchData = (state) => state.search.data;

export const {setSearchItem, deleteStore} = searchSlice.actions;
export default searchSlice.reducer;

