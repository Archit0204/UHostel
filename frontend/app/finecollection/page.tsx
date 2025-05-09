
import FineContainer from "@/components/FineContainer";
import Footer from "@/components/Footer";
import GatepassContainer from "@/components/GContainer";
import InfoPanel from "@/components/InfoPanel";
import Navbar from "@/components/Navbar";
import { Fine, Student } from "@/lib/types";
import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function FineCollection() {

    const cookie = await cookies();
    const token = cookie.get("token"); 

    let studentData = null;
    let fines = null;
    let paidFines = null;

    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/student/fines`, {
            headers: {
                "Authorization": `Bearer ${token?.value}`
            },
            withCredentials: true
        });

        studentData = response.data.data as Student;
        fines = studentData.fines.filter((fine: Fine) => fine.paid === false);
        paidFines = studentData.fines.filter((fine: Fine) => fine.paid === true);
        console.log(studentData);
        console.log(fines);
        console.log(paidFines);

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
                <FineContainer student={studentData} fines={fines} paidFines={paidFines}/>
            </div>
            <Footer />
        </div>
    )
}