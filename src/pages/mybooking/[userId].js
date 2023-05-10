import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";

export default function MyBooking() {

  const router = useRouter();
  const {userId} = router.query;

  return (
    <div className="bg-white h-screen relative pb-48">
        <Nav selectMyBooking="border-b-4 border-blue-500" />
        <div className="container mx-auto">
          <div className="flex bg-gray-50">
            <div className="w-4/12">
              <h2 className="text-black">Profile, userId: {userId}</h2>
            </div>
            <div className="w-8/12">
              <h2 className="text-black">My Booking</h2>
            </div>
          </div>
        </div>
        <Footer />
    </div>
  )
}
