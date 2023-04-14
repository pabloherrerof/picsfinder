import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./orderByMenu.css";
import { setOrderValue } from "../features/favorites/favoritesSlice";
import { useDispatch } from "react-redux";

export const OrderByMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const handleClickItem = (event) => {
    setAnchorEl(null);
    const orderValue = event.target.innerText;
    if (orderValue === "None") {
      dispatch(setOrderValue("none"));
    } else if (orderValue === "Likes") {
      dispatch(setOrderValue("likes"));
    } else if (orderValue === "Width") {
      dispatch(setOrderValue("width"));
    } else if (orderValue === "Height") {
      dispatch(setOrderValue("height"));
    } else if (orderValue === "Date") {
      dispatch(setOrderValue("date"));
    }
  };

  return (
    <div className="orderMenu">
      <Button
        style={{
          background: "#262323",
          borderRadius: "20px",
          fontFamily: "'Inter'",
          fontStyle: "normal",
          fontWeight: "400",
          fontSize: "14px",
          lineHeight: "29px",
          textAlign: "center",
          color: "#D9D9D9",
          width: "150px",
        }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Order by <i className="fa-solid fa-caret-down"></i>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        style={{ marginLeft: "14px" }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          className: "menuList",
        }}
      >
        <MenuItem className="menuItem" onClick={handleClickItem}>
          None
        </MenuItem>
        <MenuItem className="menuItem" onClick={handleClickItem}>
          Likes
        </MenuItem>
        <MenuItem className="menuItem" onClick={handleClickItem}>
          Width
        </MenuItem>
        <MenuItem className="menuItem" onClick={handleClickItem}>
          Height
        </MenuItem>
        <MenuItem className="menuItem" onClick={handleClickItem}>
          Date
        </MenuItem>
      </Menu>
    </div>
  );
};
