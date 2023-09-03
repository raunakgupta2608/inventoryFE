import React, { useState } from "react";
import GlobalContext from "./globalContext";

const GlobalState = (props) => {
  const [globalData, setGlobalData] = useState([
    {
      name: "",
      email: "",
      dob: "",
      address: "",
      photo: "",
      id: "",
    },
  ]);

  const [selectedUser, setSelectedUser] = useState({
    name: "",
    email: "",
    dob: "",
    address: "",
    photo: "",
    id: "",
  });

  return (
    <GlobalContext.Provider
      value={{ globalData, setGlobalData, selectedUser, setSelectedUser }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
