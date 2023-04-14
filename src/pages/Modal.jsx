import { Card } from "../components/Card";
import { TopBar } from "../components/TopBar";
import { Footer } from "../components/Footer";
import { useSelector } from "react-redux";
import { getModalInfo } from "../features/favorites/favoritesSlice";

export const Modal = () => {
  const modalInfo = useSelector(getModalInfo);

  return (
    <>
      <TopBar />
      <div className="searchPage">
        <div id="infoModal" className="slit-in-vertical">
          <div className="card">
            <Card page="modal" foto={modalInfo} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
