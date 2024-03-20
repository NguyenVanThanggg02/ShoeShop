import { Avatar, Menu, MenuItem } from "@mui/material";
import { Button } from "primereact/button";
import { MegaMenu } from "primereact/megamenu";
import { Ripple } from "primereact/ripple";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { listToast } from "../constants";
import { setToast } from "../redux/features";
import Profile from "../screens/auth/Profile";
import CartShop from "../screens/Cart_Shop";

export default function MenuBar() {
  const navigate = useNavigate();
  const [visibledDialog, setVisibledDialog] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const itemRenderer = (item, options) => {
    if (item.root) {
      return (
        <Link
          to={item.route}
          className="flex align-items-center cursor-pointer px-3 py-2 overflow-hidden relative font-semibold text-lg uppercase p-ripple hover:surface-ground"
          style={{ borderRadius: "2rem" }}
        >
          <span className={item.icon} />
          <span className="ml-2">{item.label}</span>
          <Ripple />
        </Link>
      );
    } else if (!item.image) {
      return (
        <a
          className="flex align-items-center p-3 cursor-pointer mb-2 gap-2 "
          onClick={options.onClick}
          href="##"
        >
          <span className="inline-flex align-items-center justify-content-center border-circle bg-primary w-3rem h-3rem">
            <i className={`${item.icon} text-lg`}></i>
          </span>
          <span className="inline-flex flex-column gap-1">
            <span className="font-medium text-lg text-900">{item.label}</span>
            <span className="white-space-nowrap">{item.subtext}</span>
          </span>
        </a>
      );
    } else {
      return (
        <div
          className="flex flex-column align-items-start gap-3"
          onClick={options.onClick}
        >
          <img alt="megamenu-demo" src={item.image} className="w-full" />
          <span>{item.subtext}</span>
          <Button
            className="p-button p-component p-button-outlined"
            label={item.label}
          />
        </div>
      );
    }
  };
  const user = JSON.parse(localStorage.getItem("user"));
  const items = [
    {
      label: "Home",
      root: true,
      route: "/",
      template: itemRenderer,
    },
    {
      label: "List Products",
      root: true,
      route: "/listproduct",
      template: itemRenderer,
    },
    {
      label: "Blog",
      root: true,
      route: "/blog",
      template: itemRenderer,
    },
    {
      label: "Contact",
      root: true,
      route: "/contact",
      template: itemRenderer,
    },
  ];
  if (user && user.role === 1) {
    const newItem = {
      label: "Dashboard",
      root: true,
      route: "/dashboard",
      template: itemRenderer,
    };

    items.push(newItem);
  }
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const end = (props) => {

    const { } = props;

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleLogout = () => {
      localStorage.removeItem("user");
      navigate("/");
      dispatch(
        setToast({ ...listToast[0], detail: "Log out successfully!" })
      );
    };
    const handleLogin = () => {
      navigate("/login");
    };
    const handleRegister = () => {
      navigate("/register");
    };
    const handleShowProfile = () => {
      setVisible(true);
      setAnchorEl(null);
    };
    const handleShowCart = () => {
      setVisibledDialog(true);
      setAnchorEl(null);
    };
    return (
      <>
        {user ? (
          <>
            <Avatar
              className="avatar"
              src="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
              shape="circle"
              onClick={handleClick}
              // src={userInfo.avatar || '/assets/img/profile.png'}
              alt="Ảnh đại diện"
              height="32px"
              width="32px"
              style={{ borderRadius: "50%" }}
            />
            <Menu
              style={{ marginTop: "0.5rem" }}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              disableScrollLock={true}
            >
              <MenuItem className="m-2" onClick={handleShowProfile}>
                <div style={{ minWidth: "12rem", lineHeight: "32px" }}>
                  <i
                    className="pi pi-info-circle"
                    style={{ fontSize: "16px", marginRight: "16px" }}
                  />
                  Profile
                </div>
              </MenuItem>
              <MenuItem className="m-2" onClick={handleShowCart}>
                <div style={{ minWidth: "12rem", lineHeight: "32px" }}>
                  <i
                    className="pi pi-shopping-cart"
                    style={{ fontSize: "16px", marginRight: "16px" }}
                  />
                  My Order
                </div>
              </MenuItem>

              <MenuItem
                className="m-2"
                component={Link}
                to="/auth/change_password"
              >
                <div style={{ minWidth: "12rem", lineHeight: "32px" }}>
                  <i
                    className="pi pi-sync"
                    style={{ fontSize: "16px", marginRight: "16px" }}
                  />
                  Change Password
                </div>
              </MenuItem>
              <MenuItem className="m-2" onClick={handleLogout}>
                <div style={{ minWidth: "12rem", lineHeight: "32px" }}>
                  <i
                    className="pi pi-sign-out"
                    style={{ fontSize: "16px", marginRight: "16px" }}
                    onClick={handleLogout}
                  />
                  Logout
                </div>
              </MenuItem>
            </Menu>
            {visibledDialog === true && (
              <CartShop visible={visibledDialog} setVisible={setVisibledDialog} />
            )}
            {visible === true && (
              <Profile visible={visible} setVisible={setVisible} />
            )}
          </>
        ) : (
          <div className="mr-4 text-xl">
            <span
              className="login-link"
              style={{ cursor: "pointer", textDecoration: "none" }}
              onClick={handleLogin}
            >
              Login
            </span>{" "}
            |{" "}
            <span
              className="login-link"
              style={{ cursor: "pointer", textDecoration: "none" }}
              onClick={handleRegister}
            >
              Register
            </span>
          </div>
        )}
      </>
    );
  };

  return (
    <div>
      <MegaMenu
        model={items}
        orientation="horizontal"
        end={end}
        breakpoint="960px"
        style={{ borderRadius: "3rem" }}
      />
    </div>
  );
}
