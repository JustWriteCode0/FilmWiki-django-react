import { React, useState } from "react";
import { FormControl, TextField, Button, Typography } from "@mui/material";
import axios from 'axios';
import "../styles/FormAuthRegistration.css"
import PasswordField from "../components/PasswordField";
import { FormValdation } from "../components/ValidationForm";


const Signup = () => {
    const [form, setForm] = useState({'first_name': '', 'last_name': '', 'email': '', 'password': ''});
    const {first_name, last_name, email, password} = form;
    const [validation, setValidation] = useState('')
    
    
    const handleRegistration = (event) => {
        event.preventDefault();
        const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
        const emailPattern = /\S+@\S+\.\S+/;
        if (!emailPattern.test(email)) {
            setValidation('Email incorect')
        } else {
            setValidation('')
            if (!passwordPattern.test(password)) {
                setValidation('Password: 8-20 characters, 1 number, 1 letter, 1 symbol')
            } else {
                axios.post('http://127.0.0.1:8000/auth/users/', {first_name, last_name, email, password})
                .then((response) => {
                    console.log(response)
                })
            }
        }
    }
        
    const handleChangePassword = (dataPassword) => {
        setForm({...form, password: dataPassword})
    }

    return (
        <div className="form-auth-registration">
            <Typography className="form-layout">Registration</Typography>
            <form onSubmit={handleRegistration}>
                <FormControl fullWidth>
                    <TextField className="input-auth-registration" required label="First_name" value={form.first_name} onChange={(event) => setForm({...form, first_name: event.target.value})} /> 
                </FormControl>
                <FormControl fullWidth>
                    <TextField className="input-auth-registration" required label="Last_name" value={form.last_name} onChange={(event) => setForm({...form, last_name: event.target.value})} /> 
                </FormControl>
                <FormControl fullWidth>
                    <TextField className="input-auth-registration" required label="Email" value={form.email} onChange={(event) => setForm({...form, email: event.target.value})} /> 
                </FormControl>
                <PasswordField handleChange={handleChangePassword} />
                <Typography fontWeight={700} sx={{
                    color: "#7A42A6",
                }}>{validation}</Typography>
                <Button fullWidth className="submit-auth-registration" type="submit">submit</Button>
            </form>
        </div>
    )} 


export default Signup