
import { connectDB } from "../../../../lib/config/db.js";
import User from "../../../../lib/models/UserModel.js";
export async function POST(request) {
  try {
    await connectDB();
    const { name, email, password } = await request.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    const user = new User({
      name,
      email,
      password,
      role: "admin",
    });

    await user.save();

    return Response.json({
      success: true,
      message: "Admin created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Admin creation error:", error);
    return Response.json({ error: "Failed to create admin" }, { status: 500 });
  }
}
