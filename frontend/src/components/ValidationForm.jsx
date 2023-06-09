import {React, useState} from "react";


const FormValdation = (email, password) => {
    const [validation, setValidation] = useState('') 
    const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
 
    if (/\S+@\S+\.\S+/.test(email) === true) {
        if (password.length >= 8) {
            return true
        } else {
            setValidation("password should be 8 length min")
        }
    } else {
         setValidation("email incorrect")
    }
    return(
        <h1>
            hi
        </h1>
    )
}

export {FormValdation}