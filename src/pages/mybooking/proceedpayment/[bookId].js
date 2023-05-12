import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProceedPayment() {

  const router = useRouter();
  const {bookId} = router.query;
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const [data, setData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const [cardNumber, setCardNumber] = useState('');
  const [cardExpire, setCardExpire] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [paymethodCard, setPaymethodCard] = useState(false);
  const [paymethodPaypal, setPaymethodPaypal] = useState(false);

  const url = 'http://localhost:4000';

  useEffect(() => {
    const token = cookies['user'].token;
    axios.get(`${url}/booking/${bookId}`, {
      headers: {"Authorization": `Bearer ${token}`}
    })
      .then((res) => {
        console.log('success: ', res.data);
        setData(res.data.data[0]);
      })
      .catch((err) => {
        console.log('not success: ', err);
      })
  }, [bookId, cookies]);

  const updatePayment = e => {
    e.preventDefault();
    const token = cookies['user'].token;
    console.log(token);
    axios.put(`${url}/booking/${bookId}`, {
      headers: {"Authorization": `Bearer ${token}`}
    }).then((res) => {
      console.log('success :', res.data);
    }).catch((err) => {
      console.log('error: ', err.response.data);
    })
  }

  return (
    <div className="bg-white h-screen relative pb-48">
        <div className="container mx-auto h-full">
            <Nav />
            <div className="bg-blue-400 p-3 h-3/4">
                <div className="bg-white mx-auto p-6 w-3/4 h-full flex">
                    <div className="w-2/4 h-full border">
                      <p className="text-black font-semibold">Payment Method</p>
                      <div className="bg-gray-50 p-3">
                        <div>
                          <div className="mb-4">
                              <label className="inline-flex items-center text-black text-sm">
                                  <input type="radio" name="paymethod" className="mr-2" value={paymethodCard} onChange={() => setPaymethodCard(true)} checked />
                                  Credit Card
                              </label>
                          </div>
                          <div className="mb-4">
                              <label className="inline-flex items-center text-black text-sm">
                                  <input type="radio" name="paymethod" className="mr-2" value={paymethodPaypal} onChange={() => setPaymethodPaypal(true)} />
                                  Paypal
                              </label>
                          </div>
                          <div className="mb-2">
                            <label className="text-gray-500 text-sm">Card Number</label>
                            <input type="text" className="w-full text-black rounded text-sm" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="0000 0000 0000 0000" />
                          </div>
                          <div className="flex">
                            <div className="mb-2 mr-1">
                              <label className="text-gray-500 text-sm">Expire Date</label>
                              <input type="text" className="w-full text-black rounded text-sm" value={cardExpire} onChange={(e) => setCardExpire(e.target.value)} placeholder="MM/YY" />
                            </div>
                            <div className="mb-2 ml-1">
                              <label className="text-gray-500 text-sm">CVC/CVV</label>
                              <input type="text" className="w-full text-black rounded text-sm" value={cardCVC} onChange={(e) => setCardCVC(e.target.value)} placeholder="000" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-2/4 h-full border">
                      <p className="text-black font-semibold">Summary</p>
                      <div className="flex p-3">
                        <div className="w-2/4">
                          <p className="text-black text-sm">Subtotal</p>
                          <p className="text-black text-sm">Flight Insurance</p>
                          <p className="text-black text-sm font-bold">Total</p>
                        </div>
                        <div className="w-2/4 text-right">
                          {data ? <p className="text-black text-sm">{`$ ${data.subtotal},00`}</p> : <p>-</p>}
                          {data ? <p className="text-black text-sm">$ 5,00</p> : <p>-</p>}
                          {data ? <p className="text-black text-sm font-bold">{`$ ${data.total},00`}</p>: <p>-</p>}
                        </div>
                      </div>
                      <div className="p-3 w-full text-right">
                        <button className="bg-blue-400 border border-blue-400 py-1 px-4 text-white rounded hover:bg-white hover:text-blue-400" onClick={updatePayment}>Checkout</button>
                      </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    </div>
  )
}
