import { Paper,Grid  } from "@mui/material";
import React from "react";
import GuardDashboard from './GuardDashboard';
import imgPath from "./Images/college.jpeg"
const GuardLandingPage =() =>
{
    return(
        <>
        <GuardDashboard/>
        <img src={imgPath} style={{ display: "block", margin: "auto", width: "100%", textAlign: "center", verticalAlign: "middle"}} />

        </>
    )
}

export default GuardLandingPage;