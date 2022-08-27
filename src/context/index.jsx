
import React, { createContext, useState } from "react";
export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [street, setStreet] = useState("");
    const [landmark, setLandmark] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [pincode, setPincode] = useState("");
    const [address, setAddress] = useState("");
    const [result, setResult] = useState([]);
    const [selectCity, setSelectedCity] = useState("");
    return (
        <AppContext.Provider
            value={{
                firstName, setFirstName,
                lastName, setLastName,
                email, setEmail,
                street, setStreet,
                landmark, setLandmark,
                city, setCity,
                state, setState,
                country, setCountry,
                pincode, setPincode,
                address, setAddress,
                selectCity, setSelectedCity,
                result, setResult
            }}
        >
            {children}
        </AppContext.Provider>
    );
};