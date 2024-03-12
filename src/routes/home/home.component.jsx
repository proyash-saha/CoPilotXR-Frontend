import { useState, useContext, useEffect } from "react";
import Axios from "axios";

import { UserContext } from "../../contexts/user.context";

import { API_CODES } from "../../utils/api-code.utils";
import { API_STATUS } from "../../utils/api-status.utils";
import ChatBot from "../../components/chatbot/chatbot.component";

import "./home.styles.scss";

const BASE_URL_FOR_SERVER = "http://localhost:3001";

const Home = () => {
  const { user } = useContext(UserContext);
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleUploadClick = async (event) => {
    const files = event.target.files;

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        const { data } = await Axios.post(
          `${BASE_URL_FOR_SERVER}/images`,
          formData,
          {
            params: { userId: user.id },
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (
          data.status === API_STATUS.internalServerError &&
          data.code === API_CODES.internalServerError
        ) {
          throw new Error("Internal Server Error.");
        }
      }

      if (files.length > 0) {
        setImages([]);
        await getImages();
      }
    } catch (error) {
      console.error(
        "home.component - handleUploadClick() - Error: Image upload failed.\n",
        error
      );
    }
  };

  const handleImageClick = (index) => {
    const newSelectedImages = [...selectedImages];
    const currentIndex = newSelectedImages.indexOf(index);

    if (currentIndex === -1) {
      newSelectedImages.push(index);
    } else {
      newSelectedImages.splice(currentIndex, 1);
    }

    setSelectedImages(newSelectedImages);
  };

  const handleDownloadClick = () => {
    const selectedImagesData = selectedImages.map((index) => images[index]);

    selectedImagesData.forEach((image) => {
      const a = document.createElement("a");
      a.href = image.src;
      a.download = image.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  };

  const getImages = async () => {
    try {
      const result = await Axios.get(`${BASE_URL_FOR_SERVER}/images`, {
        params: { userId: user.id },
      });

      const images = result.data.data;
      images.forEach((image) => {
        const newImage = {
          src: image.src,
          name: image.name,
        };
        setImages((prevImages) => [...prevImages, newImage]);
      });
    } catch (error) {}
  };

  useEffect(() => {
    (async () => {
      try {
        setImages([]);
        await getImages();
      } catch (error) {
        console.error(
          "home.component - useEffect() - Error: Could not get images.\n",
          error
        );
      }
    })();
  }, []);

  return (
    <div className="home-page-container">
      <div className="header-container">
        <label htmlFor="imageUpload" className="upload-button">
          <span>Upload</span>
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleUploadClick}
          multiple
          id="imageUpload"
          style={{ display: "none" }}
        />

        <div>
          {selectedImages.length === 0 && images.length !== 0 && (
            <div>
              <p class="header-message">Select images to download</p>
            </div>
          )}
        </div>

        {selectedImages.length > 0 && (
          <div>
            <button className="download-button" onClick={handleDownloadClick}>
              Download
            </button>
          </div>
        )}
      </div>

      {images.length > 0 && (
        <div className="image-container">
          {images.map((image, index) => (
            <div
              key={index}
              className={`image-box ${
                selectedImages.includes(index) ? "selected" : ""
              }`}
              onClick={() => handleImageClick(index)}
            >
              <img src={image.src} alt={image.name} />
            </div>
          ))}
        </div>
      )}

      <ChatBot />
    </div>
  );
};

export default Home;
