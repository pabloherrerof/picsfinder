import React from "react";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { HomePage } from "./pages/HomePage";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { MyFavorites } from "./pages/MyFavorites";
import { Search } from "./pages/Search";
import { Modal } from "./pages/Modal";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/myfavorites" element={<MyFavorites />} />
          <Route path="/search" element={<Search />} />
          <Route path="/myfavorites/image-info" element={<Modal />} />
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
