import { NavBar } from "@/components/NavBar";


export default function Home() {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Navbar */}
        <NavBar variant="primary">SKINSTRIC</NavBar>


      {/* Main Content */}
      <main className="main-content flex-grow flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">Focus Area</h1>
          <p className="mt-4 text-lg font-roobert">This is the main focus area of the page.</p>
        </div>
      </main>

      <div className="footer w-full p-4 flex justify-between">
        <button className="back-button px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Back
        </button>
        <button className="proceed-button px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
          Proceed
        </button>
      </div>
    </div>
  );
}
