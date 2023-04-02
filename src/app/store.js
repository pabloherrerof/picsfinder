import { configureStore } from "@reduxjs/toolkit";
import { searchSlice } from "../features/search/searchSlice";
import {favoritesSlice} from "../features/favorites/favoritesSlice";

export const store = configureStore({
    reducer:{
       search: searchSlice.reducer,
       favorites: favoritesSlice.reducer
    }  
});
