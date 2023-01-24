import { useState } from 'react';
import api from "../services/api";
import fileToBase64 from "../utils/converters";
import './style.css';

function Main() {
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");

  async function handleUploadFormData() {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("/upload/multipart", formData, {
        headers: {
          "Content-Type": "multpart/form-data"
        }
      })
      const { url } = response.data;
      setImage(url);

    } catch (error) {
      console.log(error)
    }
  }

  async function handleUploadBase64() {
    if (!file) return;

    try {
      const imageBase64 = await fileToBase64(file);

      const response = await api.post("/upload/base64", {
        image: imageBase64
      });

      const { url } = response.data;
      setImage(url);

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container">

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        type='button'
        className='btn-orange'
        onClick={handleUploadFormData}
      >
        Upload form-data
      </button>

      <button
        type='button'
        className='btn-purple'
        onClick={handleUploadBase64}
      >
        Upload base64
      </button>

      <div className='upload-img'>
        {image &&
          <img src={image} alt="imagem do upload" />
        }
      </div>
    </div>
  );
}

export default Main;
