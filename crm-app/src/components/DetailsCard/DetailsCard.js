//This component is responsible for displaying cards on 1st column of the modal.
import React from "react";

import { Fab, Typography, CardContent, Card } from "@mui/material";

const DetailsCard = ({ name, company, email, phone, labels }) => {
  return (
    <>
      <Card sx={{ minWidth: 250, marginBottom: "2rem", marginTop: "2rem" }}>
        <CardContent>
          <Typography
            variant="body"
            gutterBottom
            component="div"
            sx={{ textAlign: "center", marginBottom: "1rem" }}
          >
            Personal Details
          </Typography>
          <Typography variant="h5" gutterBottom component="div">
            {name}
          </Typography>
          <Typography variant="h6" gutterBottom component="div">
            {phone}
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ minWidth: 250, marginBottom: "2rem" }}>
        <CardContent>
          <Typography
            variant="body"
            gutterBottom
            component="div"
            sx={{ textAlign: "center", marginBottom: "1rem" }}
          >
            Professional Details
          </Typography>
          <Typography variant="h6" gutterBottom component="div">
            {company}
          </Typography>
          <Typography variant="h6" gutterBottom component="div">
            {email}
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ minWidth: 250 }}>
        <CardContent>
          <Typography
            variant="body"
            gutterBottom
            component="div"
            sx={{ textAlign: "center", marginBottom: "1rem" }}
          >
            Labels
          </Typography>
          <Fab variant="extended" size="small">
            {labels}
          </Fab>
        </CardContent>
      </Card>
    </>
  );
};
export default DetailsCard;
