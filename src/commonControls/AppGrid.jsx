import { Button, Grid, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import globalContext from "../context/globalContext";
import API from "../utils/axios";

const AppGrid = () => {
  const { inventoryData, setInventoryData, userData } =
    useContext(globalContext);
  const [editable, setEditable] = useState(null);

  const [formState, setFormState] = useState([]);

  const handleInputChange = ({ target }, index) => {
    const { id, value } = target;
    const temp = Array.from(formState);
    temp[index][id] = value;
    setFormState(temp);
  };

  useEffect(() => {
    if (inventoryData.length > 0) {
      setFormState(inventoryData);
    }
  }, [inventoryData]);

  async function getInventoryData() {
    const { data, status } = await API.get("/inventory");
    if (status === 200) setInventoryData(data);
  }

  useEffect(() => {
    getInventoryData();

    return () => {
      setInventoryData([]);
    };
  }, []);

  function handleEdit(index) {
    setEditable(index);
  }

  async function handleDone(index) {
    await API.put(`/inventory/${formState[index]._id}`, formState[index]);
    setEditable(null);
  }

  async function handleDelete(id) {
    const resp = await API.delete(`/inventory/${id}`);
    if (resp.status === 200) getInventoryData();
  }

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {formState.map((i, index) => {
        return (
          <>
            <Grid item xs={2.5} key={i._id}>
              <div>
                <TextField
                  id="inventoryName"
                  name="inventoryName"
                  label="Inventory Name"
                  size="small"
                  variant="filled"
                  color="secondary"
                  value={i.inventoryName}
                  onChange={(e) => handleInputChange(e, index)}
                  disabled={editable !== index}
                />
              </div>
            </Grid>
            <Grid item xs={2.5} key={i._id}>
              <div>
                <TextField
                  id="availableQty"
                  name="availableQty"
                  label="Available Qty"
                  size="small"
                  variant="filled"
                  color="secondary"
                  value={i.availableQty}
                  onChange={(e) => handleInputChange(e, index)}
                  disabled={editable !== index}
                />
              </div>
            </Grid>
            <Grid item xs={2.5} key={i._id}>
              <div>
                <TextField
                  id="createdBy"
                  name="createdBy"
                  label="Created By"
                  size="small"
                  variant="filled"
                  color="secondary"
                  value={`${i.createdBy.firstName} ${i.createdBy.lastName}`}
                  disabled={true}
                />
              </div>
            </Grid>
            <Grid item xs={2.5} key={i._id}>
              <div>
                <TextField
                  id="role"
                  name="role"
                  label="Role"
                  size="small"
                  variant="filled"
                  color="secondary"
                  value={i.createdBy.role}
                  disabled={true}
                />
              </div>
            </Grid>
            {userData.role === "manager" && (
              <Grid item xs={2} key={i._id || "editZone"}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {editable === index ? (
                    <Button
                      variant="contained"
                      onClick={() => handleDone(index)}
                    >
                      Done
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleEdit(index);
                      }}
                    >
                      Edit
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={() => handleDelete(i._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Grid>
            )}
          </>
        );
      })}
    </Grid>
  );
};

export default AppGrid;
