import { FaHome, FaKeyboard  } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";

export default function Footer() {

    return (
        <div className="w-full fixed bottom-0 bg-white border-t text-customMidGray md:hidden py-5">
            <ul className="flex justify-around">
                <li>
                    <div className="flex flex-col items-center justify-center">
                        <FaHome className="text-3xl"/>
                        <p className="text-xs">Home</p>
                    </div>
                </li>
                <li>
                    <div className="flex flex-col items-center justify-center">
                        <IoMdNotifications className="text-3xl"/>
                        <p className="text-xs">Gatepass</p>
                    </div>
                </li>
                <li>
                    <div className="flex flex-col items-center justify-center">
                        <FaKeyboard className="text-3xl"/>
                        <p className="text-xs">Change Password</p>
                    </div>
                </li>
                <li>
                    <div className="flex flex-col items-center justify-center">
                        <IoMdNotifications className="text-3xl"/>
                        <p className="text-xs">Notifications</p>
                    </div>
                </li>
            </ul>
        </div>
    )

}