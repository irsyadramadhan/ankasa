import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Register() {
    const router = useRouter();
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);

    const formData = {
        fullname,
        email,
        password,
        confirm_password: confirmPassword,
    };

    const url = 'http://localhost:4000';

    const postData = e => {
        e.preventDefault();
        axios.post(url + '/users/register', formData, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            console.log('ok: ', res.data.message);
            router.push('/auth/login');
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
                        <h1 className="text-black text-4xl font-semibold">Register</h1>
                    </div>
                    <form onSubmit={postData}>
                        <div className="mb-4">
                            <input type="text" className="w-full text-black rounded" value={fullname} onChange={(e) => setFullname(e.target.value)} placeholder="Fullname" />
                        </div>
                        <div className="mb-4">
                            <input type="email" className="w-full text-black rounded" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                        </div>
                        <div className="mb-4">
                            <input type="password" className="w-full text-black rounded" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                        </div>
                        <div className="mb-4">
                            <input type="password" className="w-full text-black rounded" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
                        </div>
                        <div className="mb-4">
                            <label className="inline-flex items-center text-black">
                                <input type="checkbox" className="mr-2" />
                                Accept terms and conditions
                            </label>
                        </div>
                        {errorMsg && (<div className="mb-4 text-center"><p className="text-red-500">{errorMsg}</p></div>)}
                        <div className="mb-4">
                            <button className="bg-blue-400 py-2 px-4 rounded text-white w-full">
                                Sign Up
                            </button>
                        </div>
                    </form>
                    <div className="mb-4 text-center">
                        <p className="text-black">Have account already?</p>
                    </div>
                    <div>
                    <Link href={"/auth/login"}>
                            <button className="border border-blue-400 py-2 px-4 rounded text-blue-400 w-full">
                                Sign In
                            </button>
                    </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
