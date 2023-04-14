import { createSlice } from "@reduxjs/toolkit";
import { readFotoLocalStorage } from "../localStorage/localStorage";

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    searchDescriptionValue: "",
    orderValue: "none",
    fotoInfo: [],
    favoriteFotos: readFotoLocalStorage(),
  },
  reducers: {
    setFavoriteFotos: (state, action) => {
      state.favoriteFotos = action.payload;
    },
    setOrderValue: (state, action) => {
      state.orderValue = action.payload;
    },
    setSearchDescription: (state, action) => {
      state.searchDescriptionValue = action.payload;
    },
    deleteSearchDescription: (state, action) => {
      state.searchDescriptionValue = "";
    },
    setModalInfo: (state, action) => {
      const fotosFavoritas = readFotoLocalStorage();
      const fotoEnLocal = fotosFavoritas.filter(
        (obj) => obj.id === action.payload.id
      );
      state.fotoInfo = fotoEnLocal[0];
    },
  },
});

export const getOrderValue = (state) => state.favorites.orderValue;
export const getSearchDescriptionValue = (state) =>
  state.favorites.searchDescriptionValue;
export const getModalInfo = (state) => state.favorites.fotoInfo;
export const getFavorites = (state) => state.favorites.favoriteFotos;

export const {
  setOrderValue,
  setSearchDescription,
  deleteSearchDescription,
  setModalInfo,
  setFavoriteFotos,
} = favoritesSlice.actions;
export default favoritesSlice.reducer;
