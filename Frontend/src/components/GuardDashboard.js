import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Button,Typography,} from "@mui/material";
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';

function GuardDashboard() {

  return (
    <>
      <AppBar position="static" sx={{  height: "90px" , backgroundColor:"#0d47a1"}}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <div sx={{ display: "flex",alignItems: 'center'}}>
            <Avatar sx={{ m: 1,bgcolor: 'white' ,marginTop:"30px" }}>
            <a href ='/guardlandingpage' >
            <Typography>
              G
            </Typography>
            </a>
          </Avatar>
            {/* <a href ='/guardlandingpage' style={{  display: 'flex', }}>
              <Typography variant="h6" sx={{ 
                fontWeight: 700,
                color: 'white',
                fontSize: '1.6rem',
                textDecoration: 'underline',
                marginTop:"20px",
                marginLeft: "20px"}}>
              Guard
              </Typography>
            </a>  */}
            </div>
            <div sx={{ display: "flex", alignItems: "center" }}>
            <Button  sx={{ flexGrow:0,
              fontWeight: 700,
              color: 'white',
              textDecoration:'underline',
              fontSize: '1.2rem',
              marginTop:"20px",
              marginRight: "20px",
            }} 
              href="/guardaddorderpage">
            Add Order+
            </Button>
            <Button sx={{ 
              fontWeight: 700,
              color: 'white',
              textDecoration: 'underline',
              fontSize: '1.2rem',
              marginTop:"20px",
              marginRight: "20px"}} href="/searchlogs">
            Logs
            </Button>
            <Button sx={{ 
                fontWeight: 700,
                color: 'white',
                textDecoration: 'underline',
                fontSize: '1.2rem',
                marginTop:"20px",}}  href="/searchInstituteID">
                Hand-over Parcel(s)
                <Avatar sx={{ bgcolor:'#9e9e9e',marginLeft:'10px', width: 35, height: 35 }} variant="rounded">
                <SearchIcon />
            </Avatar> 
            </Button>
            <Button variant="outlined" sx={{ 
              fontWeight: 700,
              color: 'white',
              textDecoration: 'underline',
              fontSize: '1.2rem',
              marginTop:"20px",
              marginRight: "20px"}} href="/">
            Logout
            </Button>
            
            </div>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default GuardDashboard;