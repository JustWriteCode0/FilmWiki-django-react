import { React, useState, useRef } from "react";
import { Button, FormControl, TextField, Typography} from '@mui/material';
import PasswordField from "../components/PasswordField";
import { FormValdation } from "../components/ValidationForm";
import axios from 'axios';
import { Link } from "react-router-dom";


const Login = () => {
    const [form, setForm] = useState({'email': '', 'password': ''});
    const {email, password} = form;
    const [token, setToken] = useState('')
    const [validation, setValidation] = useState('')

    


    const handleLogin = (event) => {
        event.preventDefault() 
        const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
        const emailPattern = /\S+@\S+\.\S+/;
        if (!emailPattern.test(email)) {
            setValidation('Email incorrect')
        } else {
            setValidation('')
            if (!passwordPattern.test(password)) {
                setValidation('Password: 8-20 characters, 1 number, 1 letter, 1 symbol');
            } else {
                setValidation('')
                console.log('yes')
                axios.post('http://127.0.0.1:8000/auth/jwt/create', {email, password})
                .then((response) => {
                    setToken(response.data.access)  
                }
                )
            }   
        }      
    }
        
    const handleChangePassword = (passwordData) => {
        setForm({...form, password: passwordData})
    }
    
    return(
        <div className="form-auth-registration">
            <Typography className="form-layout">Login</Typography>
            <form onSubmit={handleLogin}>
                <FormControl fullWidth  >
                    <TextField
                        className="input-auth-registration"
                        required
                        label="Email"
                        value={form.email}
                        onChange={(event) => {setForm({...form, email: event.target.value})}}>
                    </TextField>
                </FormControl>
                <PasswordField handleChange={handleChangePassword} />
                <Typography  fontWeight={700} sx={{
                    color: "#7A42A6",
                }}>{validation}</Typography>
                <Button fullWidth type="submit" className="submit-auth-registration">submit</Button>
                <Link className="link-under-login" to="/reset-password"><Typography fontWeight={500} sx={{ marginTop: 1, textAlign: "left", color: "#7A42A6",}}>Forget your password?</Typography></Link>
                <Link className="link-under-login" to="/signup"><Typography fontWeight={500} sx={{ marginTop: 1, textAlign: "left", color: "#7A42A6",}}>Create account</Typography></Link>
            </form>
        </div>
    );
}
export default Login