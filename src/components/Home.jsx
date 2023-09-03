import React from "react";
import SortingTable from "../commonControls/SortingTable";
import "../App.css";
import AppSearch from "../commonControls/AppSearch";
import AppForm from "../commonControls/AppForm";
import { makeStyles } from "@mui/styles";
import AddNewUser from "./AddNewUser";

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
});

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <div className="App-header">
        <p className={classes.welcomeText}>Welcome to AzulArc</p>
      </div>
      <div className={classes.appTable}>
        <h2 className={classes.usersText}>Have a look at our Users</h2>
      </div>
      <AddNewUser />
      <AppSearch />
      <SortingTable />
      <AppForm />
    </>
  );
};

export default Home;
