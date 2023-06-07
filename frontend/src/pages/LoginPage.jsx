import { React, useState } from "react";
import { Button, FormControl, TextField, Typography} from '@mui/material';
import PasswordField from "../components/PasswordField";
import axios from 'axios';


const LoginPage = () => {
    const [form, setForm] = useState({'username': '', 'password': ''});
    const {username, password} = form;
    const [token, setToken] = useState('')

    const handleChangePassword = (passwordData) => {
        setForm({...form, password: passwordData})
    }

    const handleLogin = (event) => {
        event.preventDefault()
        axios.post('http://127.0.0.1:8000/auth/jwt/create', {username, password}) 
        .then((response) => {
            setToken(response.data.access)   
              }
            )
        }
    
    
    return(
        <div className="form-auth-registration">
            <Typography className="form-layout">Login</Typography>
            <form onSubmit={handleLogin}>
                <FormControl fullWidth  >
                    <TextField className="input-auth-registration" required label="username" value={form.username} onChange={(e) => {setForm({...form, username: e.target.value})}}></TextField>
                </FormControl>
                <PasswordField handleChange={handleChangePassword} />
                <Button fullWidth type="submit" className="submit-auth-registration">submit</Button>
            </form>
        </div>
    );
}
export default LoginPage