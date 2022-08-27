import React,{useContext, useState} from 'react'
import axios from 'axios';
import {Paper, TextField, Typography,Box} from "@mui/material"
import { AppContext } from '../../context';
import "../../styling/AutoFiller.css"
const index = () => {
    const {city, setCity,
      setState,
      setCountry,
      setPincode,
      result, setResult
    } = useContext(AppContext); 

  const [ isCitySelected, setIsCitySelected] =  useState(true);


  // !-----------Function for AUTOFILLER, using "HERE.COM Geolocating API" and useEffect hook with Axios------------------!

    const changeHandler =(e)=>{
       
      if(e.target.value.length===0)
      {
        setIsCitySelected(true)
        setResult([])
        setCity("");
      }
      else{
      setCity(e.target.value);
     console.log(e.target.value)
     var config = {
       method: 'get',
       url: `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${city}&apikey=oiVoNGmSL1ybMP5IS9S8G1KMUVucwNYz7DaS-_f9xDA`,
       headers: { }
     };
     
     axios(config)
     .then(function (response) {
       console.log(JSON.stringify(response.data.items[0].address));
       setResult(response.data.items);
       setIsCitySelected(false)
     })
     .catch(function (error) {
       console.log(error);
     });
    }
    }


// !---------------Funtion for filling Up City, Pin code, Country & State inputs on selecting a particular suggesting address options---------------!

const selectCityHandler=(index)=>{
 console.log(index);
 setCity(result[index]?.address?.county ? result[index]?.address?.county:"")
 setPincode(result[index]?.address?.postalCode ? result[index]?.address?.postalCode : "")
 setCountry(result[index]?.address?.countryName ? result[index]?.address?.countryName:"")
 setState(result[index]?.address?.state ? result[index]?.address?.state:"")
 setIsCitySelected(true);
}

  return (
    <div>
  <TextField type={"text"} value={city} onChange={changeHandler}  label="City/Town" size="small" fullWidth={true} required={true} />
{
  !isCitySelected && <Paper elevation={3} style={{padding:"10px",position:"absolute",zIndex:200}} >
     {result.length>0 && 
      result.map((item, index)=>{
        return(
          <Typography key={index} className="Address" onClick={()=>selectCityHandler(index)}  >
          {item?.title}
        </Typography>
        )
      })
    }
    </Paper>
}
    </div>
  )
}

export default index