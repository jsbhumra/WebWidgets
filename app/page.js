import Nav from "../components/Navbar";
import Polygon from "../components/Polygon";
import { dbConnect } from "@/utils/dbConnect";

const GET = async (request) => {
  try {
    dbConnect();
    //return logic here
  } catch (error) {
    //return logic here
  }
};

export default function Home() {
  // GET();
  dbConnect();
  return (
    <div className="bgcol w-screen h-screen">
      <Nav />
      <div>
        {/* <div className="relative z-10 border-2 border-red-500">
          <div className="text-3xl text-white">WEB WIDGETS</div>
        </div> */}
        <div>
          <Polygon />
        </div>
      </div>
    </div>
  );
}
