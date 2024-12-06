import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config({ path: "src/config/config.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const upload_file = (file, folder) => {
  return new Promise((res, rej) => {
    cloudinary.uploader.upload(
      file, // The file to upload (either from local storage or base64)
      (result) => {
        res({
          public_id: result.public_id, // The unique identifier assigned by Cloudinary
          url: result.url, // The publicly accessible URL of the uploaded image
        });
      },
      {
        resource_type: "auto", // Automatically determines the file type (image, video, etc.)
        folder, // Specifies the folder in Cloudinary to upload the file to
      }
    );
  });
};
export const delete_file = async (file) => {
  const res = await cloudinary.uploader.destroy(file);

  if (res?.result === "ok") return true;
};
