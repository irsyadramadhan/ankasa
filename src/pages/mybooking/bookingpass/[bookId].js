import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

export default function BookingPass() {

    const router = useRouter();
    const {bookId} = router.query;
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [data, setData] = useState(null);
    const url = 'http://localhost:4000';

    useEffect(() => {
        const token = cookies['user'].token;
        axios.get(`${url}/booking/${bookId}`, {
          headers: {"Authorization": `Bearer ${token}`}
        })
          .then((res) => {
            console.log('ok: ', res.data);
            setData(res.data.data[0]);
          })
          .catch((err) => {
            console.log('error: ', err.response.data.message);
          })
      }, [cookies, bookId]);

      const imageLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q${quality || 75}`;
      };

    return (
    <div className="bg-white h-screen relative pb-48">
        <div className="container mx-auto h-full">
            <Nav selectMyBooking="border-b-4 border-blue-500" />
            <div className="bg-blue-400 p-3 h-3/4">
                <div className="bg-white mx-auto w-3/4 h-full">
                    <div><p className="text-black text-2xl font-semibold mb-4 ml-2">Booking Pass</p></div>
                    <div className="border rounded-lg w-3/4 h-3/4 p-2 mx-auto flex">
                        <div className="w-3/4">
                            <div className="flex">
                                <div className="mx-auto mt-6">
                                    <Image loader={imageLoader} src={`${data?.image}`} alt="airline" width={75} height={75} />
                                </div>
                                <div className="mx-auto mt-6">
                                    <p className="text-black text-3xl font-semibold">{`${data?.origin_code} - ${data?.destination_code}`}</p>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="mx-12 mt-6">
                                    <div className="mb-4">
                                        <p className="text-gray-700 text-xs">Code</p>
                                        <p className="text-black text-md font-semibold">3A-10110523</p>
                                    </div>
                                    <div className="mb-4">
                                        <p className="text-gray-700 text-xs">Terminal</p>
                                        <p className="text-black text-md font-semibold">3A</p>
                                    </div>
                                </div>
                                <div className="mx-12 mt-6">
                                    <div className="mb-4">
                                        <p className="text-gray-700 text-xs">Class</p>
                                        <p className="text-black text-md font-semibold">{data?.flight_class}</p>
                                    </div>
                                    <div className="mb-4">
                                        <p className="text-gray-700 text-xs">Gate</p>
                                        <p className="text-black text-md font-semibold">10</p>
                                    </div>
                                </div>
                            </div>
                            <div className="ml-12">
                                <p className="text-gray-700 text-xs">Departure</p>
                                <p className="text-black text-md font-semibold">Thursday, 11 May 2023</p>
                            </div>
                        </div>
                        <div className="w-1/4 border-l border-dashed">
                            <div className="w-full h-full pt-6 pl-9">
                                <Image src="/barcode.png" alt="barcode" width={100} height={150} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    </div>
  )
}
