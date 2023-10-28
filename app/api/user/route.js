import dbConnect from "@/utils/dbConnect";
import bcrypt from "bcrypt";
import User from "@/models/user";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { fname, lname, email, password } = req.body;
    if (fname && lname && email && password) {
      try {
        var passwordhash = await bcrypt.sign(password);
        var user = new User({
          fname,
          lname,
          email,
          password: passwordhash,
        });

        var usercreated = await user.save();
        return res.status(200).send(usercreated);
      } catch (error) {
        return res.status(500).send(error.message);
      }
    } else {
      res.status(422).send("data_incomplete");
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default dbConnect();

// export async function GET(request) {
//   return new Response("Hello, Next.js!");
// }
