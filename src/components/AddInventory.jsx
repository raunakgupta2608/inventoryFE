import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import AppButton from "../commonControls/AppButton";
import Loader from "../commonControls/Loader";
import API from "../utils/axios";
import globalContext from "../context/globalContext";

const useStyles = makeStyles({
  form: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 0px 50px 0",
    width: "100%",
  },
  divContainer: {
    display: "flex",
    justifyContent: "flex-end",
    flexBasis: "max-content",

    "& .MuiFormControl-root": {
      margin: "0 10px",
    },
  },
});

function AddInventory() {
  const classes = useStyles();
  const [formState, setFormState] = useState({
    inventoryName: "",
    availableQty: 0,
  });
  const [loading, setLoading] = useState(false);
  const { userData, setInventoryData } = useContext(globalContext);

  const handleAddInventory = async () => {
    try {
      setLoading(true);
      const { status } = await API.post("/inventory/addInventory", {
        ...formState,
        email: userData.email,
      });
      if (status === 201) {
        setFormState({
          inventoryName: "",
          availableQty: 0,
        });
        await getInventoryDetails();
      }
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  async function getInventoryDetails() {
    setLoading(true);
    try {
      const resp = await API.get("/inventory");
      if (resp.status === 200) {
        setInventoryData(resp.data);
      }

      setLoading(false);
    } catch (error) {}
  }

  const handleInputChange = ({ target }) => {
    const { id, value } = target;
    setFormState({ ...formState, [id]: value });
  };

  return (
    <>
      <Loader open={loading} />
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        className={classes.form}
      >
        <Box component="div" className={classes.divContainer}>
          <TextField
            id="inventoryName"
            label="Inventory Name"
            size="small"
            variant="filled"
            color="secondary"
            value={formState.inventoryName}
            onChange={handleInputChange}
          />
          <TextField
            id="availableQty"
            label="Available Qty"
            size="small"
            variant="filled"
            color="secondary"
            value={formState.availableQty}
            onChange={handleInputChange}
          />
        </Box>
        <Box component="div" className={classes.divContainer}>
          <AppButton onClick={handleAddInventory} style={{ margin: "0 10px" }}>
            Add Inventory
          </AppButton>
        </Box>
      </Box>
    </>
  );
}

export default AddInventory;
