import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";


export default function TestCookie() {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const router = useRouter();
    const setCookieHandler = () => {
        setCookie('new-user', true, {
            path: '/',
        });
        router.replace('/testcookie');
    }
    const removeCookieHandler = () => {
        removeCookie('new-user');
      
        router.replace('/testcookie');
      };
    useEffect(() => {
        console.log('Cookies :', cookies);
    }, [cookies])
  return (
    <div>
        <button onClick={setCookieHandler}>
            Complete new user registration!
        </button>
        <button onClick={removeCookieHandler}>
            Reset new user registration
        </button>
    </div>
  )
}
