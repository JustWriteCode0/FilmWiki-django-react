import {React, useState} from "react";
import { FormControl, TextField, Typography, Button } from "@mui/material";

const ResetPassword = () => {
    const [email, setEmail] = useState('')
    const handleResetPassword = () => {
        console.log(email)
    }
    return (
        <div className="form-auth-registration">
            <Typography className="form-layout">Reset password</Typography>
            <form onSubmit={handleResetPassword}>
                <FormControl fullWidth  >
                    <TextField
                        className="input-auth-registration"
                        required
                        label="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}>
                    </TextField>
                </FormControl>
                <Button fullWidth type="submit" className="submit-auth-registration">submit</Button>
            </form>
        </div>
    )
}

export default ResetPassword