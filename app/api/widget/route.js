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
