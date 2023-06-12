import { React, useState, useRef, useContext } from "react";
import { Button, FormControl, TextField, Typography} from '@mui/material';
import PasswordField from "../components/PasswordField";
import { FormValdation } from "../components/ValidationForm";
import axios from 'axios';
import { Link } from "react-router-dom";
import AuthContext from "../components/context/AuthContext";


const Login = () => {
    const [form, setForm] = useState({'email': '', 'password': ''});
    const {email, password} = form;
    const [validation, setValidation] = useState('')
    const {loginUser} = useContext(AuthContext)


    const handleChangePassword = (passwordData) => {
        setForm({...form, password: passwordData})
    }
    
    return(
        <div className="form-auth-registration">
            <Typography className="form-layout">Login</Typography>
            <form onSubmit={loginUser}>
                <FormControl fullWidth  >
                    <TextField
                        name="email"
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