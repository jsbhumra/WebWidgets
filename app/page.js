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
dbConnect()
return (
	<div className="bgcol w-screen h-screen">
	<Nav />
	<div>
		<div className="absolute top-[50%] -translate-y-[50%] z-10">
			<div className="text-5xl text-white font-bold text-center">Welcome to</div>
			<div className="text-8xl text-primary font-extrabold text-center">WebWidgets</div>
			<br></br>
			<div className="text-2xl text-white text-center px-96">Your home to customise, create and ----- widgets according to your needs</div>
			<br></br>
			<a href="./setup">
			<span className=" absolute text-2xl border-2 text-primary font-bold bg-white left-[50%] -translate-x-[50%] px-5 py-2 rounded-lg hover:bg-gray-200 cursor-pointer">Get Started</span>
			</a>
			
		</div>
		<div>
			<Polygon />
		</div>
	</div>
	</div>
);
}
