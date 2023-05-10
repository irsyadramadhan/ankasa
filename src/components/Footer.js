import Image from 'next/image';
import Logo from './Logo';

export default function Footer() {
  return (
    <div className='absolute left-0 bottom-0 right-0'>
        <div className="container mx-auto py-1">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <div>
                <Logo />
              </div>
              <div>
                <span className="text-sm text-gray-500">Explore the world with us.</span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="mb-4">
                <span className="text-black text-xl font-semibold">Features</span>
              </div>
              <div>
                <a className="text-sm text-gray-500 hover:text-blue-500" href="#">Find Ticket</a>
              </div>
              <div>
                <a className="text-sm text-gray-500 hover:text-blue-500" href="#">My Booking</a>
              </div>
              <div>
                <a className="text-sm text-gray-500 hover:text-blue-500" href="#">Chat</a>
              </div>
              <div>
                <a className="text-sm text-gray-500 hover:text-blue-500" href="#">Notification</a>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="mb-4">
                <span className="text-black text-xl font-semibold">Download App</span>
              </div>
              <div className="mb-2">
                <a href="https://www.apple.com/id/app-store/" target="_blank"><Image src="/appstore.png" alt="logo" width={158} height={36} /></a>
              </div>
              <div className="mb-2">
                <a href="https://play.google.com/store/" target="_blank"><Image src="/googleplay.png" alt="logo" width={158} height={36} /></a>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="mb-4">
                <span className="text-black text-xl font-semibold">Follow Us</span>
              </div>
              <div className="flex">
                <div className="mr-2 p-1">
                  <a href="https://id-id.facebook.com/" target="_blank"><Image src="/facebook.png" alt="logo" width={24} height={24} /></a>
                </div>
                <div className="mr-2 p-1">
                  <a href="https://twitter.com/" target="_blank"><Image src="/twitter.png" alt="logo" width={24} height={24} /></a>
                </div>
                <div className="mr-2 p-1">
                <a href="https://www.instagram.com/" target="_blank"><Image src="/instagram.png" alt="logo" width={24} height={24} /></a>
                </div>
                <div className="mr-2 p-1">
                <a href="https://www.youtube.com/" target="_blank"><Image src="/youtube.png" alt="logo" width={24} height={24} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto py-2">
          <span className="text-sm text-gray-500">&copy;Ankasa. All rights reserved.</span>
        </div>
    </div>
  )
}
