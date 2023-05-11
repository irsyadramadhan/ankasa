import Logo from "./Logo";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useState } from "react";

export default function Nav({ selectFindTicket, selectMyBooking }) {

  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const removeCookieHandler = () => {
    removeCookie('user');
    router.push('/');
  };

  const findTicketSelected = selectFindTicket ? `${selectFindTicket}` : "";
  const myBookingSelected = selectMyBooking ? `${selectMyBooking}` : "";

  const imageLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q${quality || 75}`;
  };

  const [open, setOpen] = useState(false);

  return (
    <div className="container mx-auto py-5 relative">
      <div className="flex justify-center items-center">
            <div>
              <Link href={"/"}>
                <Logo />
              </Link>
            </div>
            <div className="flex justify-center items-center space-x-12 mx-auto">
              <div>
                <input type="text" className="bg-gray-50 border-none text-black rounded" placeholder="Where you want to go?" />
              </div>
              <div className={`${findTicketSelected}`}>
                <Link className="text-black font-semibold hover:text-blue-400" href="/findticket">Find Ticket</Link>
              </div>
              <div className={`${myBookingSelected}`}>
                {cookies['user'] ? <Link className="text-black font-semibold hover:text-blue-400" href={`/mybooking/${cookies['user'].id}`}>My Booking</Link> : <Link className="text-black font-semibold hover:text-blue-400" href={`/auth/login`}>My Booking</Link>}
              </div>
            </div>
            <div>
              {cookies['user'] ?
                <div>
                  <div className="w-8 h-8 rounded-full overflow-hidden" onClick={() => {setOpen(!open)}}><Image className="w-full h-full object-cover" loader={imageLoader} src={`${cookies['user'].photo}`} alt="user photo" width={50} height={50} /></div>
                  {open && (
                    <div className="bg-gray-100 rounded shadow-md p-1 absolute right-1">
                      <Link href={`profile/${cookies['user'].id}`}><p className="text-black text-sm hover:bg-blue-400 hover:text-white cursor-pointer">Profile</p></Link>
                      <p className="text-red-500 text-sm hover:bg-red-500 hover:text-white cursor-pointer" onClick={removeCookieHandler}>Sign Out</p>
                    </div>
                  )}
                </div>
                :
                <Link href={"/auth/register"}><div className="bg-blue-400 border border-blue-400 py-1 px-4 text-white rounded hover:bg-white hover:text-blue-400">Sign Up</div></Link>}
            </div>
      </div>
    </div>
  )
}
