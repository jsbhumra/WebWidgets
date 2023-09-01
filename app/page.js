import Nav from "../components/Navbar";
import Polygon from "../components/Polygon";
import dbConnect from '../utils/dbConnect';

export default function Home() {
  dbConnect()
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
