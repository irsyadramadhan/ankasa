import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

export default function TicketDetails() {

  const router = useRouter();
  const {ticketId} = router.query;
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fullname, setFullname] = useState('');

  const [title, setTitle] = useState('');
  const [nationality, setNationality] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  const url = process.env.NEXT_PUBLIC_API_KEY;
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios.get(`${url}/ticket/${ticketId}`)
      .then((res) => {
        console.log('ok: ', res.data);
        setData(res.data.data[0]);
      })
      .catch((err) => {
        console.log('error: ', err.response.data.message);
      })
  }, [ticketId, url]);

  useEffect(() => {
    axios.get(`${url}/users/${cookies['user']?.id}`)
        .then((res) => {
            console.log('ok: ', res.data);
            setUserData(res.data.data[0]);
        }).catch((err) => {
            console.log('not ok: ', err.response.data.message);
        });
  }, [cookies, url]);

  const imageLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q${quality || 75}`;
  };

  const ticket_id = ticketId;
  const subtotal = data?.price;
  const postData = {ticket_id, subtotal};

  const postBooking = e => {
    e.preventDefault();
    const token = cookies['user'].token;
    axios.post(`${url}/booking`, postData, {
      headers: {"Authorization": `Bearer ${token}`}
    }).then((res) => {
      console.log('ok: ', res.data);
      router.push(`/mybooking/${cookies['user'].id}`);
    }).catch((err) => {
      console.log('error: ', err);
      setErrorMsg('error');
    });
  };

  return (
    <div className="bg-white min-h-screen relative pb-48">
        <Nav selectFindTicket="border-b-4 border-blue-400" />
        <div className="container mx-auto mb-12">
          <div className="bg-blue-400 h-20"></div>
          <div className="flex bg-gray-50 mb-4">
            <div className="w-6/12 p-3">
              <div className="text-black font-bold mb-4">Contact Person Detail</div>
              <div className="mb-2 border-b-2 w-3/4">
                <label className="text-gray-500 text-sm">Fullname</label>
                <input type="text" className="w-full text-black rounded border-none text-sm shadow-md" value={fullname} onChange={(e) => setFullname(e.target.value)} placeholder={`${userData?.fullname || 'Fullname'}`} required />
              </div>
              <div className="mb-2 border-b-2 w-3/4">
                <label className="text-gray-500 text-sm">Email</label>
                <input type="email" className="w-full text-black rounded border-none text-sm shadow-md" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={`${userData?.email || 'Email'}`} />
              </div>
              <div className="mb-2 border-b-2 w-3/4">
                <label className="text-gray-500 text-sm">Phone Number</label>
                <input type="text" className="w-full text-black rounded border-none text-sm shadow-md" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={`${userData?.phone || 'Phone Number'}`} />
              </div>
            </div>
            <div className="w-6/12 p-3">
              <div className="text-black font-bold mb-4">Flight Details</div>
              <div className="bg-white rounded p-3 shadow-lg">
                <div className="flex items-center">
                  <div className="mb-4">
                    <Image loader={imageLoader} src={`${data?.image}`} alt="airline" width={75} height={75} />
                  </div>
                  <div className="text-gray-700 text-sm ml-5">{data?.name}</div>
                </div>
                <div className="mb-4">
                  <p className="text-black text-xl font-semibold">{`${data?.origin_city}(${data?.origin_code}) - ${data?.destination_city}(${data?.destination_code})`}</p>
                </div>
                <div className="mb-4">
                  <p className="text-gray-700 text-xs">{`Thursday, 11 May 2023 • ${data?.time_takeoff} - ${data?.time_landing}`}</p>
                </div>
                <div className="mb-4">
                  <p className="text-black text-sm">{data?.transit ? 'Transit: Yes' : 'Transit: No'}</p>
                  <p className="text-black text-sm">{data?.luggage ? 'Luggage: Yes' : 'Luggage: No'}</p>
                  <p className="text-black text-sm">{data?.meal ? 'Meal: Yes' : 'Meal: No'}</p>
                  <p className="text-black text-sm">{data?.wifi ? 'Wifi: Yes' : 'Wifi: No'}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Subtotal:</p>
                  <p className="text-blue-400 text-lg font-semibold">{`$ ${data?.price},00`}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50">
            <div className="rounded w-6/12 p-3">
              <div className="text-black font-bold mb-4">Passenger Detail</div>
              <div className="mb-2 border-b-2 w-3/4">
                <label className="text-gray-500 text-sm">Title</label>
                <input type="text" className="w-full text-black rounded border-none text-sm shadow-md" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
              </div>
              <div className="mb-2 border-b-2 w-3/4">
                <label className="text-gray-500 text-sm">Fullname</label>
                <input type="text" className="w-full text-black rounded border-none text-sm shadow-md" value={fullname} onChange={(e) => setFullname(e.target.value)} placeholder="Fullname" required />
              </div>
              <div className="mb-2 border-b-2 w-3/4">
                <label className="text-gray-500 text-sm">Nationality</label>
                <input type="text" className="w-full text-black rounded border-none text-sm shadow-md" value={nationality} onChange={(e) => setNationality(e.target.value)} placeholder="Nationality" required />
              </div>
              <div className="w-3/4 text-right mt-6 mb-2">
                <button className="bg-blue-400 border border-blue-400 py-1 px-4 text-white rounded shadow-md hover:bg-white hover:text-blue-400" onClick={postBooking}>Book Ticket</button>
              </div>
              {errorMsg && (<div className="text-center mt-2"><p className="text-red-500 text-sm">{errorMsg}</p></div>)}
            </div>
          </div>
        </div>
        <Footer />
    </div>
  )
}
