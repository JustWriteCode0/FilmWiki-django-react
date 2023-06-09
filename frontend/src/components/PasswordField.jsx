import {React, useState} from 'react';
import {FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';


const PasswordField = ({handleChange}) => {
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handlePasswordField = (event) => {
        const newValue = event.target.value
        setPassword(newValue)
        handleChange(newValue)
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <FormControl fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                className="input-auth-registration" 
                type={showPassword ? "text" : "password"}
                required 
                value={password}
                onChange={handlePasswordField} 
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        onClick={handleShowPassword}
                        edge="end">
                        {showPassword ? <Visibility /> : <VisibilityOff /> }
                    </IconButton>
                </InputAdornment>}/>
        </FormControl>
    )
}

export default PasswordField