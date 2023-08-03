import React, { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';

const AvatarUpload = () => {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editor, setEditor] = useState(null);
  const [scale, setScale] = useState(1);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScaleChange = (event) => {
    const scaleValue = parseFloat(event.target.value);
    setScale(scaleValue);
  };

  const handleCropImage = () => {
    if (editor) {
      const canvas = editor.getImageScaledToCanvas();
      const croppedImage = canvas.toDataURL();
      // Здесь можно отправить croppedImage на сервер или использовать его дальше в вашем приложении
    }
  };

  return (
    <div>
      <AvatarEditor
        ref={(editorRef) => setEditor(editorRef)}
        image={selectedImage}
        width={250}
        height={250}
        border={50}
        borderRadius={125}
        scale={scale}
      />
      <input
        type="range"
        min="1"
        max="2"
        step="0.01"
        value={scale}
        onChange={handleScaleChange}
      />
      <br />
      <button onClick={handleCropImage}>Обрезать и сохранить</button>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <button onClick={() => fileInputRef.current.click()}>Загрузить аватар</button>
    </div>
  );
};

export default AvatarUpload;
