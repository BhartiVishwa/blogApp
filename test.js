const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dbxa8mg0e",
  api_key: "116351359578889",
  api_secret: "VEY2tHty2o_g8h4wURjfnbQahPY",
});


const filePath = "D:/Credmint Tech/blog-app/Assets/blog_pic_16.png"; // <- your image path

cloudinary.uploader.upload(filePath, { folder: "blog_images" })
  .then(result => {
    console.log("Upload successful:", result.secure_url);
  })
  .catch(err => {
    console.error("Upload failed:", err);
  });
