
import { connectDB } from "../../../../lib/config/db.js";
import User from "../../../../lib/models/UserModel.js";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    await connectDB();
    const { name, email, password } = await request.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    const user = await User.create({ name, email, password });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24hr",
    });

    return Response.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return Response.json({ error: "Signup failed" }, { status: 500 });
  }
}
