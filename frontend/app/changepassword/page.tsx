import Footer from "@/components/Footer";
import InfoPanel from "@/components/InfoPanel";
import Navbar from "@/components/Navbar";
import ChangePassword from "@/components/ChangePassword";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function changePassword() {

    const cookie = await cookies();
    const token = cookie.get("token");

    if (!token) {
        redirect("/");
    }

    return (
        <div className="w-full flex flex-col min-h-screen bg-customBlueBg text-black">
            <Navbar />
            <div className="flex-grow flex flex-col w-full items-center px-4 md:px-16 mt-6 gap-2 mb-28 md:mb-0 md:gap-8">
                <InfoPanel token={token}/>
                <ChangePassword token={token}/>
            </div>
            <Footer />
        </div>
    )

}
