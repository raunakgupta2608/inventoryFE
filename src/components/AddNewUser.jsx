import React, { useContext, useEffect, useState } from "react";
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

function AddNewUser() {
  const classes = useStyles();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    dob: "",
    address: "",
    photo: "",
  });
  const [open, setOpen] = useState(false);
  const [dataUploaded, setDataUploaded] = useState(false);
  const { setGlobalData } = useContext(globalContext);

  const handleAddUser = async () => {
    if (dataUploaded) {
      try {
        setOpen(true);
        const resp = await API.post("/users", formState);
        if (resp.status === 201) {
          setFormState({
            name: "",
            email: "",
            dob: "",
            address: "",
            photo: "",
          });
          await getUsers();
        }
        setOpen(false);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  async function getUsers() {
    setOpen(true);
    try {
      const resp = await API.get("/users");
      if (resp.status === 200) setGlobalData(resp.data);

      setOpen(false);
    } catch (error) {}
  }

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  useEffect(() => {
    setDataUploaded(true);
  }, [formState.photo]);

  async function handlePhotoUpload(e) {
    setDataUploaded(false);
    const base64 = await convertToBase64(e.target.files[0]);
    setFormState({ ...formState, photo: base64 });
  }

  const handleInputChange = ({ target }) => {
    const { id, value } = target;
    setFormState({ ...formState, [id]: value });
  };

  return (
    <>
      <Loader open={open} />
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
            id="name"
            label="Name"
            size="small"
            variant="filled"
            color="secondary"
            value={formState.name}
            onChange={handleInputChange}
          />
          <TextField
            id="email"
            label="Email"
            size="small"
            variant="filled"
            color="secondary"
            value={formState.email}
            onChange={handleInputChange}
          />
          <TextField
            id="dob"
            label="DOB"
            size="small"
            variant="filled"
            color="secondary"
            value={formState.dob}
            onChange={handleInputChange}
          />
          <TextField
            id="address"
            label="Address"
            size="small"
            variant="filled"
            color="secondary"
            value={formState.address}
            onChange={handleInputChange}
          />
          <input
            type="file"
            label="Photo"
            name="photo"
            id="photo"
            accept=".jpeg, .png, .jpg"
            onChange={(e) => handlePhotoUpload(e)}
          />
        </Box>
        <Box component="div" className={classes.divContainer}>
          <AppButton onClick={handleAddUser} style={{ margin: "0 10px" }}>
            Add
          </AppButton>
        </Box>
      </Box>
    </>
  );
}

export default AddNewUser;
