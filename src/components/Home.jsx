import React, { useContext, useEffect } from "react";
import "../App.css";
import { makeStyles } from "@mui/styles";
import AddInventory from "./AddInventory";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import globalContext from "../context/globalContext";
import AppGrid from "../commonControls/AppGrid";
import API from "../utils/axios";

const useStyles = makeStyles({
  alignUserDetails: {
    display: "flex",
    flexDirection: "column",
  },
  appTable: {
    margin: "50px 100px",
    // height: "73vh",
  },
  imageP: {
    overflow: "hidden",
    height: "inherit",
    maxHeight: "fit-content",
  },
  loginButton: {
    flexGrow: 0.3,
  },
  profilePic: {
    height: "inherit",
    width: "inherit",
    objectFit: "contain",
  },
  usersText: {
    textAlign: "center",
  },
  welcomeText: {
    flexGrow: 2,
    textAlign: "center",
  },
  buttons: {
    color: "#282c34 !important",
    backgroundColor: "white !important",
    width: "10vw",
    borderRadius: "5px",
    padding: "10px 0",
    margin: "0 10px 0 0 !important",
  },
  gridContainer: {
    margin: "5% 10%",
    outline: "solid black 3px",
    padding: "20px",
    // margin: "20px 0 50px 0",
  },
});

const Home = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(globalContext);

  const token = sessionStorage.getItem("token");

  async function getUserData(id) {
    const { status, data } = await API.get(`/users/${id}`);
    if (status === 200) {
      const { email, firstName, lastName, role, _id } = data.users;
      setUserData({
        email,
        firstName,
        lastName,
        role,
        _id,
      });
    }
  }

  useEffect(() => {
    if (!userData._id) {
      const id = sessionStorage.getItem("_id");
      id && getUserData(id);
    }
  }, [userData?._id]);

  return (
    <>
      <div className="App-header">
        <div>
          <p className={classes.welcomeText}>Welcome to the Inventory App</p>
          {userData.firstName && (
            <p className={classes.welcomeText}>
              {`Hii ${userData.firstName} ${userData.lastName}`}
            </p>
          )}
        </div>
        {!token ? (
          <div>
            <Button
              className={classes.buttons}
              onClick={() =>
                navigate("/login", {
                  state: {
                    type: "Login",
                  },
                })
              }
            >
              Login
            </Button>
            <Button
              className={classes.buttons}
              onClick={() =>
                navigate("/login", {
                  state: {
                    type: "Register",
                  },
                })
              }
            >
              Register
            </Button>
          </div>
        ) : (
          <Button
            className={classes.buttons}
            onClick={() => {
              sessionStorage.clear();
              window.location.reload();
            }}
          >
            Logout
          </Button>
        )}
      </div>
      <div className={classes.appTable}>
        <h2 className={classes.usersText}>Have a look at our Inventory.</h2>
      </div>
      {token && (
        <>
          {userData.role === "manager" && <AddInventory />}
          <div className={classes.gridContainer}>
            <AppGrid />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
