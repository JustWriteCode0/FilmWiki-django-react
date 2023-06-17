import { React, useState } from "react";
import { FormControl, TextField, Button, Typography, IconButton, InputAdornment, OutlinedInput, InputLabel, Input, Fab, avatarClasses } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material'
import axios from 'axios';    
import "../styles/FormAuthRegistration.css"
import { useNavigate } from "react-router-dom";


const Signup = () => {
    const [form, setForm] = useState({'first_name': '', 'last_name': '', 'email': '', 'password': ''});
    const {first_name, last_name, email, password} = form;
    const [showPassword, setShowPassword] = useState(false)
    const [serverResponse, setServerResponse] = useState('')
    const [errors, setErrors] = useState({email: '', password: ''})
    const [avatar, setAvatar] = useState('')
    
    const navigate = useNavigate()
    
    const handleRegistration = (event) => {
        event.preventDefault();
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            setErrors({email: "Email is not valid"})
            console.log(errors.email)
        } else {
            setErrors({email: ''})
            if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$/.test(password)) {
                setErrors({password: 'Password should contain 1 special charter 1 digit 1 lower case and upper case'})
            } else {        
                axios.post('http://127.0.0.1:8000/auth/users/', {first_name, last_name, email, password, avatar}, { 
                headers: {
                    "Content-Type": "multipart/form-data",
                }})
                .then((response) => {
                    if (response.status === 201) {
                        navigate('/login')
                    }
                })
            }
        }
    }

    const handleImageChange = (event) => {
        console.log(event.target.value)
        setAvatar(event.target.value)
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
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
                    {errors.email ? <Typography fontWeight={700} sx={{color: "#7A42A6",}}>{errors.email}</Typography> : ''}
                </FormControl>
                <FormControl fullWidth>
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
                            {errors.password ? <Typography  fontWeight={700} sx={{color: "#7A42A6",}}>{errors.password}</Typography> : ''}
                </FormControl>
                <div className="avatar-btn-container">
                <label htmlFor="upload-photo" >
                    <input
                        style={{ display: "none" }}
                        id="upload-photo"
                        name="upload-photo"
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={(event) => {handleImageChange(event)}}
                    />
                    <Button aria-label="add" component="span" className="choose-avatar-btn">
                        {avatar ? avatar : 'Upload avatar'}
                    </Button>     
                </label>
                </div>
                
                {serverResponse ? <Typography  fontWeight={700} sx={{color: "#7A42A6",}}>{serverResponse}</Typography> : ''}
                <Button fullWidth className="submit-auth-registration" type="submit">submit</Button>
            </form>
        </div>
    )} 


export default Signup