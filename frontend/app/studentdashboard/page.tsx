import Footer from "@/components/Footer";
import InfoPanel from "@/components/InfoPanel";
import Navbar from "@/components/Navbar";
import RouteTiles from "@/components/RouteTiles";
import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Dashboard() {

    const cookie = await cookies();
    const token = cookie.get("token");
    console.log("cookie",token);    
    
    if (!token) {
        redirect("/");
    }

    let userData = null;
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/student/user`, {
            headers: {
                "Authorization": `Bearer ${token.value}`
            },
            withCredentials: true
        });

        userData = response.data.studentData;
    } catch (error: any) {
        console.log("Error fetching user data:", error);

        if (isAxiosError(error)) {
            console.log(error.response?.data);
            
        }
        
        // fallack UI
        return (
            <div>
                Error Fetching Data
            </div>
        )
    }

    return (
        <div className="w-full flex flex-col min-h-screen bg-white text-black">
            <Navbar />
            <div className="flex-grow flex flex-col w-full items-center px-4 md:px-16 mt-6 gap-2 mb-28 md:mb-0 md:gap-8">
                <InfoPanel studentData={userData}/>
                <RouteTiles/>
            </div>
            <Footer />
        </div>
    )

}