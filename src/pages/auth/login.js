import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";


export default function Login() {
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);

    const formData = {
        email,
        password,
    };

    const url = 'http://localhost:4000';

    const postData = e => {
        e.preventDefault();
        axios.post(url + '/users/login', formData, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            console.log('ok: ', res.data);
            setCookie('user', res.data.data, { path: '/' });
            router.push('/');
        }).catch((err) => {
            console.log('error: ', err.response.data.message);
            setErrorMsg(err.response.data.message);
        });
    };

  return (
    <div className="flex">
        <div className="bg-center w-8/12" style={{backgroundImage: "url('/bg.png')", height: "100vh"}}></div>
        <div className="bg-white w-4/12">
            <div className="p-10">
                <div className="mb-12">
                    <Image src="/logo.png" alt="logo" width={158} height={36} />
                </div>
                
                <div className="border border-gray-200 rounded p-2">
                    <div className="mb-4">
                        <h1 className="text-black text-4xl font-semibold">Login</h1>
                    </div>
                    <form onSubmit={postData}>
                        <div className="mb-4">
                            <input type="email" className="w-full text-black rounded" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                        </div>
                        <div className="mb-4">
                            <input type="password" className="w-full text-black rounded" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                        </div>
                        {errorMsg && (<div className="mb-4 text-center"><p className="text-red-500">{errorMsg}</p></div>)}
                        <div className="mb-4">
                            <button className="bg-blue-400 py-2 px-4 rounded text-white w-full">
                                Sign In
                            </button>
                        </div>
                    </form>
                    <div className="text-center">
                        <p className="text-black">forgot password?</p>
                        <Link href={"/auth/resetpassword"}><p className="underline text-blue-400">reset password</p></Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
