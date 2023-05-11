import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

export default function ProceedPayment() {

  const router = useRouter();
  const {bookId} = router.query;
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  // const [data, setData] = useState(null);

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const url = 'http://localhost:4000';

  const updatePayment = e => {
    e.preventDefault();
    const token = cookies['user'].token;
    axios.put(`${url}/booking/${bookId}`, {
      headers: {"Authorization": `Bearer ${token}`}
    }).then((res) => {
      console.log('ok');
    }).catch((err) => {
      console.log('error');
    })
  }

  return (
    <div className="bg-white h-screen pb-48">
      <Nav />
      <div className="text-center">
        <p className="text-black text-2xl font-bold">{bookId}, {cookies['user'].token}</p>
        <button className="bg-blue-400 border border-blue-400 py-1 px-4 text-white rounded hover:bg-white hover:text-blue-400" onClick={updatePayment}>Pay</button>
      </div>
      <Footer />
    </div>
  )
}
