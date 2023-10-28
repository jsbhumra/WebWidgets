import dbConnect from "@/utils/dbConnect";
import { compare, hash } from "bcryptjs";
import User from "@/models/user";

export async function POST(request) {
  const body = await request.json();
  const { fname, lname, email, password } = body;

  if (fname && lname && email && password) {
    try {
      var passwordhash = await hash(password, 10);
      var user = new User({
        fname,
        lname,
        email,
        password: passwordhash,
      });

      var usercreated = await user.save();
      return Response.json(usercreated);
    } catch (error) {
      return Response.json({ error: error.message });
    }
  } else {
    return Response.json({ error: "Data Incomplete" });
  }
}
