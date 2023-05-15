import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Grid,
  Paper,
  Typography,
  AppBar,
  Toolbar,
  FormControl,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import imgPath from "./Images/service-fast-delivery-parcels-vector-illustration-express-delivery-courier-service-smiling-man-courier-orange-uniform-with-box-his-hands-flat-style-eps-10_669518-23.avif";
import imgPath1 from "./Images/unnamed.jpg"
import Select from "@mui/material/Select";
import axios from "axios";
import { Alert, Collapse } from "@mui/material";

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

  const [nullValueError, setNullValueError] = useState(false);
  const [open, setOpen] = useState(true);
  const [errormessage, setErrorMessage] = useState("");

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
    setNullValueError(false);

    const emailCheck = /\S+@\S+\.\S+/;
    if (!emailCheck.test(personalemailid)) {
      setErrorMessage("Email is invalid");
      setNullValueError(true);
      return;
    }

    const AlphaCheck = /^[A-Za-z]+$/;
    if (!AlphaCheck.test(firstName)) {
      setErrorMessage("Enter valid First Name");
      setNullValueError(true);
      return;
    }

    const AlphaCheckln = /^[A-Za-z]*$/;
    if (!AlphaCheckln.test(lastName)) {
      setErrorMessage("Enter valid Last Name");
      setNullValueError(true);
      return;
    }

    const AlphaNumericCheck = /^[A-Za-z0-9]+$/;
    if (!AlphaNumericCheck.test(orderId)) {
      setErrorMessage("Enter valid OrderId");
      setNullValueError(true);
      return;
    }

    if (!AlphaNumericCheck.test(instituteId)) {
      setErrorMessage("Enter valid Institute Id");
      setNullValueError(true);
      return;
    }

    if (phoneNumber.length !== 10) {
      setErrorMessage("Mobile number is invalid !!!");
      setNullValueError(true);
      return;
    }

    let data;
    if (retailer !== "Other") {
      data = {
        RecipientFirstName: firstName,
        RecipientLastName: lastName,
        OrderID: orderId.toUpperCase(),
        InstituteID: instituteId.toUpperCase(),
        RecipientPhoneNumber: phoneNumber,
        PersonalEmailID: personalemailid,
        Retailer: retailer,
      };
    } else {
      data = {
        RecipientFirstName: firstName,
        RecipientLastName: lastName,
        OrderID: orderId,
        InstituteID: instituteId.toUpperCase(),
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
       <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{backgroundColor:'#0d47a1'}}>
          <Toolbar >
          {/* <a href="https://www.iiitb.ac.in/" style={{ textDecoration: 'none',color: 'white'}}> */}
            <Typography variant="h4" component="div" sx={{ flexGrow: 1, textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',}}}>
              Clarity Plus Package
            </Typography>
            <Button 
              variant="outlined"
              sx={{ 
              fontWeight: 700,
              color: 'white',
              textDecoration: 'underline',
              fontSize: '1.2rem',
              marginTop:{ xs: '20px', sm: '20px' },
              marginLeft: { xs: '1200px', sm: '20px' }}} href="/">
              Logout
            </Button>
            <img
              src= {imgPath1}
              style={{ width: 160, height: 90, marginLeft: 'auto' }}
            />
          </Toolbar>
        </AppBar>
      </Box>
     

     
      <Grid container spacing={2}>
        <Grid item xs={8} >
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
                    onBlur={(e) => {
                      const fn = /^[A-Za-z]+$/;
                      setNullValueError(false);
                      if (!fn.test(e.target.value)) {
                        setErrorMessage("First Name is invalid");
                        setNullValueError(true);
                      }

                      setFirstName(e.target.value);
                    }}
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
                    onBlur={(e) => {
                      const ln = /^[A-Za-z]*$/;
                      setNullValueError(false);
                      if (!ln.test(e.target.value)) {
                        setErrorMessage("Last Name is invalid");
                        setNullValueError(true);
                      }

                      setLastName(e.target.value);
                    }}
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
                    onBlur={(e) => {
                      const oi = /^[A-Za-z0-9]+$/;
                      setNullValueError(false);
                      if (!oi.test(e.target.value)) {
                        setErrorMessage(" Order Id is invalid");
                        setNullValueError(true);
                      }

                      setOrderId(e.target.value);
                    }}
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
                    onBlur={(e) => {
                      const ii = /^[A-Za-z0-9]+$/;
                      setNullValueError(false);
                      if (!ii.test(e.target.value)) {
                        setErrorMessage(" Institute Id is invalid");
                        setNullValueError(true);
                      }

                      setInstituteId(e.target.value);
                    }}
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
                    onChange={(e) => {
                      const mn = /^[0-9\b]+$/;
                      if (mn.test(e.target.value)) {
                        setPhoneNumber(e.target.value);
                        setNullValueError(false);
                        if (e.target.value.length === 10) {
                          setPhoneNumber(e.target.value);
                        }
                        if (e.target.value.length > 10) {
                          setErrorMessage(
                            "More than 10 digits in Mobile Number!!!"
                          );
                          setNullValueError(true);
                        }
                        if (e.target.value.length < 10) {
                          setErrorMessage(
                            "Less than 10 digits in Mobile Number!!!"
                          );
                          setNullValueError(true);
                        }
                      } else {
                        setErrorMessage("Use Numbers only!!!");
                        setNullValueError(true);
                      }
                    }}
                    fullWidth
                    label="Mobile Number"
                    name="Mobile Number"
                    value={phoneNumber}
                  />
                </Grid>
                <Grid item xs={12} sm={6.1}>
                  <TextField
                    onBlur={(e) => {
                      const re = /\S+@\S+\.\S+/;
                      setNullValueError(false);
                      if (!re.test(e.target.value)) {
                        setErrorMessage("Email is invalid");
                        setNullValueError(true);
                      }

                      setPersonalEmailId(e.target.value);
                    }}
                    variant="outlined"
                    required
                    fullWidth
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
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
                  {nullValueError && (
                <Box sx={{ width: "100%" }}>
                  <Collapse in={open}>
                    <Alert
                      severity="error"
                    >
                      {errormessage}
                    </Alert>
                  </Collapse>
                </Box>
              )}
                </Grid>
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