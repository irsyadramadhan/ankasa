import Logo from "./Logo";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

export default function Nav() {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const removeCookieHandler = () => {
    removeCookie('user');
    router.replace("/");
  };
  return (
    <div className="flex justify-center items-center py-5 space-x-36">
          <div>
            <Logo />
          </div>
          <div className="flex justify-center items-center space-x-12">
            <div>
              <input type="text" className="bg-gray-200 border-none text-black rounded" placeholder="Where you want to go?" />
            </div>
            <div>
              <a className="text-black font-bold" href="#">Find Ticket</a>
            </div>
            <div>
              <a className="text-black font-bold" href="#">My Booking</a>
            </div>
          </div>
          <div>
            {cookies['user'] ? <button className="bg-blue-500 py-2 px-8 text-white w-full" onClick={removeCookieHandler}>Sign Out</button> : <Link href={"/auth/register"}><button className="bg-blue-500 py-2 px-8 text-white w-full">Sign Up</button></Link>}
          </div>
    </div>
  )
}
