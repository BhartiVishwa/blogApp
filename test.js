const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const filePath = "D:/Credmint Tech/blog-app/Assets/blog_pic_16.png"; // <- your image path

cloudinary.uploader.upload(filePath, { folder: "blog_images" })
  .then(result => {
    console.log("Upload successful:", result.secure_url);
  })
  .catch(err => {
    console.error("Upload failed:", err);
  });
