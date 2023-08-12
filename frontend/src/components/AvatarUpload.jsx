import { Box, Button } from '@mui/material';
import {React, useContext, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import axios from 'axios';
import AuthContext from './context/AuthContext';
import { AvatarUpdateContext } from './context/AvatarUpdateContext';


const AvatarUpload = ({selectedImage, onClose}) => {
  const [editor, setEditor] = useState(null);
  const [scale, setScale] = useState(1);
  const [avatarImage, setAvatarImage] = useState()
  const [form, setForm] = useState({'avatar': ''})

  const {authTokens, user} = useContext(AuthContext)
  const {setAvatarUpdate} = useContext(AvatarUpdateContext)
  
  const handleScaleChange = (event) => {
    const scaleValue = parseFloat(event.target.value);
    setScale(scaleValue);
  };

  const handleCropImage = () => {
    if (editor) {
      // Get the cropped image as a canvas
      const canvas = editor.getImageScaledToCanvas();
      canvas.toBlob((blob) => {
        // Convert the canvas to a blob and create a new File object from the Blob and name it 'avatar.png'
        const file = new File([blob], 'avatar.png', { type: 'image/png' });
        
        // Create a new FormData object to send the file as a multipart/form-data
        const formData = new FormData();
        formData.append('avatar', file);
         
        // Send a PATCH request to update the user's avatar on the server
        axios.patch(`http://127.0.0.1:8000/auth/users/${user.user_id}/`, formData, {
          headers: {
            'Authorization': `Bearer ${authTokens.access}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          setAvatarUpdate(response.data.avatar)
          onClose() // Close the crop image dialog or component
        })
        .catch((error) => {
          console.error(error);
        });
      }, 'image/png');
    }
  };
  
  return (
    <Box>
      <div>
        <AvatarEditor
          ref={(editorRef) => setEditor(editorRef)}
          image={selectedImage}
          width={250}
          height={250}
          border={0}
          borderRadius={125}
          scale={scale}
        />
      </div>
      
      <input
        // input scale slider
        type="range"
        min="1"
        max="2"
        step="0.01"
        value={scale}
        onChange={handleScaleChange}
        style={{ accentColor: '#7A42A6', width: '100%', }}
      />
      <Button className="dialog-action-btn" onClick={handleCropImage}>Submit</Button>
    </Box>
  );
};

export default AvatarUpload;
