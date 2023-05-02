import Image from "next/image";

export default function verifyotp() {
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
                        <h1 className="text-black text-4xl font-semibold">Reset Password</h1>
                    </div>
                    <div className="mb-4">
                        <input type="email" className="w-full text-black rounded" placeholder="Email" />
                    </div>
                    <div className="mb-4">
                        <input type="text" className="w-full text-black rounded" placeholder="OTP" />
                    </div>
                    <div className="mb-4">
                        <button className="bg-blue-400 py-2 px-4 rounded text-white w-full">
                            Verify OTP
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
