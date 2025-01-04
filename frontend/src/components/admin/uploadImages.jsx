import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

import MetaData from "../layout/metaData";
import AdminLayout from "../layout/adminLayout";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProductImageMutation,
  useGetProductDetailsQuery,
  useUploadProductImagesMutation,
} from "../../redux/api/productsApi";

const UploadImages = () => {
  const fileInputRef = useRef(null);
  const params = useParams();
  const navigate = useNavigate();

  const [images, setImages] = useState([]); //images you are going to upload
  const [imagesPreview, setImagesPreview] = useState([]); // images that is being preview in the window when you select your desired images you WANT to upload  
  const [uploadedImages, setUploadedImages] = useState([]); // images that is already uploaded, tied to the product

  const [uploadProductImages, { isLoading, error, isSuccess }] =
    useUploadProductImagesMutation();

  const [deleteProductImage,{ isLoading: isDeleteLoading, error: deleteError, isSuccess : deleteSucess }] = useDeleteProductImageMutation();

  const { data } = useGetProductDetailsQuery(params?.id);

  useEffect(() => {
    if (data?.product) {
      setUploadedImages(data?.product?.images); // set the images already uploaded 
    }

    if (error) {
      toast.error(error?.data?.message);
    }

    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }
    if(deleteSucess) {
      toast.success("Image DELETED");
    }

    if (isSuccess) {
      setImagesPreview([]);
      console.log('SUCESSS')
      toast.success("Images Uploaded");
      navigate("/admin/products");
    }
  }, [data, error, isSuccess, 
    // deleteError
]);

const onChange = (e) => {
    const files = Array.from(e.target.files);  // Step 1:( e.target.files gives you a FileList object) Convert FileList to Array
  
    files.forEach((file) => {  // Step 2: Loop through each file
      const reader = new FileReader();  // Step 3: Create a new FileReader
  
      reader.onload = () => {  // Step 4: Define the onload callback for the FileReader
        if (reader.readyState === 2) {  // Step 5: Check if the reader has finished loading (0 — uninitialized, 1— reading, 2 — done)
          setImagesPreview((oldArray) => [...oldArray, reader.result]);  // Step 6: Update the preview state
          setImages((oldArray) => [...oldArray, reader.result]);  // Step 7: Update the images state
        }
      };
  
      reader.readAsDataURL(file);  // Step 8: Read the file as a Data URL (base64 encoded string)
    });
  };

  const handleResetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImagePreviewDelete = (image) => {
    const filteredImagesPreview = imagesPreview.filter((img) => img != image);

    setImages(filteredImagesPreview);
    setImagesPreview(filteredImagesPreview);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log({ id: params?.id, body: { images } })
    uploadProductImages({ id: params?.id, body: { images } });
  };
  // it wont delete original images gulam made we have to upload new images to OUR cloudinary for that to work. 
  const deleteImage = (imgId) => {
    deleteProductImage({ id: params?.id, body: { imgId } });
  };

  return (
    <AdminLayout>
      <MetaData title={"Upload Product Images"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-8 mt-5 mt-lg-0">
          <form
            className="shadow rounded bg-body"
            encType="multipart/form-data"
            onSubmit={submitHandler}
          >
            <h2 className="mb-4">Upload Product Images</h2>

            <div className="mb-3">
              <label htmlFor="customFile" className="form-label">
                Choose Images
              </label>

              <div className="custom-file">
                <input
                  ref={fileInputRef}
                  type="file"
                  name="product_images"
                  className="form-control"
                  id="customFile"
                  multiple
                  onChange={onChange}
                  onClick={handleResetFileInput}
                />
              </div>

              {imagesPreview?.length > 0 && (
                <div className="new-images my-4">
                  <p className="text-warning">New Images:</p>
                  <div className="row mt-4">
                    {imagesPreview?.map((img, key) => (
                      <div className="col-md-3 mt-2" key={key}>
                        <div className="card">
                          <img
                            src={img}
                            alt="Card"
                            className="card-img-top p-2"
                            style={{ width: "100%", height: "80px" }}
                          />
                          <button
                            style={{
                              backgroundColor: "#dc3545",
                              borderColor: "#dc3545",
                            }}
                            type="button"
                            className="btn btn-block btn-danger cross-button mt-1 py-0"
                            onClick={() => handleImagePreviewDelete(img)}
                          >
                            <i className="fa fa-times"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {uploadedImages?.length > 0 && (
                <div className="uploaded-images my-4">
                  <p className="text-success">Product Uploaded Images:</p>
                  <div className="row mt-1">
                    {uploadedImages?.map((img, key) => (
                      <div className="col-md-3 mt-2" key={key}>
                        <div className="card">
                          <img
                            src={img?.url}
                            alt="Card"
                            className="card-img-top p-2"
                            style={{ width: "100%", height: "80px" }}
                          />
                          <button
                            style={{
                              backgroundColor: "#dc3545",
                              borderColor: "#dc3545",
                            }}
                            className="btn btn-block btn-danger cross-button mt-1 py-0"
                            type="button"
                            disabled={isLoading || isDeleteLoading}
                            onClick={() => deleteImage(img?.public_id)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoading || isDeleteLoading}
            >
              {isLoading ? "Uploading..." : "Upload"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UploadImages;