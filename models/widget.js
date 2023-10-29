import mongoose from "mongoose";
import User from "./user";
var Schema = mongoose.Schema;

const widgetSchema = new Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  widgets: { type: Object },
  layouts: { type: Object },
});

let Widget;
try {
  Widget = mongoose.model("Widget");
} catch (e) {
  Widget = mongoose.model("Widget", widgetSchema);
}

export default Widget;
