import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function FindTicket() {

  const url = 'http://localhost:4000';
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${url}/ticket`)
      .then((res) => {
        console.log('ok: ', res.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log('error: ', err.response.data.message);
      })
  }, []);

  const imageLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q${quality || 75}`;
  };

  return (
    <div className="bg-white relative pb-48 min-h-screen">
        <Nav selectFindTicket="border-b-4 border-blue-400" />
        <div className="container mx-auto">
          <div className="bg-blue-400 h-20 p-6">
            <div className="mx-auto border w-3/4">From Jakarta (CGK) to Dubai (DBX)</div>
          </div>
          <div className="flex bg-gray-50 mb-10">
            <div className="w-4/12 border">
              <div className="text-black font-bold mb-4">Filter</div>
            </div>
            <div className="w-8/12 border">
              <div className="text-black font-bold mb-4">Select Ticket</div>
              {data?.map((item, index) => (
                <div key={index + 1}>
                  <div className="my-3 mx-auto bg-white border rounded p-4 shadow-lg h-28">
                    <div className="flex items-center mb-4">
                      <div>
                        <Image loader={imageLoader} src={`${item.image}`} alt="airline" width={75} height={75} />
                      </div>
                      <div className="text-black text-sm text-gray-700 ml-5">{item.name}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-black text-2xl font-semibold">{`${item.origin_code} - ${item.destination_code}`}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-md">{item.flight_duration}</p>
                      </div>
                      <div>
                        <p className="text-blue-500 text-md font-semibold">{`$ ${item.price},00/pax`}</p>
                      </div>
                      <div>
                        <Link href={`/findticket/${item.id}`}><div className="bg-blue-400 border border-blue-400 px-2 text-white rounded shadow-lg hover:bg-white hover:text-blue-400">Select</div></Link>
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
