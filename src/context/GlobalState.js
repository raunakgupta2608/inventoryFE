import React, { useState } from "react";
import GlobalContext from "./globalContext";

const GlobalState = (props) => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    _id: "",
  });

  const [inventoryData, setInventoryData] = useState([]);

  return (
    <GlobalContext.Provider
      value={{ userData, setUserData, inventoryData, setInventoryData }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
