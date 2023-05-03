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
              <div className="ml-24">
                <span className="text-black text-4xl font-semibold">Find your <span className="text-blue-500">Flight</span></span>
              </div>
              <div className="ml-24">
                <span className="text-gray-500 text-xl">and explore the world with us</span>
              </div>
              <div>
                <Image src="/tokyo-1.png" alt="tokyo" width={1000} height={500} />
              </div>
            </div>
            <div className="w-6/12">
              <div>
                <Image src="/tokyo.png" alt="landing" width={1000} height={500} />
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
              <span className="text-gray-500">&copy;Ankasa. All rights reserved.</span>
            </div>
          </div>
          <div className="w-3/12">
            <div>
              <span className="text-black font-semibold">Features</span>
            </div>
            <div>
              <a className="text-gray-500">Find Ticket</a>
            </div>
            <div>
              <a className="text-gray-500">My Booking</a>
            </div>
            <div>
              <a className="text-gray-500">Chat</a>
            </div>
            <div>
              <a className="text-gray-500">Notification</a>
            </div>
          </div>
          <div className="w-3/12">
            <div>
              <span className="text-black font-semibold">Download App</span>
            </div>
            <div>
              <Image src="/appstore.png" alt="logo" width={158} height={36} />
            </div>
            <div>
              <Image src="/googleplay.png" alt="logo" width={158} height={36} />
            </div>
          </div>
          <div className="w-3/12">
            <div>
              <span className="text-black font-semibold">Follow Us</span>
            </div>
            <div>
              <Image src="/facebook.png" alt="logo" width={24} height={24} />
            </div>
            <div>
              <Image src="/twitter.png" alt="logo" width={24} height={24} />
            </div>
            <div>
              <Image src="/instagram.png" alt="logo" width={24} height={24} />
            </div>
            <div>
              <Image src="/youtube.png" alt="logo" width={24} height={24} />
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
