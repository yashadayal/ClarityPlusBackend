import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Grid,
  Paper,
  Typography,
  FormControl,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import imgPath from "./Images/service-fast-delivery-parcels-vector-illustration-express-delivery-courier-service-smiling-man-courier-orange-uniform-with-box-his-hands-flat-style-eps-10_669518-23.avif";
import Select from "@mui/material/Select";
import Header from "./Header";
import axios from "axios";

const UserFormPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [orderId, setOrderId] = useState("");
  const [instituteId, setInstituteId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [personalemailid,setPersonalEmailId] = useState("");
  const [retailer, setRetailer] = useState("");
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [otherRetailer, setOtherRetailer] = useState("");

  const handleRetailerChange = (e) => {
    const value = e.target.value;
    setRetailer(value);
    setIsOtherSelected(value === "Other");
  };

  const handleOtherRetailerChange = (e) => {
    setOtherRetailer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data;
    if (retailer !== "Other") {
      data = {
        RecipientFirstName: firstName,
        RecipientLastName: lastName,
        OrderID: orderId,
        InstituteID: instituteId,
        RecipientPhoneNumber: phoneNumber,
        PersonalEmailID: personalemailid,
        Retailer: retailer,
      };
    } else {
      data = {
        RecipientFirstName: firstName,
        RecipientLastName: lastName,
        OrderID: orderId,
        InstituteID: instituteId,
        RecipientPhoneNumber: phoneNumber,
        PersonalEmailID: personalemailid,
        Retailer: otherRetailer,
      };
    }

    const response = axios
      .post(`http://localhost:9003/recipient/savedata`, data)
      .then((response) => {
        console.log(response);
        setFirstName("");
        setLastName("");
        setOrderId("");
        setInstituteId("");
        setPhoneNumber("");
        setPersonalEmailId("");
        setRetailer("");
        setOtherRetailer("");
        alert("Data submitted successfully !");
        window.location.reload()
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Header />
      <Grid container spacing={2}>
        <Grid item xs={8}>
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              Fill Your Order Details
            </Typography>

            <Box
              component="form"
              sx={{ backgroundColor: "white" }}
              onSubmit={handleSubmit}
            >
              <Grid
                container
                spacing={4}
                alignItems="center"
                justifyContent="center"
                sx={{ marginTop: "1px" }}
              >
                <Grid item xs={12} sm={6.1}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6.1}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6.1}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Order ID"
                    name="orderid"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6.1}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Institute ID"
                    name="instituteid"
                    value={instituteId}
                    onChange={(e) => setInstituteId(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6.1}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Phone Number"
                    name="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    inputProps={{ maxLength: 10 }}
                    InputProps={{ inputMode: "tel" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6.1}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Personal Email Id"
                    name="Personal Email Id"
                    value={personalemailid}
                    onChange={(e) => setPersonalEmailId(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6.1}>
                  <FormControl required sx={{ minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Retailer
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      label="Retailer "
                      value={retailer}
                      onChange={handleRetailerChange}
                      // onChange={(e) =>setRetailer(e.target.value)}
                    >
                      <MenuItem value={"Myntra"}>Myntra</MenuItem>
                      <MenuItem value={"Amazon"}>Amazon</MenuItem>
                      <MenuItem value={"Flipkart"}>Flipkart</MenuItem>
                      <MenuItem value={"Ajio"}>Ajio</MenuItem>
                      <MenuItem value={"Blue-Dart"}>Blue-Dart</MenuItem>
                      <MenuItem value={"Urbanic"}>Urbanic</MenuItem>
                      <MenuItem value={"Other"}>Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {isOtherSelected && (
                  <Grid item xs={12} sm={6.1}>
                    <TextField
                      id="other-retailer"
                      label="Other Retailer"
                      value={otherRetailer}
                      onChange={handleOtherRetailerChange}
                    />
                  </Grid>
                )}

                <Grid item xs={12} sm={6.1}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1, backgroundColor: "#0d47a1" }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Box>
        </Grid>
        <Grid item xs={4}>
          <img
            src={imgPath}
            style={{ marginTop: "60px", width: "80%", height: "80%" }}
          />
        </Grid>
      </Grid>
    </>
  );
};
export default UserFormPage;
