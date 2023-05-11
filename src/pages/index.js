import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function App() {
  return (
      <div className="bg-white h-screen relative pb-48">
        <Nav />
        <div className="container mx-auto flex justify-between items-center">
          <div className="w-6/12">
            <div className="text-4xl text-black font-bold">Find your <span className="text-blue-500">Flight</span></div>
            <div className="text-lg text-gray-500">and explore the world with us.</div>
            <div>
              <Image src="/tokyo-1.png" alt="logo" width={500} height={250} />
            </div>
          </div>
          <div className="6/12">
            <div className="">
            <Image src="/tokyo-2.png" alt="logo" width={350} height={225} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
  )
}
