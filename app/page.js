import Nav from "../components/Navbar";
import Polygon from "../components/Polygon";

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <Nav />
      <div>
        <div className="relative z-10 border-2 border-red-500">
          <div className="text-3xl text-white">WEB WIDGETS</div>
        </div>
        <div>
          <Polygon />
        </div>
      </div>
    </div>
  );
}
