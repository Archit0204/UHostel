import logo from "@/public/logo.png";
import Image from "next/image";

export default function Navbar() {

    return (
        <div className="w-full flex justify-center py-2 items-center md:justify-between md:items-center md:px-16">
            <div>
                <Image src={logo} alt="Logo"/>
            </div>
            <div className="hidden md:flex">
                <ul className="flex font-semibold gap-x-6 text-sm tracking-wider">
                    <li>Home</li>
                    <li>Gatepass</li>
                    <li>Non-Disciplinary Action</li>
                    <li>Hostel Checkout</li>
                    <li>Change Password</li>
                    <li>Logout</li>
                </ul>
            </div>
        </div>
    )

}