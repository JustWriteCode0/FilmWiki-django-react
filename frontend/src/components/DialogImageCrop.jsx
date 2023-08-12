import { useEffect, useState } from 'react';
import {Button, Typography, DialogTitle, DialogContentText, DialogContent, DialogActions, Dialog} from "@mui/material";
import AvatarUpload from "../components/AvatarUpload";
import '../styles/DialogImageCrop.css'


const DialogImageCrop = ({selectedImage}) => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        // when user choose some image open dialog for crop-select
        if (selectedImage) {
            setOpen(true)
        }
    }, [selectedImage])

    const handleClose = () => {
        setOpen(false)
    }

    return(
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="dialog-container"
            >
                <DialogTitle id="alert-dialog-title">
                    <Typography className="title-dialog">Crop your avatar</Typography>
                </DialogTitle>
                <DialogContent>
                    <AvatarUpload onClose={handleClose} selectedImage={selectedImage} />
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DialogImageCrop