import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import AppButton from "../commonControls/AppButton";
import Loader from "../commonControls/Loader";
import API from "../utils/axios";
import { useLocation, useNavigate } from "react-router-dom";
import AppRadio from "../commonControls/AppRadio";
import globalContext from "../context/globalContext";

const useStyles = makeStyles({
  parentContainer: {
    margin: "50px",
    outline: "solid 1px black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "ghostwhite",
  },
  form: {
    padding: "20px 0px 50px 0",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  divContainer: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
    alignItems: "baseline",
    flexBasis: "max-content",
    "& .MuiFormControl-root": {
      margin: "10px",
    },
  },
});

function LoginAndRegister() {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const { setUserData } = useContext(globalContext);
  const type = location?.state?.type;
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "",
  });

  function validateForm() {
    const tempError = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      role: "",
    };
    let isValid = true;
    const { email, password, firstName, lastName, role } = formState;

    if (type === "Register") {
      if (!firstName) {
        tempError.firstName = "FirstName is required.";
        isValid = false;
      }
      if (!lastName) {
        tempError.lastName = "LastName is required.";
        isValid = false;
      }
      if (!role) {
        tempError.role = "Role is required.";
        isValid = false;
      }
    }
    if (!email) {
      tempError.email = "Email is required.";
      isValid = false;
    }
    if (!password) {
      tempError.password = "Password is required.";
      isValid = false;
    }
    setError(tempError);
    return isValid;
  }

  const handleApi = async () => {
    if (validateForm()) {
      setLoading(true);

      try {
        const { data, status } =
          type === "Register"
            ? await API.post(`/auth/signup`, formState)
            : await API.post(`/auth/login`, {
                email: formState.email,
                password: formState.password,
              });
        if (status === 200 || status === 201) {
          const { email, firstName, lastName, role, token, _id } = data;
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("_id", _id);
          setUserData({
            email,
            firstName,
            lastName,
            role,
            _id,
          });
          navigate("/", { replace: true });
        }
      } catch (error) {
        console.log("Checking error", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <>
      <Loader open={loading} />
      <div className={classes.parentContainer}>
        <p>Please enter your details.</p>
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
              id="email"
              name="email"
              label="Email"
              size="small"
              variant="filled"
              color="secondary"
              value={formState.email}
              onChange={handleInputChange}
              error={Boolean(error.email)}
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              size="small"
              variant="filled"
              color="secondary"
              value={formState.password}
              onChange={handleInputChange}
              error={Boolean(error.password)}
              type="password"
            />
            {type === "Register" && (
              <>
                <TextField
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  size="small"
                  variant="filled"
                  color="secondary"
                  value={formState.firstName}
                  onChange={handleInputChange}
                  error={Boolean(error.firstName)}
                />
                <TextField
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  size="small"
                  variant="filled"
                  color="secondary"
                  value={formState.lastName}
                  onChange={handleInputChange}
                  error={Boolean(error.lastName)}
                />
                <AppRadio
                  column={false}
                  id="role"
                  name="role"
                  row={true}
                  value={formState.role}
                  onChange={handleInputChange}
                  textContent="Register as:"
                  error={Boolean(error.role)}
                  options={[
                    {
                      value: "manager",
                      label: "Manager",
                    },
                    {
                      value: "assistant",
                      label: "Assistant",
                    },
                  ]}
                />
              </>
            )}
          </Box>
          <Box component="div" className={classes.divContainer}>
            <AppButton onClick={() => handleApi()} style={{ margin: "0 10px" }}>
              {type}
            </AppButton>
          </Box>
        </Box>
      </div>
    </>
  );
}

export default LoginAndRegister;
