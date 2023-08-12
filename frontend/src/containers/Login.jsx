import { React, useState, useContext } from "react";
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography} from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Link } from "react-router-dom";
import AuthContext from "../components/context/AuthContext";
import FormValidation from "../components/FormValidation";


const Login = () => {
    const {loginUser} = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false)
    const [validationError, setValidationError] = useState('')
    const [form, setForm] = useState({'email': '', 'password': ''});
    const {email, password} = form;

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const isValid = FormValidation(email, password)
        
        if (isValid === true) {
            loginUser(form)
        } else {
            setValidationError(isValid)
        }
    }

    return(
        <div className="form-auth-registration">
            <Typography className="form-layout">Login</Typography>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth  >
                    {/* Email field */}
                    <TextField
                        id="email"
                        name="email"
                        className="input-auth-registration"
                        required
                        label="Email"
                        value={form.email}
                        onChange={(event) => setForm({...form, email: event.target.value})}>
                    </TextField>
                </FormControl>
                <FormControl fullWidth>
                    {/* Passwod field with hide-show */}
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        name="password"
                        className="input-auth-registration" 
                        type={showPassword ? "text" : "password"}
                        required 
                        value={form.password}
                        onChange={(event) => setForm({...form, password: event.target.value})} 
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleShowPassword}
                                    edge="end">
                                    {showPassword ? <Visibility /> : <VisibilityOff /> }
                                </IconButton>
                            </InputAdornment>}/>
                            {validationError ? <Typography  fontWeight={700} sx={{color: "#7A42A6",}}>{validationError}</Typography> : ''}
                </FormControl>
                <Button fullWidth type="submit" className="submit-auth-registration">submit</Button>
                <Link className="link-under-login" to="/reset-password"><Typography fontWeight={500} sx={{ marginTop: 1, textAlign: "left", color: "#7A42A6",}}>Forget your password?</Typography></Link>
                <Link className="link-under-login" to="/signup"><Typography fontWeight={500} sx={{ marginTop: 1, textAlign: "left", color: "#7A42A6",}}>Create account</Typography></Link>
            </form>
        </div>
    );
}
export default Login