import { connectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";
export async function POST(request) {
    try{
        await connectDB();
    const formData = await request.formData();
    const emailData = {
        email:`${formData.get("email")}`,
    };
    await EmailModel.create(emailData);
    return NextResponse.json({ success: true, message: "Email saved successfully" });

    }catch(error){
        console.error("POST Error:", error);
        return NextResponse.json({ success: false, message: error.message });
    }
}

export async function GET() {
    const emails = await EmailModel.find({});
    return NextResponse.json({ emails });
}

export async function DELETE(request) {
    
      const id = request.nextUrl.searchParams.get("id");
       await EmailModel.findByIdAndDelete(id);
      return NextResponse.json({ success: true, msg: "Email deleted successfully" });
  }