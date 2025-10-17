import { connectDB } from "@/lib/config/db";
import { NextResponse } from "next/server";
import BlogModel from "@/lib/models/BlogModel";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import cloudinary from "cloudinary";
import streamifier from "streamifier";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request) {
  try {
    await connectDB();
    const blogId = request.nextUrl.searchParams.get("id");
    const userId = request.nextUrl.searchParams.get("userId");
    
    if (blogId) {
      const blog = await BlogModel.findById(blogId);
      return NextResponse.json({ success: true, blog });
    } else if (userId) {

      const blogs = await BlogModel.find({ userId: userId });
      return NextResponse.json({ success: true, blogs });
    } else {
    
      const blogs = await BlogModel.find();
      return NextResponse.json({ success: true, blogs });
    }
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ success: false, message: error.message });
  }
}


export async function POST(request) {
  try {
    await connectDB();
    const formData = await request.formData();
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to Cloudinary using stream
    const uploadFromBuffer = (buffer) =>
      new Promise((resolve, reject) => {
        try {
          const stream = cloudinary.v2.uploader.upload_stream(
            { folder: "blog_images", resource_type: "image" },
            (error, result) => {
              if (error) {
                console.error("Cloudinary upload failed:", error);
                return reject(error);
              }
              resolve(result);
            }
          );
          streamifier.createReadStream(buffer).pipe(stream);
        } catch (err) {
          console.error("Upload stream error:", err);
          reject(err);
        }
      });

    const uploadResponse = await uploadFromBuffer(buffer);

    // Save blog data
    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author") || "Default Author",
      author_img: "/uploads/author_img.png",
      image: uploadResponse.secure_url,
      userId: formData.get("userId"),
      date: Date.now(),
      cloudinary_id: uploadResponse.public_id,
    };

    await BlogModel.create(blogData);

    return NextResponse.json({
      success: true,
      message: "Blog added successfully",
      imageUrl: uploadResponse.secure_url,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    const id = request.nextUrl.searchParams.get("id");
    const userId = request.nextUrl.searchParams.get("userId");
    const userRole = request.nextUrl.searchParams.get("userRole");
    
    if (!id) {
      return NextResponse.json({ success: false, message: "Blog ID required" }, { status: 400 });
    }

    const blog = await BlogModel.findById(id);
    
    // Check if user can delete this blog
    if (userRole !== 'admin' && blog.userId.toString() !== userId) {
      return NextResponse.json({ success: false, message: "Not authorized to delete this blog" }, { status: 403 });
    }

    if (blog && blog.cloudinary_id) {
      await cloudinary.v2.uploader.destroy(blog.cloudinary_id);
    }

    await BlogModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await connectDB();
    const formData = await request.formData();
    const id = formData.get("id");
    
    const updateData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
       date: Date.now(), 
    };

    const imageFile = formData.get("image");
    if (imageFile && imageFile.size > 0) {
      // Get current blog to delete old image from Cloudinary
      const currentBlog = await BlogModel.findById(id);
      
      // Delete old image from Cloudinary
      if (currentBlog.cloudinary_id) {
        await cloudinary.v2.uploader.destroy(currentBlog.cloudinary_id);
      }
      
      // Upload new image
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uploadFromBuffer = (buffer) =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.v2.uploader.upload_stream(
            { folder: "blog_images", resource_type: "image" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          streamifier.createReadStream(buffer).pipe(stream);
        });

      const uploadResponse = await uploadFromBuffer(buffer);
      updateData.image = uploadResponse.secure_url;
      updateData.cloudinary_id = uploadResponse.public_id;
    }

    await BlogModel.findByIdAndUpdate(id, updateData);
    return NextResponse.json({ success: true, message: "Blog updated successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

