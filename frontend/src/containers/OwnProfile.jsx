import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FormControl, TextField, Typography, Box, Button } from "@mui/material";
import axios from "axios"
import AuthContext from "../components/context/AuthContext"
import { AvatarUpdateContext } from "../components/context/AvatarUpdateContext"
import DialogImageCrop from "../components/DialogImageCrop"
import "../styles/OwnProfile.css"


const OwnProfile = () => {
    const [file, setFile] = useState(null)
    const [userProfile, setUserProfile] = useState()
    const [form, setForm] = useState({'first_name': '', 'last_name': ''})

    const {authTokens, user} = useContext(AuthContext)
    const {avatarUpdate} = useContext(AvatarUpdateContext)

    const navigate = useNavigate()
    useEffect(() => {
        if(!authTokens) {
            navigate('/login')
        }

        axios.get(`http://127.0.0.1:8000/auth/users/${user.user_id}/`,  { 
            headers: {
                "Authorization": `Bearer ${authTokens.access}`,
            }})
        .then((response) => {
            setUserProfile(response.data)
            setForm({...form, first_name: response.data.first_name, last_name: response.data.last_name})
        })
    }, [])

    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        if (file.size < 1024*1024) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setFile(reader.result);
          };
          reader.readAsDataURL(file);
        } else {
            console.log('to big')
        }
    };

    const handleSubmitProfile = (event) => {
        event.preventDefault()
        axios.patch(`http://127.0.0.1:8000/auth/users/${user.user_id}/`, form, {
            headers: {
                'Authorization': `Bearer ${authTokens.access}`
            }
        })
        .then((response) => {
            console.log(response)
        })
    }

    if (!userProfile) {
        return(
            <h1>...</h1>
        )
    }
    return (
        <Box className="my-profile-container">
            <label htmlFor="upload-photo">
                {/* Upload image for avatar */}
                <input
                    style={{ display: "none" }}
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={(event) => {handleImageSelect(event)}}
                />
                {avatarUpdate ? <img src={avatarUpdate} alt="avatar" className="my-profile-avatar" /> : <img src={userProfile.avatar} alt="avatar" className="my-profile-avatar"/>}
            </label>
            <DialogImageCrop selectedImage={file}/>

            <Box className="profile-form-container">
                <Typography className="profile-form-layout">Your profile</Typography>
               <form onSubmit={handleSubmitProfile} className="profile-form">
                    {/* Form for update profile */}
                    <FormControl fullWidth>
                        <TextField label="First_name" className="profile-form-field" value={form.first_name} onChange={(event) => setForm({...form, first_name: event.target.value})}  /> 
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField label="Last_name" className="profile-form-field" value={form.last_name} onChange={(event) => setForm({...form, last_name: event.target.value})}   /> 
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField disabled label="Email" className="profile-form-field" value={userProfile.email} /> 
                    </FormControl>
                    <Button type="submit" fullWidth className="profile-form-btn">Submit</Button>
                </form> 
            </Box>
        </Box>
    )
}

export default OwnProfile