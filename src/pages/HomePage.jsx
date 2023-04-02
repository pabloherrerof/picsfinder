import { TopBar } from "../components/TopBar";
import { Footer } from "../components/Footer";
import "./home.css";
import { Link } from "react-router-dom";
import { Slider } from "../components/Slider";



export const HomePage = () => {
  return (
    <>
      <TopBar />
      <div className="homePage">
        <div className="card">
          <Slider/>
        </div>
        <div className="homeText">
          <h1>ALL THE PICTURES YOU NEED AT JUST ONE CLICK</h1>
          <p>
            Search among our almost 5 million photos library of our creators from all over the world. Save them in your
            favorites and download them for personal and comercial use. <br></br> 
          </p>
          <Link
              to="/search"
              style={{
                textDecoration:'none'
              }}
            >
              <button className="search-button">
            <i className="fa-solid fa-magnifying-glass fa-xs"></i>
              SEARCH
          </button> </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};


