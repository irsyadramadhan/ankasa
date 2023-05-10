import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

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

  return (
    <div className="bg-white h-screen relative pb-48">
        <Nav selectFindTicket="border-b-4 border-blue-400" />
        <div className="container mx-auto">
          <div className="bg-blue-400 h-20 p-6">
            <div className="mx-auto border w-3/4">From Jakarta (CGK) to Dubai (DBX)</div>
          </div>
          <div className="flex bg-gray-50">
            <div className="w-4/12 border">
              <div className="text-black font-bold mb-4">Filter</div>
            </div>
            <div className="w-8/12 border">
              <div className="text-black font-bold mb-4">Select Ticket</div>
              {data?.map((item, index) => (
                <div key={index + 1}>
                  <div className="my-3 mx-auto bg-white border rounded">
                    <div className="text-black">{item.name}</div>
                    <button></button>
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
