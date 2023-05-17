import React, { useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Paper,Button,Typography} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { TransitionProps } from '@mui/material/transitions';
import { styled } from "@mui/material/styles";
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import GuardDashboard from './GuardDashboard';
import { Form } from 'react-bootstrap';

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


function GuardSearchPage () {

    const [searchID, setSearchID] = useState('');
    const [recipientDetails, setRecipientDetails] = useState([]);
    const [open, setOpen] = useState(false);
    const [otp, setOtp] = useState('');
    const [verified, setVerified] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
      console.log(verified);
    }, [verified]);

    useEffect(() => {
      console.log(open);
    }, [openSuccess]);

    const handleOTP = (e) => {
      setOtp(e.target.value);
    };
    
    const handleClickOpen = async(e) => {
      setOpen(true);
      e.preventDefault();
      console.log('Sending OTP for institute ID:', searchID);
      const response = await axios.get(`http://localhost:9003/order/emailOfInstituteID/${searchID}/`)
      .then(response => {
          console.log(response.data);
      })
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleCloseSuccess = () =>{
      setOpenSuccess(false);
      setOtp('');
      setSearchID('');
    };
    
    const handleSearchID = (e) => {
        setSearchID(e.target.value);
    };

    const handleVerifyOTP = async(e) => {
      e.preventDefault();
      console.log('Verifying OTP for institute ID:', searchID);
      const response = await axios.post(`http://localhost:9003/order/verifyOtp/${searchID}/${otp}`)
      .then(response => {
          console.log(response.data);
          if(response.data === "OTP Verified!"){
            setOpen(false);
            setVerified(true);
            setOpenSuccess(true);
            console.log(verified);
          }
          else if(response.data === "OTP not verified!"){
            console.log("Incorrect OTP");
            alert("Enter correct OTP!");
          }
      })
      setOtp('');
    };

    const handleSearch = async(e) => {
      e.preventDefault();
      console.log('Searching for institute ID:', searchID);
      const response = await axios.get(`http://localhost:9003/order/ordersOfInstituteID/${searchID}/`)
      .then(response => {
          console.log(response.data);
          setRecipientDetails(response.data);
      })
    };

    const handleConditionChange = (condition) => {
    setIsButtonDisabled(!condition); // Set the disabled status of the button based on the condition
  }
  console.log(recipientDetails[0]);
  return (
    <>
    <GuardDashboard/>
    <Typography sx={{marginTop:'40px',marginLeft:'40px'}} variant='h5'> Enter Institute ID</Typography> 
      <Form onSubmit={(e) => handleSearch(e)}>
        <TextField sx={{marginTop:'20px',marginLeft:'40px'}} 
          label="Search"
          variant="outlined"
          size='small'
          value={searchID}
          onChange={handleSearchID}
        />
      <IconButton >
        <SearchIcon sx={{marginTop:'20px',marginLeft:'10px'}}  onClick={(e) => handleSearch(e)}/>
      </IconButton>
      </Form>
      <Paper elevation={16}
        sx={{ marginTop: "40px", marginLeft: "80px", marginRight: "80px" }}>
      <TableContainer>
        <Table
        sx={{ minWidth: 700 }}
        aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Order Id</StyledTableCell>
                {/* <StyledTableCell align="center">Retailer</StyledTableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {recipientDetails.map((row) => (
                      <TableRow key = {row}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell align="center">{row}</TableCell>
                          {/* <TableCell align="center"></TableCell> */}
                      </TableRow>
                  ))
                }
            </TableBody>

        </Table>
      </TableContainer>
      
      { ( (recipientDetails.length===1 &&  (recipientDetails[0].includes("There") || recipientDetails[0].includes("This")) ) || recipientDetails.length===0  )?<Button   
              variant="outline"
              onClick={handleClickOpen}
              disabled
              sx={{
                size:"small",
                marginTop: "20px",
                backgroundColor: "#e3f2fd",
                mt: 1,
                color: "#0d47a1",
              }}>
              Send OTP
            </Button> : <Button   
              variant="outline"
              onClick={handleClickOpen}
              sx={{
                size:"small",
                marginTop: "20px",
                backgroundColor: "#e3f2fd",
                mt: 1,
                color: "#0d47a1",
              }}>
              Send OTP
            </Button>}
                      
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Authentication</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ask for OTP Received
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="OTP"
            type="otp"
            fullWidth
            variant="standard"
            value={otp}
            onChange={handleOTP}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleVerifyOTP}>Verify OTP</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      {verified && 
        <Dialog open={openSuccess} onClose={handleClose}>
        <DialogTitle>Authentication Done</DialogTitle>
        <DialogContent>
          <DialogContentText>
            OTP Verified, hand-over the parcel(s) to the recipient!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccess}>OK</Button>
        </DialogActions>
      </Dialog>}
    </Paper>
    </>
  );
};

export default GuardSearchPage;