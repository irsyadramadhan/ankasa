import Nav from "@/components/Nav";
import Image from "next/image";
import Logo from "@/components/Logo";

export default function App() {
  return (
    <>
      <div className="bg-white">
        <Nav />
        <div>
          <div className="flex">
            <div className="w-6/12">
              <div>
                <span className="text-black text-4xl font-semibold">Find your <span className="text-blue-500">Flight</span></span>
              </div>
              <div>
                <span className="text-gray-500 text-xl">and explore the world with us</span>
              </div>
              <div>
                <Image src="/img-landing.png" alt="landing" width={1100} height={500} />
              </div>
            </div>
            <div className="w-6/12">
              <div>
                <Image src="/img-landing.png" alt="landing" width={1100} height={500} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-3/12">
            <div>
              <Logo />
            </div>
            <div>
              <span className="text-gray-500">Explore the world with us.</span>
            </div>
            <div>
              <span className="text-gray-500">Ankasa. All rights reserved.</span>
            </div>
          </div>
          <div className="w-3/12">
            <div>
              <Logo />
            </div>
            <div>
              <span className="text-gray-500">Explore the world with us.</span>
            </div>
            <div>
              <span className="text-gray-500">Ankasa. All rights reserved.</span>
            </div>
          </div>
          <div className="w-3/12">
            <div>
              <Logo />
            </div>
            <div>
              <span className="text-gray-500">Explore the world with us.</span>
            </div>
            <div>
              <span className="text-gray-500">Ankasa. All rights reserved.</span>
            </div>
          </div>
          <div className="w-3/12">
            <div>
              <Logo />
            </div>
            <div>
              <span className="text-gray-500">Explore the world with us.</span>
            </div>
            <div>
              <span className="text-gray-500">Ankasa. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </>
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
