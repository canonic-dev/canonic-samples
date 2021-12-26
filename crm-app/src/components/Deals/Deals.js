import { useQuery, useMutation } from "@apollo/client";
import { GET_DEALS } from "../../gql/query";
import {
  Box,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ADD_DEAL } from "../../gql/mutation";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
const Deals = ({ userId }) => {
  const { data } = useQuery(GET_DEALS); //Getting all the deal stored in database and store it in data variable
  const [deals, setDeals] = useState(); // Will be using this to store the deal that exists in data variable
  const [addADeal, setAddADeal] = useState(false); // This state is used to show/hide deals form.
  const [addedDealStatus, setAddedDealStatus] = useState(false); // This state is used for handling enable/disable logic to the add button
  const [addDeal] = useMutation(ADD_DEAL); // Calling the mutation to append user ID to deals array.
  const [selectorValue, setSelectorValue] = useState(); // This state will store the value in selector.

  useEffect(() => {
    data && setDeals(data); //Populate the deals state whenever data variable changes.
  }, [data]);

  const handleAdd = () => {
    // This is a onclick handler placed at 'Save' button
    let dealId = selectorValue.deals.map((deal) => deal._id); // grabbing all the IDs from deals state.
    addDeal({
      variables: {
        _id: selectorValue._id,
        deals: [...dealId, userId], // Making sure all the older deal IDs are added along with new ID
      },
    });
    setAddedDealStatus(true); //Disable the 'Add' button if deal is added.
  };

  const handleClose = () => {
    // This onclick handler is placed 'Close' button
    setAddADeal(false); // This will reset the state thus hiding the the selector form.
    setAddedDealStatus(false); //This will removed disable state from the 'Save' button.
  };

  const handleChange = (event) => {
    //Using it to grab the current selector's value
    setSelectorValue(event.target.value);
    setAddedDealStatus(false);
  };
  return (
    <Box>
      {!addADeal && (
        <Button
          variant="outlined"
          color="success"
          onClick={() => setAddADeal(true)}
        >
          Add a deal
        </Button>
      )}
      {addADeal && (
        <Grid container>
          <Grid xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select a deal
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Select a deal"
                onChange={handleChange}
              >
                {deals?.deals?.map((deal) => (
                  <MenuItem value={deal}>
                    {deal.title} - ${deal.amount}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1rem",
            }}
            xs={12}
          >
            <Button
              startIcon={addedDealStatus ? <DoneIcon /> : <AddIcon />}
              variant="outlined"
              color="success"
              onClick={handleAdd}
              disabled={addedDealStatus}
            >
              {addedDealStatus ? "Added" : "Add"}
            </Button>
            <Button variant="outlined" color="error" onClick={handleClose}>
              Close
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Deals;
