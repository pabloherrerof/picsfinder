import {
  checkIfExistsFoto,
  createFotoLocalStorage,
  deleteFotoLocalStorage,
  updateItemDescriptionLocalStorage,
} from "../features/localStorage/localStorage";
import {
  getModalInfo,
  setModalInfo,
} from "../features/favorites/favoritesSlice";
import "./card.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../pages/modal.css";
import { saveAs } from "file-saver";
import { useState } from "react";

//Componente that creates a Card with a background image
export const Card = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editDescription, setEditDescription] = useState(false);

  const onHeartClickHandler = (e) => {
    const foto = props.foto;
    const heart = e.target;
    if (heart.classList.contains("fa-regular")) {
      const date = new Date();

      foto.date = date.toDateString();
      createFotoLocalStorage(foto);
      heart.classList.remove("fa-regular");
      heart.classList.add("fa-solid");
      document.getElementById("favoriteModal").showModal();

      setTimeout(() => {
        document.getElementById("favoriteModal").close();
      }, 1000);
    } else {
      deleteFotoLocalStorage({ foto });
      heart.classList.remove("fa-solid");
      heart.classList.add("fa-regular");
      document.getElementById("unFavoriteModal").showModal();

      setTimeout(() => {
        document.getElementById("unFavoriteModal").close();
      }, 1000);
    }
  };

  const onTrashClickHandler = (e) => {
    const foto = props.foto;
    deleteFotoLocalStorage({ foto });

    document.getElementById("deleteModal").showModal();
    

    setTimeout(() => {
      document.getElementById("deleteModal").close();
      window.location.reload();
    }, 1000);
  };

  const onDownloadClickHandler = (e) => {
    //document.getElementById("downloadModal").showModal();
    console.log(props.foto);
    saveAs(props.foto.download, `image_${props.foto.id}.jpg`);
    setTimeout(() => {
      document.getElementById("downloadModal").close();
    }, 1000);
  };

  const onInfoClickHandler = (e) => {
    const foto = props.foto;
    console.log(foto);
    dispatch(setModalInfo(foto));
    navigate("image-info");
  };

  const closeModalHandler = () => {
    navigate("/myfavorites");
  };

  const editHandler = (e) => {
    const value = e.target.previousSibling.innerText;
    setEditDescription(true);

    /* document.getElementById("descriptionValue").remove()
    console.log(value);

   
  
    e.target.remove()  */
  };

  const saveDescriptionHandler = () => {
    const value = document.getElementById("descriptionValue").innerText;
    updateItemDescriptionLocalStorage(props.foto, value);
    dispatch(setModalInfo(props.foto));
    setEditDescription(false);
  };

  if (props.page === "home") {
    return (
      <div className="card-container">
        <div className="card-frame ">
          <div
            className="card-image"
            id="home-card"
            style={{
              backgroundImage: props.background,
              backgroundSize: "cover",
            }}
          ></div>
        </div>
      </div>
    );
  }

  if (props.page === "search") {
    const picture = {
      image: `url(${props.foto.image})`,
      id: props.foto.id,
      likes: props.foto.likes,
      width: props.foto.width,
      height: props.foto.height,
      download: props.foto.download,
      description: props.foto.description,
    };
    if (checkIfExistsFoto(picture)) {
      return (
        <div className="card-container">
          <div className="card-frame-gallery fade-in">
            <div
              className="card-image fade-in"
              style={{
                backgroundImage: picture.image,
                backgroundSize: "cover",
              }}
            ></div>
            <i
              className=" heart fa-solid fa-heart fa-xl"
              style={{ paddingRight: "2%" }}
              onClick={onHeartClickHandler}
            ></i>
          </div>
        </div>
      );
    } else {
      return (
        <div className="card-container">
          <div className="card-frame-gallery fade-in">
            <div
              className="card-image fade-in"
              style={{
                backgroundImage: picture.image,
                backgroundSize: "cover",
              }}
            ></div>
            <i
              className=" heart fa-regular fa-heart fa-xl"
              style={{ paddingRight: "2%" }}
              onClick={onHeartClickHandler}
            ></i>
          </div>
        </div>
      );
    }
  }
  if (props.page === "favorites") {
    const picture = {
      image: `url(${props.foto.image})`,
      id: props.foto.id,
      likes: props.foto.likes,
      width: props.foto.width,
      height: props.foto.height,
      download: props.foto.download,
      description: props.foto.description,
    };
    return (
      <div className="card-container">
        <div className="card-frame-gallery fade-in">
          <div
            className="card-image fade-in"
            style={{ backgroundImage: picture.image, backgroundSize: "cover" }}
          ></div>
          <div className="icons">
            <i
              className=" favoriteCardIcon fa-solid fa-download fa-lg"
              style={{ paddingRight: "15px" }}
              onClick={onDownloadClickHandler}
            ></i>
            <div className="rightIcons">
              <i
                className=" favoriteCardIcon fa-solid fa-trash fa-lg"
                style={{ paddingRight: "15px" }}
                onClick={onTrashClickHandler}
              ></i>

              <i
                className="favoriteCardIcon fa-solid fa-circle-info fa-lg"
                style={{ paddingRight: "15px" }}
                onClick={onInfoClickHandler}
              ></i>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (props.page === "modal") {
    console.log(editDescription)
    if (editDescription === false) {
      const picture = {
        image: `url(${props.foto.image})`,
        id: props.foto.id,
        likes: props.foto.likes,
        width: props.foto.width,
        height: props.foto.height,
        download: props.foto.download,
        description: props.foto.description,
        date: props.foto.date,
      };
      return (
        <div className="card-container">
          <div className="cardModalFrame">
            <div className="closeInfoModal ">
              <i className="fa-solid fa-x fa-lg" onClick={closeModalHandler}>
                {" "}
              </i>
            </div>
            <div className="info">
              <div className="descriptionContainer">
                <h6 className="infoTitle">Description:</h6>
                <div className="descriptionField">
                  <div id="descriptionValue" className="descriptionValue">
                    <p className="infoValue">
                      {picture.description}
                    </p>
                  </div>

                  <i
                    class="fa-solid fa-pen-to-square  editIcon"
                    onClick={editHandler}
                  ></i>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="column">
                    <h6 className="infoTitle">Likes:</h6>
                    <div className="field">
                      <p className="infoValue">{picture.likes}</p>
                    </div>
                  </div>

                  <div className="column">
                    <h6 className="infoTitle">Saved On:</h6>
                    <div className="field">
                      <p className="infoValue">{picture.date}</p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="column">
                    <h6 className="infoTitle">Width:</h6>
                    <div className="field">
                      <p className="infoValue">{picture.width}</p>
                    </div>
                  </div>

                  <div className="column">
                    <h6 className="infoTitle">Height:</h6>
                    <div className="field">
                      <p className="infoValue">{picture.height}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="saveContainer"></div>
          </div>
        </div>
      );
    } else {
      const picture = {
        image: `url(${props.foto.image})`,
        id: props.foto.id,
        likes: props.foto.likes,
        width: props.foto.width,
        height: props.foto.height,
        download: props.foto.download,
        description: props.foto.description,
        date: props.foto.date,
      };
      return (
        <div className="card-container">
          <div className="cardModalFrame">
            <div className="closeInfoModal ">
              <i className="fa-solid fa-x fa-lg" onClick={closeModalHandler}>
                {" "}
              </i>
            </div>
            <div className="info">
              <div className="descriptionContainer">
                <h6 className="infoTitle">Description:</h6>
                <div className="descriptionField">
                  <div id="descriptionValue" className="descriptionValue infoValue" contentEditable={true}>
                  
                      {picture.description}
                  
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="column">
                    <h6 className="infoTitle">Likes:</h6>
                    <div className="field">
                      <p className="infoValue">{picture.likes}</p>
                    </div>
                  </div>

                  <div className="column">
                    <h6 className="infoTitle">Saved On:</h6>
                    <div className="field">
                      <p className="infoValue">{picture.date}</p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="column">
                    <h6 className="infoTitle">Width:</h6>
                    <div className="field">
                      <p className="infoValue">{picture.width}</p>
                    </div>
                  </div>

                  <div className="column">
                    <h6 className="infoTitle">Height:</h6>
                    <div className="field">
                      <p className="infoValue">{picture.height}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="saveContainer">
              <button id="saveButton" onClick={saveDescriptionHandler}>
                SAVE
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
};

//fa-solid da a el corazon el fondo
