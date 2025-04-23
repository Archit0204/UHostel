import logo from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {

    return (
        <div className={`w-full flex justify-center md:bg-white py-2 items-center md:justify-between md:items-center md:px-16`}>
            <div className="cursor-pointer">
                <Link href="/studentdashboard">
                    <Image src={logo} alt="Logo"/>
                </Link>
            </div>
            <div className="hidden md:flex">
                <ul className="flex font-semibold cursor-pointer gap-x-6 text-base tracking-wider">
                    <Link href="/studentdashboard"><li className="hover:text-customRed">Home</li></Link>
                    <Link href="/Gatepass"><li className="hover:text-customRed">Gatepass</li></Link>
                    <Link href="/finecollection"><li className="hover:text-customRed">Non-Disciplinary Action</li></Link>
                    <Link href="/hostelcheckout"><li className="hover:text-customRed">Hostel Checkout</li></Link>
                    <Link href="/changepassword"><li className="hover:text-customRed">Change Password</li></Link>
                    <Link href="/"><li className="hover:text-customRed">Logout</li></Link>
                </ul>
            </div>
        </div>
    )

}