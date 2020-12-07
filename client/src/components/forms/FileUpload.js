import React from "react";
import Resizer from "react-image-file-resizer";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { Image, Badge } from "antd";

const FileUpload = ({ formData, setFormData, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const uploadedImagesUri = [];

  const { images } = formData;

  const fileUploadAndResize = (e) => {
    const files = [...e.target.files];

    if (files) {
      setLoading(true);
      for (const file of files) {
        Resizer.imageFileResizer(
          file,
          720,
          720,
          "JPEG",
          100,
          0,
          async (uri) => {
            // console.log(uri);

            try {
              const res = await axios.post(
                `${process.env.REACT_APP_API}/uploadimages`,
                { image: uri },
                {
                  headers: {
                    authtoken: user.token,
                  },
                }
              );
              //setLoading(false);
              uploadedImagesUri.push(res.data);
              setLoading(false);
              setFormData({ ...formData, images: uploadedImagesUri });
            } catch (error) {
              console.log(error);
              setLoading(false);

              toast.error(`Failed to upload "${file.name}"`);
            }
          },
          "base64"
        );
      }
    }
  };

  const handleRemoveImage = async (public_id) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/deleteimage`,
        { public_id },
        {
          headers: {
            authtoken: user.token,
          },
        }
      );

      //   console.log(res.data);

      const filteredImages = images.filter(
        (image) => image.public_id !== public_id
      );

      setFormData({ ...formData, images: filteredImages });

      setLoading(false);
      toast.success("Successfully deleted image");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to delete image");
    }
  };

  return (
    <>
      <div className="row">
        {images &&
          images.map((image) => (
            <Badge
              count="X"
              className="m-3"
              key={image.public_id}
              onClick={() => handleRemoveImage(image.public_id)}
              style={{ cursor: "pointer" }}
            >
              <Image width={200} src={image.url} />
            </Badge>
          ))}
      </div>
      <div className="row p-3">
        <label className="btn btn-primary">
          Upload Images
          <input
            type="file"
            accept="image/*"
            hidden
            multiple
            onChange={(e) => fileUploadAndResize(e)}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
