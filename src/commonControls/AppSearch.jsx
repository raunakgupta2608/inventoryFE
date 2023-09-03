import React, { useContext, useState } from "react";
import { Box, Toolbar, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AppButton from "./AppButton";
import globalContext from "../context/globalContext";
import API from "../utils/axios";

const useStyle = makeStyles({
  toolbar: {
    float: "right",
  },
  button: {
    margin: "0 10px",
  },
});

function AppSearch() {
  const classes = useStyle();
  const [searchValue, setSearchValue] = useState("");
  const { globalData, setGlobalData } = useContext(globalContext);

  const handleChange = ({ target }) => {
    setSearchValue(target.value);
  };

  async function getUsers() {
    try {
      const resp = await API.get("/users");
      if (resp.status === 200) setGlobalData(resp.data);
    } catch (error) {}
  }

  const handleClick = () => {
    if (searchValue !== "") {
      const res = globalData.filter((ele) => ele.name.includes(searchValue));
      if (res.length > 0) setGlobalData(res);
    } else getUsers();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar className={classes.toolbar}>
        <TextField
          id="filled-basic"
          label="Filter Names"
          size="small"
          variant="filled"
          color="secondary"
          value={searchValue}
          onChange={handleChange}
        />
        <Box sx={{ flexGrow: 1 }} className={classes.button}>
          <AppButton onClick={handleClick} size="large">
            Filter Names
          </AppButton>
        </Box>
      </Toolbar>
    </Box>
  );
}

export default AppSearch;
