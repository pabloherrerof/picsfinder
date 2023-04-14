import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFotos = createAsyncThunk(
  "fotos/getFotos",
  async ({ searchItem }) => {
    //const page = 1;
    const keyAPI = "penUKyah2s8aSMNy9eqpUTIfPVtuswsBpC3JiidAWsc";
    //const keyAPI2 = "TLiN4Vr3TRvaarD2Ag7uqjd8NwfdLy3LSlKKRT9vaok";
    //const keyAPI3 = "TnHuw_ndnhkpTKiQVLh_BWOFS-3XHCE5lr7iphpktzM";
    const randomSearchUrl = `https://api.unsplash.com/photos/random?client_id=${keyAPI}&count=33`;
    const searchUrl = `https://api.unsplash.com/search/photos/?client_id=${keyAPI}&per_page=33&query=${searchItem}`;

    if (searchItem === "") {
      try {
        const response = await fetch(randomSearchUrl);
        const datos = await response.json();

        return datos;
      } catch (error) {
        throw error;
      }
    } else {
      try {
        const response = await fetch(searchUrl);
        const datos = await response.json();
        return datos;
      } catch (error) {
        throw error;
      }
    }
  }
);
