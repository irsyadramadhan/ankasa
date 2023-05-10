import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useCookies } from "react-cookie";

export default function Profile() {

  const router = useRouter();
  const {userId} = router.query;
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fullname, setFullname] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [userData, setUserData] = useState(null);
  const url = 'http://localhost:4000';

  const formData = {email, phone, fullname, city, country};

  const updateData = e => {
    e.preventDefault();
    const token = cookies['user'].token;
    axios.put(`${url}/users/${userId}`, formData, {
        headers: {"Authorization": `Bearer ${token}`}
    }).then((res) => {
        console.log('ok: ', res.data);
        setSuccessMsg('update success!');
    }).catch((err) => {
        console.log('error: ', err);
        setErrorMsg('error');
    })
  }

  useEffect(() => {
    axios.get(`${url}/users/${userId}`)
        .then((res) => {
            console.log('ok: ', res.data);
            setUserData(res.data.data[0]);
        }).catch((err) => {
            console.log('not ok: ', err.response.data.message);
        });
  }, [userId]);

  const imageLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q${quality || 75}`;
  };

  return (
    <div className="bg-white h-screen relative pb-48">
        <Nav />
        <div className="container mx-auto">
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
                    <p className="text-black text-2xl font-semibold">Profile</p>
                </div>
                <div className="flex mb-4">
                    <div className="w-6/12">
                        <p className="text-black text-md font-semibold">Contact</p>
                    </div>
                    <div className="w-6/12">
                        <p className="text-black text-md font-semibold">Biodata</p>
                    </div>
                </div>
                <div>
                    <form onSubmit={updateData}>
                        <div className="flex">
                            <div className="w-6/12">
                                <div className="mb-2 mr-2 border-b-2">
                                    <label className="text-gray-500 text-sm">Email</label>
                                    <input type="email" className="w-full text-black rounded border-none text-sm" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={`${userData?.email || 'Email'}`} required />
                                </div>
                                <div className="mb-2 mr-2 border-b-2">
                                    <label className="text-gray-500 text-sm">Phone Number</label>
                                    <input type="text" className="w-full text-black rounded border-none text-sm" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={`${userData?.phone || 'Phone Number'}`} />
                                </div>
                            </div>
                            <div className="w-6/12">
                                <div className="mb-2 mr-2 border-b-2">
                                    <label className="text-gray-500 text-sm">Fullname</label>
                                    <input type="text" className="w-full text-black rounded border-none text-sm" value={fullname} onChange={(e) => setFullname(e.target.value)} placeholder={`${userData?.fullname || 'Fullname'}`} required />
                                </div>
                                <div className="mb-2 mr-2 border-b-2">
                                    <label className="text-gray-500 text-sm">City</label>
                                    <input type="text" className="w-full text-black rounded border-none text-sm" value={city} onChange={(e) => setCity(e.target.value)} placeholder={`${userData?.city || 'City'}`} />
                                </div>
                                <div className="mb-2 mr-2 border-b-2">
                                    <label className="text-gray-500 text-sm">Country</label>
                                    <input type="text" className="w-full text-black rounded border-none text-sm" value={country} onChange={(e) => setCountry(e.target.value)} placeholder={`${userData?.country || 'Country'}`} />
                                </div>
                                <div className="text-right mt-4 mr-2">
                                    <button className="bg-blue-400 border border-blue-400 py-1 px-4 text-white rounded shadow-md hover:bg-white hover:text-blue-400">Save</button>
                                </div>
                                {successMsg && (<div className="text-center mt-2"><p className="text-green-500 text-sm">{successMsg}</p></div>)}
                                {errorMsg && (<div className="text-center mt-2"><p className="text-red-500 text-sm">{errorMsg}</p></div>)}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
          </div>
        </div>
        <Footer />
    </div>
  )
}
