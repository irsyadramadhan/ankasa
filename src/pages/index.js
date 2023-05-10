import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function App() {
  return (
      <div className="bg-white h-screen relative pb-48">
        <Nav />
        <div className="text-center text-2xl text-black font-bold">Find your Flight</div>
        <Footer />
      </div>
    // <ul>
    //   <li>
    //     <Link href="/post/24">Go to pages/post/[24].js</Link>
    //   </li>
    //   <li>
    //     <Link href="/about">Go to about.js</Link>
    //   </li>
    // </ul>
  )
}
