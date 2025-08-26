import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { IoShareSocial } from "react-icons/io5";
import Link from "next/link";
import { useContext } from "react";
import { authContext } from "../../authContext/authContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const { token, setToken } = useContext(authContext);
  const router = useRouter();

  const handelLogout = () => {
    localStorage.removeItem("token"); // clear storage
    setToken("");
    router.push("/login");
  };
  console.log(token);
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-blue-600">SocialApp</h1>
        {token && (
          <nav className="flex items-center gap-6 text-gray-700 font-medium">
            <Link href={"/"}>Home</Link>
            <Link href={"/profile"}>profile</Link>
            <Link href={"/Friends"}>Friends</Link>
            <Link href={"/Messages"}>Messages</Link>
          </nav>
        )}
        {token ? (
          <button onClick={handelLogout}  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            {<Link href={"/login"}> Logout</Link>}
          </button>
        ) : (
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            {<Link href={"/login"}> Login</Link>}
          </button>
        )}
      </div>
    </header>
  );
}
