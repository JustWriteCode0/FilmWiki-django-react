import { useState } from "react"

const FormValidation = (email, password) => {
    let isValid = true
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        isValid = "email is not valid"
    }
    if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$/.test(password)) {
        isValid = "password is not valid"
    }

    return isValid
}


export default FormValidation