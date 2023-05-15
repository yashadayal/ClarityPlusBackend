import React , { useState } from 'react';
import {  Button,TextField,FormControl,Box,Grid,} from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { Alert, Collapse } from "@mui/material";
import GuardDashboard from "./GuardDashboard";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#e3f2fd",
    color: theme.palette.common.black,
    fontSize: 20,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 20,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function GuardAddOrderPage() {

  const [nullValueError, setNullValueError] = useState(false);
  const [open, setOpen] = useState(true);
  const [errormessage, setErrorMessage] = useState("");

  function createData(orderid, firstname, lastname, retailer) {

    const AlphaNumericCheck = /^[A-Za-z0-9]+$/;
    if (!AlphaNumericCheck.test(orderid)) {
      setErrorMessage("Enter valid OrderId");
      setNullValueError(true);
      return;
    }
    const AlphaCheck = /^[A-Za-z]+$/;
    if (!AlphaCheck.test(firstname)) {
      setErrorMessage("Enter valid First Name");
      setNullValueError(true);
      return;
    }
    const AlphaCheckln = /^[A-Za-z]*$/;
    if (!AlphaCheckln.test(lastname)) {
      setErrorMessage("Enter valid Last Name");
      setNullValueError(true);
      return;
    }
    if (!AlphaCheck.test(retailer)) {
      setErrorMessage("Enter valid Retailer");
      setNullValueError(true);
      return;
    }

    return {
      OrderID: orderid.toUpperCase(),
      FirstName: firstname,
      LastName: lastname,
      DateOfDelivery: new Date().toISOString().slice(0, 10),
      Retailer: retailer,
    };
  }
  const [inputField, setInputFields] = useState([
    { orderid: "", firstname: "", lastname: "", retailer: "" },
  ]);

  const handleFormChange = (index, e) => {
    let data = [...inputField];
    data[index][e.target.name] = e.target.value;
    setInputFields(data);
    console.log(data);
  };

  const handleSubmit = (e) => {
    //e.preventDefault();
    const dataToSend = inputField.map((field) =>
      createData(field.orderid, field.firstname, field.lastname, field.retailer)
    );

    console.log(dataToSend);
    const response = axios.post(
      `http://localhost:9003/order/saveorderdata`,
      dataToSend
    ).then((response)=>{
      alert("Data submitted successfully !");
      window.location.reload()
    });
  };

  const addFields = (event) => {
    event.preventDefault();
    let newField = { orderid: "", firstname: "", lastname: "", retailer: "" };
    setInputFields([...inputField, newField]);
  };

  return (
    <>
      <GuardDashboard />
      <Paper
        elevation={16}
        sx={{ marginTop: "60px", marginLeft: "30px", marginRight: "30px" }}
      >
        <TableContainer component={Paper}>
          <Table
            component="form"
            // onSubmit={handleSubmit}
            sx={{ minWidth: 700 }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Order Id</StyledTableCell>
                <StyledTableCell align="center">First Name</StyledTableCell>
                <StyledTableCell align="center">Last Name</StyledTableCell>
                <StyledTableCell align="center">Retailer</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inputField.map((input, index) => (
                <StyledTableRow key={index.name}>
                  <StyledTableCell>
                    <TextField
                      onBlur={(e) => {
                        const oi = /^[A-Za-z0-9]+$/;
                        setNullValueError(false);
                        if (!oi.test(e.target.value)) {
                          setErrorMessage(" Order Id is invalid");
                          setNullValueError(true);
                        }
  
                        handleFormChange(index, e);
                      }}
                      variant="outlined"
                      required
                      fullWidth
                      label="Order Id"
                      name="orderid"
                      value={input.orderid}
                      onChange={(e) => handleFormChange(index, e)}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      onBlur={(e) => {
                        const fn = /^[A-Za-z]+$/;
  
                        // if value is not blank, then test the regex
                        setNullValueError(false);
                        if (!fn.test(e.target.value)) {
                          setErrorMessage("First Name is invalid");
                          setNullValueError(true);
                        }
                        handleFormChange(index, e);
                      }}
                      variant="outlined"
                      required
                      fullWidth
                      label="First Name"
                      name="firstname"
                      value={input.firstname}
                      onChange={(e) => handleFormChange(index, e)}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      onBlur={(e) => {
                        const ln = /^[A-Za-z]*$/;
                        setNullValueError(false);
                        if (!ln.test(e.target.value)) {
                          setErrorMessage("Last Name is invalid");
                          setNullValueError(true);
                        }
                        handleFormChange(index, e);
                      }}
                      variant="outlined"
                      fullWidth
                      label="Last Name"
                      name="lastname"
                      value={input.lastname}
                      onChange={(e) => handleFormChange(index, e)}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      onBlur={(e) => {
                        const re = /^[A-Za-z]+$/;
                        setNullValueError(false);
                        if (!re.test(e.target.value)) {
                          setErrorMessage("Retailer field contains only alphabets");
                          setNullValueError(true);
                        }
                        handleFormChange(index, e);
                      }}
                      variant="outlined"
                      required
                      fullWidth
                      label="Retailer"
                      name="retailer"
                      value={input.retailer}
                      onChange={(e) => handleFormChange(index, e)}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
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
            <Button
              sx={{ backgroundColor: "#e3f2fd", mt: 1, color: "#0d47a1" }}
              type="submit"
              fullWidth
              variant="outline"
              // sx={{ mt: 1}}
              onClick={addFields}
            >
              Add more +
            </Button>
            
          </Table>
          {/* <Grid item xs={12} sm={6.1}>
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
                </Grid> */}
          <Button
              onClick={handleSubmit}
              fullWidth
              variant="outline"
              sx={{
                marginTop: "20px",
                backgroundColor: "#e3f2fd",
                mt: 1,
                color: "#0d47a1",
              }}
            >
              Submit Details
            </Button>
          
        </TableContainer>
        </Paper> 
    </>
  );
}

export default GuardAddOrderPage;