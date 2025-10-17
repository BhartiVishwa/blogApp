import mongoose from "mongoose";
import { stringify } from "postcss";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  author_img: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true },
    
}, { timestamps: true });

// here we creat model for using this schema
const BlogModel = mongoose.models.Blog || mongoose.model("Blog", schema);

export default BlogModel;
