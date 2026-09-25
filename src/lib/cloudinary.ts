import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export { cloudinary };

export async function uploadToCloudinary(fileBuffer: Buffer, folder: string = "raveliant") {
  return new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: "auto",
        },
        (error, result) => {
          if (error || !result) {
            reject(error || new Error("Upload failed"));
          } else {
            resolve({
              secure_url: result.secure_url,
              public_id: result.public_id,
            });
          }
        }
      )
      .end(fileBuffer);
  });
}
