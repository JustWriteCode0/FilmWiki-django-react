import { React, useState } from "react";
import { FormControl, TextField, Button, Typography } from "@mui/material";
import axios from 'axios';
import "../styles/FormAuthRegistration.css"
import PasswordField from "../components/PasswordField";


const RegistrationPage = () => {
    const [form, setForm] = useState({'username': '', 'email':  '', 'last_name': '', 'password': '', 'password1': ''});
    const {username, first_name, last_name, password, password2} = form;
    const [validation, setValidation] = useState(['']);

    const handleRegistration = e => {
    console.log('reg wath called')
    e.preventDefault();
    if (form.password === form.password1) {
        axios.post('http://127.0.0.1:8000/auth/users/', {username, password})
        .then((response) => {
            console.log(response)
        })
    } else {
        setValidation('Password invalid')
    }
    }
    
    const handleChangePassword = (dataPassword) => {
        setForm({...form, password: dataPassword})
    }

    const handleChangePassword1 = (dataPassword1) => {
        setForm({...form, password1: dataPassword1})
    }
    return (
        <div className="form-auth-registration">
            <Typography className="form-layout">Registration</Typography>
            <form onSubmit={handleRegistration}>
                <FormControl fullWidth>
                    <TextField className="input-auth-registration" required label="username" value={form.username} onChange={(e) => setForm({...form, username: e.target.value})} /> 
                </FormControl>
                <PasswordField handleChange={handleChangePassword} />
                <PasswordField handleChange={handleChangePassword1} />
                <Typography fontWeight={700} sx={{
                    color: "#7A42A6",
                }}>{validation}</Typography>
                <Button fullWidth className="submit-auth-registration" type="submit">submit</Button>
            </form>
        </div>
    )
} 

export default RegistrationPage