import Footer from "@/components/Footer";
import GatepassContainer from "@/components/GContainer";
import InfoPanel from "@/components/InfoPanel";
import Navbar from "@/components/Navbar";
import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Gatepass() {

    const cookie = await cookies();
    const token = cookie.get("token"); 

    let studentData = null;
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/student/user`, {
            headers: {
                "Authorization": `Bearer ${token?.value}`
            },
            withCredentials: true
        });

        studentData = response.data.studentData;
        console.log(studentData);
        
    } catch (error: any) {
        console.log("Error fetching user data:", error);

        if (isAxiosError(error)) {
            console.log(error.response?.data);
        }
        
        redirect("/");
    }
    
    if (!token) {
        redirect("/");
    }

    return (
        <div className="w-screen flex flex-col min-h-screen bg-customBlueBg text-black">
            <Navbar />
            <div className="flex-grow flex flex-col w-screen items-center px-4 md:px-16 mt-6 gap-2 mb-28 md:mb-0 md:gap-8">
                <InfoPanel student={studentData}/>
                <GatepassContainer cookies={token}/>
            </div>
            <Footer />
        </div>
    )
}