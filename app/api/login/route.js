import { dbConnect } from "@/utils/dbConnect";
import { compare, hash } from "bcryptjs";
import User from "@/models/user";

export async function POST(request) {
  dbConnect();
  const body = await request.json();
  const { email, password } = body;

  if (email && password) {
    let user = await User.findOne({ username });
    if (!user) {
      throw new Error("User not found");
    }
  } else {
    return Response.json({ error: "Data Incorrect" });
  }
}
