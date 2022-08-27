import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Box,
  Paper,
} from "@mui/material";
import { AppContext } from "../../context";
import AutoFiller from "../AutoFiller";
import "../../styling/Summary.css";
import Summary from "../Summary";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import SuccessImage from "../../assets/success.svg"


function getSteps() {
  return ["Personal Information", "Address Information", "Summary"];
}

const LinaerStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [userInfo, setUserInfo] = useState({})
  const steps = getSteps();

  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    street,
    setStreet,
    landmark,
    setLandmark,
    city,
    state,
    setState,
    country,
    setCountry,
    pincode,
    setPincode,
    address,
    setAddress,
  } = useContext(AppContext);

  const [error, setError] = useState({
    firstName: false,
    lastName: false,
    email: false,
    street: false,
    landmark: false,
    city: false,
    state: false,
    country: false,
    pincode: false,
    address: false,
  });


  // !---------Functions for Handling Input Info. states----------------!


  const firstNameHandler = (e) => {
    setFirstName(e.target.value);
    e.target.value.length < 2
      ? setError({ ...error, firstName: true })
      : setError({ ...error, firstName: false });
  };

  const lastNameHandler = (e) => {
    setLastName(e.target.value);
    e.target.value.length < 2
      ? setError({ ...error, lastName: true })
      : setError({ ...error, lastName: false });
  };

  const streetHandler = (e) => {
    setStreet(e.target.value);
    e.target.value.length !== 0
      ? setError({ ...error, street: true })
      : setError({ ...error, street: false });
  };

  const landmarkHandler = (e) => {
    setLandmark(e.target.value);
  };
  const countryHandler = (e) => {
    setCountry(e.target.value);
  };
  const PincodeHandler = (e) => {
    setPincode(e.target.value);
    e.target.value.length > 0 && e.target.value.length <= 6
      ? setError({ ...error, pincode: true })
      : setError({ ...error, pincode: false });
  };

  const EmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const addressHandler = (e) => {
    setAddress(e.target.value);
  };

  const stateHandler = (e) => {
    setState(e.target.value);
  };



  // !-----------Functions for Save & Next Buttons---------------! 

  const handleNext = () => {
    sessionStorage.setItem(
      "ClientInfo",
      JSON.stringify({
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
      })
    );
    setActiveStep(activeStep + 1);
    console.log("Clicked Details");
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };



// !------------Axios POST for Final Submition of Information---------------! 

  const HandleSubmit = () => {
    handleNext();
    const obj = JSON.stringify({
      "firstName":`${firstName}`,
      "lastName":`${lastName}`,
      "email":`${email}`,
      "street":`${street}`,
      "landmark":`${landmark}`,
      "city":`${city}`,
      "country":`${country}`,
      "pincode":`${pincode}`,
      "address":`${address}`,
    });



    var config = {
      method: "post",
      url: 'https://webhook.site/6648d663-17fd-4e0f-bd36-c86c575dfa26',
      headers: { "Content-Type": "application/json" },
      data: obj,
    };

    axios(config)
      .then(function () {
        setIsLoading(false);
        setIsError(false);
      })
      .catch(function (error) {
        setIsLoading(false);
        setIsError(true);
        console.log(error.message, "error while post");
      });
  };



console.log(userInfo)

  return (
    <React.Fragment>
      <Box mt={6}>
        <Stepper alternativeLabel activeStep={activeStep}>
          {steps.map((step, index) => {
            const labelProps = {};
            const stepProps = {};
            return (
              <Step {...stepProps} key={index}>
                <StepLabel {...labelProps}>{step}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>

      {activeStep === steps.length ? (                         
        !isLoading ? (
          !isError ? (
            <Box textAlign={"center"}>
             <img src={SuccessImage} alt="successImage" height={"400px"} width={"400px"} />
            </Box>
          ) : (
            <Box >
             <Typography variant="h4" align="center" mt={16}>
              Some Error Occured, Please try again !
            </Typography>
            </Box>
          )
        ) : (
          <Box textAlign={"center"} mt={6}>
             <CircularProgress />
            </Box>
        )
      ) : activeStep === 0 ? (
        <Grid container className="formContainer">
          <Grid item xs={12} sm={7}>
            <Paper elevation={3} style={{height:"50vh"}}>
              <form className="form">
                <Box mb={2}>
                  <Typography color="primary" align="center" variant="h5">
                    Personal Information
                  </Typography>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      variant="outlined"
                      label="First Name"
                      color="primary"
                      name="firstName"
                      fullWidth={true}
                      size="small"
                      value={firstName}
                      error={error.firstName}
                      helperText={
                        error.firstName
                          ? "Last Name must have atleast 2 letter"
                          : ""
                      }
                      onChange={firstNameHandler}
                      type="text"
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      variant="outlined"
                      label="Last Name"
                      color="primary"
                      name="lastName"
                      fullWidth={true}
                      size="small"
                      value={lastName}
                      error={error.lastName}
                      helperText={
                        error.lastName
                          ? "Last Name must have atleast 2 letter"
                          : ""
                      }
                      onChange={lastNameHandler}
                      required
                      type="text"
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      variant="outlined"
                      label="Email"
                      color="primary"
                      name="email"
                      fullWidth={true}
                      size="small"
                      value={email}
                      onChange={EmailHandler}
                      required
                      type="email"
                    />
                  </Grid>
                </Grid>

                <Box mt={2} align="end">
                  <Button disabled={activeStep === 0} onClick={handleBack}>
                    back
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    type="submit"
                    disabled={
                      firstName.length > 2 &&
                      lastName.length > 2 &&
                      email.includes("@")
                        ? false
                        : true
                    }
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Save & Next"}
                  </Button>
                </Box>
              </form>
            </Paper>
          </Grid>
        </Grid>
      ) : activeStep === 1 ? (
        <Grid container className="formContainer">
          <Grid item xs={12} sm={7}>
            <Paper elevation={3}>
              <form className="form">
                <Box mb={2}>
                  <Typography color="primary" align="center" variant="h6">
                    Address Information
                  </Typography>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      variant="outlined"
                      label="Address Line"
                      color="primary"
                      name="address"
                      fullWidth={true}
                      size="small"
                      value={address}
                      onChange={addressHandler}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      label="Street Name"
                      color="primary"
                      name="street"
                      fullWidth={true}
                      size="small"
                      value={street}
                      onChange={streetHandler}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      label="Landmark"
                      color="primary"
                      name="landmark"
                      fullWidth={true}
                      size="small"
                      onChange={landmarkHandler}
                      value={landmark}
                      type="text"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <AutoFiller />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      label="State"
                      color="primary"
                      name="state"
                      fullWidth={true}
                      size="small"
                      onChange={stateHandler}
                      value={state}
                      type="text"
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      label="Country"
                      color="primary"
                      name="country"
                      fullWidth={true}
                      size="small"
                      onChange={countryHandler}
                      value={country}
                      type="text"
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      label="Pincode"
                      color="primary"
                      name="pincode"
                      fullWidth={true}
                      size="small"
                      onChange={PincodeHandler}
                      value={pincode}
                      type="text"
                      required
                    />
                  </Grid>
                </Grid>

                <Box mt={2} align="end">
                  <Button disabled={activeStep === 0} onClick={handleBack}>
                    back
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    type="button"
                    disabled={
                      address.length > 0 &&
                      street.length > 0 &&
                      state.length > 0 &&
                      city.length > 0 &&
                      country.length > 0 &&
                      pincode.length > 0
                        ? false
                        : true
                    }
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Save & Next"}
                  </Button>
                </Box>
              </form>
            </Paper>
          </Grid>
        </Grid>
      ) : activeStep === 2 ? (
        <Grid container className="formContainer">
          <Grid item xs={12} sm={7}>
            <Paper elevation={3} style={{ padding: "2rem" }}>
              <Summary />

              <Box mt={2} align="end">
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  back
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={HandleSubmit}
                >
                  {activeStep === steps.length - 1 ? "Submit" : "Save & Next"}
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      ) : null}
    </React.Fragment>
  );
};

export default LinaerStepper;
