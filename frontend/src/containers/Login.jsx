import { React, useState, useContext } from "react";
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography} from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Link } from "react-router-dom";
import AuthContext from "../components/context/AuthContext";
import {useFormik} from "formik"


const Login = () => {
    const {loginUser} = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({email: '', password: ''})

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
                setErrors({email: "Email is not valid"})
                console.log(errors.email)
            } else {
                setErrors({email: ''})
                if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$/.test(values.password)) {
                    setErrors({password: 'Password should contain 1 special charter 1 digit 1 lower case and upper case'})
                } else {
                    setErrors({password: ''})
                    await loginUser(values)
                }
            }
        },
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        formik.handleSubmit(e)
    }

    return(
        <div className="form-auth-registration">
            <Typography className="form-layout">Login</Typography>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth  >
                    <TextField
                        id="email"
                        name="email"
                        className="input-auth-registration"
                        required
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}>
                    </TextField>
                    {errors.email ? <Typography  fontWeight={700} sx={{color: "#7A42A6",}}>{errors.email}</Typography> : ''}
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        name="password"
                        className="input-auth-registration" 
                        type={showPassword ? "text" : "password"}
                        required 
                        value={formik.values.password}
                        onChange={formik.handleChange} 
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleShowPassword}
                                    edge="end">
                                    {showPassword ? <Visibility /> : <VisibilityOff /> }
                                </IconButton>
                            </InputAdornment>}/>
                            {errors.password ? <Typography  fontWeight={700} sx={{color: "#7A42A6",}}>{errors.password}</Typography> : ''}
                </FormControl>
                <Button fullWidth type="submit" className="submit-auth-registration">submit</Button>
                <Link className="link-under-login" to="/reset-password"><Typography fontWeight={500} sx={{ marginTop: 1, textAlign: "left", color: "#7A42A6",}}>Forget your password?</Typography></Link>
                <Link className="link-under-login" to="/signup"><Typography fontWeight={500} sx={{ marginTop: 1, textAlign: "left", color: "#7A42A6",}}>Create account</Typography></Link>
            </form>
        </div>
    );
}
export default Login