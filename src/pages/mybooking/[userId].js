import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import Image from "next/image";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function MyBooking() {

  const router = useRouter();
  const {userId} = router.query;
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const [userData, setUserData] = useState(null);
  const [data, setData] = useState([]);
  const url = 'http://localhost:4000';

  useEffect(() => {
    axios.get(`${url}/users/${userId}`)
        .then((res) => {
            console.log('ok: ', res.data);
            setUserData(res.data.data[0]);
        }).catch((err) => {
            console.log('not ok: ', err.response.data.message);
        });
  }, [userId]);

  useEffect(() => {
    const token = cookies['user'].token;
    axios.get(`${url}/booking/mybooking`, {
      headers: {"Authorization": `Bearer ${token}`}
    })
      .then((res) => {
        console.log('ok: ', res.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log('error: ', err.response.data.message);
      })
  }, [cookies]);

  const imageLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q${quality || 75}`;
  };

  return (
    <div className="bg-white min-h-screen relative pb-48">
        <Nav selectMyBooking="border-b-4 border-blue-500" />
        <div className="container mx-auto mb-8">
        <div className="flex bg-gray-50">
            <div className="w-4/12 border rounded p-5">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto">
                    <Image className="w-full h-full object-cover" loader={imageLoader} src={`${userData?.photo}`} alt="user photo" width={50} height={50} />
                </div>
                <div className="mx-auto mt-4">
                    <p className="text-black text-center text-xl font-semibold">{userData?.fullname}</p>
                    <p className="text-black text-center text-sm">{`${userData?.city}, ${userData?.country}.`}</p>
                </div>
            </div>
            <div className="w-8/12 border rounded p-5">
                <div className="mb-4">
                    <p className="text-black text-2xl font-semibold">My Booking</p>
                </div>
                {data?.map((item, index) => (
                <div key={index + 1}>
                  <div className="my-3 mx-auto bg-white border rounded p-4 shadow-lg h-28">
                    <div className="mb-4">
                      <p className="text-gray-700 text-xs">{`Thursday, 11 May 2023 • ${item.time_takeoff} - ${item.time_landing}`}</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-1/4">
                        <p className="text-black text-2xl font-semibold">{`${item.origin_code} - ${item.destination_code}`}</p>
                      </div>
                      <div className="w-1/4">
                        <p className="text-gray-500 text-md">{item.name}</p>
                      </div>
                      <div className="w-1/4 mr-12 text-center">
                        {item.paid ? (<p className="bg-green-500 text-xs font-semibold py-1 rounded">Eticket Issued</p>) : (<p className="bg-amber-500 text-xs font-semibold py-1 rounded">Waiting for Payment</p>)}
                      </div>
                      <div className="w1/4">
                        {item.paid ? (<Link href={`/mybooking/bookingpass/${item.id}`}><button className="bg-blue-400 border border-blue-400 px-6 py-1 text-white text-xs rounded shadow-lg hover:bg-white hover:text-blue-400">Show Pass</button></Link>) : (<Link href={`/mybooking/proceedpayment/${item.id}`}><button className="bg-blue-400 border border-blue-400 px-6 py-1 text-white text-xs rounded shadow-lg hover:bg-white hover:text-blue-400">Pay</button></Link>)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
    </div>
  )
}
