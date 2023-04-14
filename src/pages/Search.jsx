import { TopBar } from "../components/TopBar";
import { RingLoader } from "react-spinners";
import "./search.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFotos } from "../features/search/searchThunk";
import {
  getSearchData,
  getSearchStatus,
  getSearchItem,
} from "../features/search/searchSlice";
import { Footer } from "../components/Footer";
import { Card } from "../components/Card";
import { SearchBar } from "../components/SearchBar";

export const Search = () => {
  const dispatch = useDispatch();
  const searchStatus = useSelector(getSearchStatus);
  const searchData = useSelector(getSearchData);
  const searchItem = useSelector(getSearchItem);
  console.log("hola");

  useEffect(() => {
    if (searchStatus === "none") {
      dispatch(fetchFotos({ searchItem }));
    }
  }, [searchItem, dispatch, searchStatus]);

  let content;

  if (searchStatus === "loading") {
    content = (
      <>
        <div></div>
        <RingLoader color="#262323" size={100} speedMultiplier={0.8} />
        <div></div>
      </>
    );
  }
  if (searchStatus === "failed" || searchData.hasOwnProperty("errors")) {
    content = (
      <>
        <div></div>
        <div className="errorSearch">
          <i className="errorSearchIcon fa-solid fa-x fa-beat fa-2xl"></i>{" "}
          <h1>Something went wrong</h1>
          <p>Try again!</p>
        </div>
        <div></div>
      </>
    );
  } else if (searchStatus === "fulfilled") {
    if (searchItem === "") {
      if (searchData !== null) {
        content = [];
        let key = 0;
        searchData.forEach((object) => {
          let fotoIndividual = {};
          if (object.description !== null) {
            fotoIndividual = {
              id: object.id,
              image: object.urls.regular,
              likes: object.likes,
              width: object.width,
              height: object.height,
              download: object.urls.full,
              description: object.description,
            }; //id, description, width, height, likes, los urls full
          } else if(object.alt_description !==null) {
            fotoIndividual = {
              id: object.id,
              image: object.urls.regular,
              likes: object.likes,
              width: object.width,
              height: object.height,
              download: object.urls.full,
              description: object.alt_description,
            }; //id, description, width, height, likes, los urls full
          } else {
            fotoIndividual = {
              id: object.id,
              image: object.urls.regular,
              likes: object.likes,
              width: object.width,
              height: object.height,
              download: object.urls.full,
              description: "none",
            };
          }
          content.push(
            <div className="cardOnGallery" key={key}>
              <Card foto={fotoIndividual} page={"search"} />
            </div>
          );
          key++;
        });
      }
    } else if (searchItem !== "") {
      if (searchData !== null) {
        if (searchData.total === 0) {
          content = (
            <>
              <div></div>
              <div className="errorSearch">
                <i className="errorSearchIcon fa-solid fa-x fa-beat fa-2xl"></i>{" "}
                <h1>We couldn't find anything</h1>
                <p>Search something else!</p>
              </div>
              <div></div>
            </>
          );
        } else {
          content = [];

          let key = 0;
          searchData.results.forEach((object) => {
            let fotoIndividual = {};
            if (object.description !== null) {
              fotoIndividual = {
                id: object.id,
                image: object.urls.regular,
                likes: object.likes,
                width: object.width,
                height: object.height,
                download: object.urls.full,
                description: object.description,
              }; //id, description, width, height, likes, los urls full
            } else {
              fotoIndividual = {
                id: object.id,
                image: object.urls.regular,
                likes: object.likes,
                width: object.width,
                height: object.height,
                download: object.urls.full,
                description: object.alt_description,
              }; //id, description, width, height, likes, los urls full
            }
            content.push(
              <div className="cardOnGallery" key={key}>
                <Card foto={fotoIndividual} page={"search"} />
              </div>
            );
            key++;
          });
        }
      }
    }
  }

  return (
    <>
      <TopBar />
      <div className="searchPage">
        <SearchBar />

        <div id="fotosCollection" className="fotosCollection">
          {content}
        </div>

        <dialog id="favoriteModal">
          <div className="favoriteModalContainer">
            <i
              className="heartModal fa-regular fa-heart fa-lg fa-beat"
              style={{ paddingRight: "2%" }}
            ></i>
            <h6>Pic added to your favorites!</h6>
          </div>
        </dialog>

        <dialog id="unFavoriteModal">
          <div className="unFavoriteModalContainer">
            <i
              className="trashIcon fa-solid fa-trash-can fa-bounce"
              style={{ paddingRight: "2%" }}
            ></i>
            <h6>Pic deleted from your favorites!</h6>
          </div>
        </dialog>
      </div>

      <Footer />
    </>
  );
};
