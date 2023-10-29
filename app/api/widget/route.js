import { dbConnect } from "../../../utils/dbConnect";
import Widget from "../../../models/widget";

export async function POST(request) {
  dbConnect();
  const body = await request.json();

  const { userID, widgets, layouts } = body;

  if (userID && widgets && layouts) {
    try {
      var widget = new Widget({ userID, widgets, layouts });
      var widgetcreated = await widget.save();

      return Response.json(widgetcreated);
    } catch (error) {
      return Response.json({ error: error.message });
    }
  } else {
    return Response.json({ error: "Data Incomplete" });
  }
}

export async function PUT(request) {
  dbConnect();
  const body = await request.json();
  const { userID, widgets, layouts } = body;

  if (userID && widgets && layouts) {
    try {
      const query = { userID: userID };

      await Widget.findOneAndUpdate(query, {
        widgets: widgets,
        layouts: layouts,
      });

      return Response.json({ msg: "Done" });
    } catch (error) {
      return Response.json({ error: error.message });
    }
  } else {
    return Response.json({ error: "Data Incomplete" });
  }
}

export async function GET(request) {
  dbConnect();
  const url = request.url.split("?")[1];
  const urlParams = new URLSearchParams(url);
  const userID = urlParams.get("userID");

  if (userID) {
    try {
      const res = await Widget.findOne({ userID: userID }).exec();

      return Response.json(res);
    } catch (error) {
      return Response.json({ error: error.message });
    }
  } else {
    return Response.json({ error: "Data Incomplete" });
  }
}
