import { Footer } from "../components/Footer";
import { TopBar } from "../components/TopBar";
import { Card } from "../components/Card";
import "./home.css";
import "./myfavs.css";
import { Link } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { OrderByMenu } from "../components/OrderByMenu";
import {
  getFavorites,
  getOrderValue,
  getSearchDescriptionValue, 
} from "../features/favorites/favoritesSlice";
import { useSelector } from "react-redux";
import './home.css'




export const MyFavorites = () => {
  const searchDescriptionValue = useSelector(getSearchDescriptionValue);
  const orderByValue = useSelector(getOrderValue);
  const favoritas = useSelector(getFavorites);

 





 

  //location reload
  

  const orderFotos = (orderValue, array) => {
     return array.sort(function (a, b) {
      return b[orderValue] - a[orderValue];
    });
  }; 

  const searchFotosByDescription = (searchItem) => {
    return favoritas.filter((obj) => obj.description.includes(searchItem) > 0); 
  };

  

  let content;
  if (favoritas.length > 0) {
    const searchedFavoritas = searchFotosByDescription(searchDescriptionValue);

    if (searchedFavoritas.length === 0) {
      content = (
        <>
          <div></div>
          <div className="errorSearch">
            <i className="myFavCryIcon fa-regular fa-face-sad-cry fa-spin fa-spin-reverse fa-2xl"></i>

            <h1>0 pictures found</h1>
            <p>Try with another description!</p>
          </div>
          <div></div>
        </>
      );
    } else {    
      content = [];
      let key = 0;
      orderFotos(orderByValue, searchedFavoritas)
      searchedFavoritas.forEach((object) => {
       //id, description, width, height, likes, los urls full
        content.push(
          <div key={key} className="cardOnGallery">
            <Card foto={object} page={"favorites"} />
          </div>
        );
        key++;
      });
    }
  } else {
    content = (
      <>
        <div></div>
        <div className="errorSearch">
          <i className="myFavCryIcon fa-regular fa-face-sad-cry fa-spin fa-spin-reverse fa-2xl"></i>

          <h1>No favorite pics yet </h1>
          <p>Start searching!</p>
          <Link
            to="/search"
            style={{
              textDecoration: "none",
            }}
          >
            <button className="myFavsButton">
              <i className="myFavsSearchIcon fa-solid fa-magnifying-glass fa-xs"></i>
              SEARCH
            </button>{" "}
          </Link>
        </div>
        <div></div>
      </>
    );
  }




  return (
    <>
      <TopBar />
      <div className="searchPage">
        <div className="myFavoritesOptions">
          <SearchBar page="myFavs" /> <OrderByMenu />
        </div>

        <div id="fotosCollection" className="fotosCollection">
          {content}
        </div>

        <dialog id="downloadModal">
          <div className="downloadModalContainer">
          <i className=" fa-solid fa-download fa-lg fa-beat"  style={{ paddingRight: "15px" }}> </i>
            <h6>Pic download succesfully!</h6>
          </div>
        </dialog>

        <dialog id="deleteModal">
          <div className="deleteModalContainer">
            <i
              className="fa-solid fa-trash-can fa-bounce"
              style={{ paddingRight: "15px" }}
            ></i>
            <h6>Pic deleted from your favorites!</h6>
          </div>
        </dialog>
      </div>

      <Footer />
    </>
  );
};