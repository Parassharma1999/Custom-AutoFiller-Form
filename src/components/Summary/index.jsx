import React, { useState,useContext } from "react";
import Box from "@mui/material/Box";
import { AppContext } from "../../context";
import { Typography } from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";

export default function Elevation() {
  const {
    firstName,
    lastName,
    email,
    street,
    landmark,
    city,
    state,
    country,
    pincode,
    address,
  } = useContext(AppContext);

  const [isDetailSelected, setIsDetailSelected] = useState(false)
  const [isPersonalSelected, setIsPersonalSelected] = useState(false)


//  !-----------------Function for selecting and Unselecting flags for accordion which is used in styling----------------!

  const DetailHandler = ()=>{
    setIsDetailSelected(!isDetailSelected)
    setIsPersonalSelected(false)
     
  }
   
  const PersonalHandler = ()=>{
    setIsPersonalSelected(!isPersonalSelected)
    setIsDetailSelected(false)

 }


  return (
    <Box>
        <Box m={2}>
        <Typography align="center" variant="h4" color="primary">
          Summary
        </Typography>
        </Box>


        <Box>
          <Accordion onClick={DetailHandler} elevation={4} >
            <AccordionSummary style={isDetailSelected ? {background:"#dddada8a"}:{background:""}}>
              <Typography color="primary" align="center" variant="h6">Personal Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                First Name: <span style={{ color: "#1976d2" }}>{firstName}</span>
              </Typography>
              <Typography>
                Last Name: <span style={{ color: "#1976d2" }}>{lastName}</span>
              </Typography>
              <Typography>
                Email: <span style={{ color: "#1976d2" }}>{email}</span>
              </Typography>
            </AccordionDetails>
          </Accordion >

          <Accordion onClick={PersonalHandler} elevation={4}>
            <AccordionSummary style={isPersonalSelected ? {background:"#dddada8a"}:{background:""}}>
              <Typography color="primary" align="center" variant="h6">Address Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              
              <Typography>
                Address: <span style={{ color: "#1976d2" }}>{address}</span>
              </Typography>
              <Typography>
                Street Name: <span style={{ color: "#1976d2" }}>{street}</span>
              </Typography>
              <Typography>
                Landmark: <span style={{ color: "#1976d2" }}>{landmark}</span>
              </Typography>
              <Typography>
                City: <span style={{ color: "#1976d2" }}>{city}</span>
              </Typography>
              <Typography>
                Pincode: <span style={{ color: "#1976d2" }}>{pincode}</span>
              </Typography>
              <Typography>
                State: <span style={{ color: "#1976d2" }}>{state}</span>
              </Typography>
              <Typography>
                Country: <span style={{ color: "#1976d2" }}>{country}</span>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>

        
    </Box>
  );
}
