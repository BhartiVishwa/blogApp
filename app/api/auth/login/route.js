
import { connectDB } from "../../../../lib/config/db.js";
import User from "../../../../lib/models/UserModel.js";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    await connectDB();
    const { email, password } = await request.json();

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });

    return Response.json({
  token,
  user: { id: user._id, name: user.name, email: user.email, role: user.role  }
});
  } catch (error) {
    return Response.json({ error: "Login failed" }, { status: 500 });
  }
}
