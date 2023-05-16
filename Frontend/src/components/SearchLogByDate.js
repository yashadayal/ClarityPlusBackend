import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs'; 
import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from "@mui/material/styles";
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Switch from '@mui/material/Switch';
import { RadioButtonChecked, RadioButtonUnchecked } from '@mui/icons-material';
import { Grid, Typography} from "@mui/material";
import GuardDashboard from './GuardDashboard';

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#e3f2fd",
      color: theme.palette.common.black,
      fontSize: 15,
      padding: "20px"
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 15
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


function SearchLogByDate (){

    const [search, setSearch] = useState('');
    const [isDatePicker, setIsDatePicker] = useState(false);
    const [dateSelected, setDateSelected] = useState('');
    const [logsByID, setLogsByID] = useState([]);
    const [logsByDate, setLogsByDate] = useState([]);
    const [visibleTableID, setVisibleTableID] = useState(false);
    const [visibleTableDate, setVisibleTableDate] = useState(false);
    const [isToggled, setIsToggled] = useState(false);
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const [isIcon, setIsIcon] = useState(false);

    useEffect(() => {
      console.log(isToggled);
    }, [isToggled]);

    const handleToggle = () => {
      setIsToggled(!isToggled);
      if(visibleTableID === true)
          setVisibleTableID(false);
      if(visibleTableDate === true)
          setVisibleTableDate(false); 
    };  

    const handleSearch = (e) => {
        console.log(e.target.value);
        if(e.target.value === '20'){
            setIsDatePicker(true);
        }
        else{
            setIsDatePicker(false);
        }
        setSearch(e.target.value);
    };

    const handleSearchLogs = async(e) => {
        e.preventDefault();
        if(isToggled === false){
            const searchToUpper = search.toUpperCase();
            console.log(searchToUpper);
            await axios.get(`http://localhost:9003/order/search/logsbyID/${searchToUpper}/`)
            .then((response)=>{
            setVisibleTableID(true);
            console.log(response.data);
            setLogsByID(response.data);
            })
            .catch((error)=>{
            console.log(error);
            }) 
        }
        else if(isToggled === true)
        {
            console.log("Yasha");
            const formattedDate = dayjs(dateSelected).format('YYYY-MM-DD');
            console.log(formattedDate);
            await axios.get(`http://localhost:9003/order/search/logsbydate/${formattedDate}/`)
            .then((response)=>{
            setVisibleTableDate(true);
            console.log(response.data);
            setLogsByDate(response.data);
            })
            .catch((error)=>{
            console.log(error);
            }) 
        }
    };

    return (
        <>
        <GuardDashboard/>
        <Grid sx={{marginTop:'20px',marginLeft:'20px'}}>
            {isToggled ? (  
              <>
              <Typography sx={{marginBottom:'15px'}}>Search By Date</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* <Alert severity="info">If searching by date, kindly use this format : YYYY-MM-DD </Alert> */}
                <DatePicker label="Search By Date" 
                value={dateSelected}
                onChange={(date) => {setDateSelected(date)}
                }
                />
                
              </LocalizationProvider> 
              </>
              ) : (
                <>
                <Typography sx={{marginBottom:'15px'}}>Search By Institute Id</Typography>
              <TextField
                label="Search"
                variant="outlined"
                value={search}
                onChange={handleSearch}
              />
              </>
            )}
            
            <IconButton onClick={handleSearchLogs} >
              <SearchIcon />
            </IconButton>
            <Switch {...label} defaultChecked onChange={handleToggle}/>
          </Grid>

          {visibleTableDate && 
            <Paper
            elevation={8}
            sx={{ marginTop: "40px", marginLeft: "20px" ,marginRight: "20px" }}
            >
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Order ID</StyledTableCell>
                        <StyledTableCell align="center">First Name</StyledTableCell>
                        <StyledTableCell align="center">Last Name</StyledTableCell>
                        <StyledTableCell align="center">Retailer</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {logsByDate.map((row, index) => {
                      const splittedData = row.split(",");
                      console.log(splittedData);
                      return (
                      <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>{splittedData[0]}</TableCell>
                        <TableCell align="center">{splittedData[1]}</TableCell>
                        <TableCell align="center">{splittedData[2]}</TableCell>
                        <TableCell align="center">{splittedData[3]}</TableCell>
                      </TableRow>
                      );
                    })}
                    </TableBody>
                  </Table>
                </TableContainer>
            </Paper> }

          {visibleTableID && 
          <Paper
          elevation={8}
          sx={{ marginTop: "40px", marginLeft: "20px" ,marginRight: "20px" }}
          >
        <TableContainer>
        <Table sx={{ minWidth:700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Order Id</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Retailer</StyledTableCell>
              <StyledTableCell align="center">Received</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {logsByID.map((row, index) => {
          const splittedData = row.split(",");
          console.log(splittedData);
          return (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell align="center">{splittedData[0]}</TableCell>
            <TableCell align="center">{splittedData[1]}</TableCell>
            <TableCell align="center">{splittedData[2]}</TableCell>
            <TableCell align="center">{splittedData[3]}</TableCell>
            <TableCell align="center">
            {splittedData[3] === "true" ? (
              <RadioButtonChecked color="primary">Delivered</RadioButtonChecked>
            ) : (
              <RadioButtonUnchecked color="primary">Not Delivered</RadioButtonUnchecked>
            )}
            </TableCell>
            </TableRow>
            );
          })}
          </TableBody>
        </Table>
      </TableContainer>
      </Paper>
      }
       
  </>
);
};

export default SearchLogByDate;