import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AvatarUpload from "../components/imageCrop";
import { Button } from 'antd';
import { useState } from 'react';

const DialogImageCrop = (open, imageData) => {
    const [selectedImage, setSelectedImage] = useState(null);


    const handleImageSelect = (imageData) => {
        setSelectedImage(imageData);
      };


    return(
        <div>
            <Dialog
                open="false"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Crop your avatar"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <div>
                        {selectedImage && <img src={selectedImage} alt="Avatar Preview" />}
                        <AvatarUpload onImageSelect={handleImageSelect} />
                    </div>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DialogImageCrop