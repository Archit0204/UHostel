import Image from "next/image";
import profile from "@/public/profile.jpg";
import logout from "@/public/logout-red.png";
import axios, { isAxiosError } from "axios";

type Cookie = {
    name: string,
    value: string
};

export default async function InfoPanel({ token }: { token: Cookie }) {

    let studentData = null;
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/student/user`, {
            headers: {
                "Authorization": `Bearer ${token?.value}`
            },
            withCredentials: true
        });

        studentData = response.data.studentData;
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
        <div className="flex w-full items-center rounded-md uppercase justify-between border border-gray-200 border-l-4 border-l-customRed bg-white py-4 px-6 shadow-md">
            {/* Profile & Info Section */}
            <div className="flex items-center gap-4">
                <Image src={profile} alt="Profile" className="rounded-full" width={55} height={55} />
                <div className="text-customTextGray">
                <h4 className="text-base font-semibold">Hi, {studentData.firstName} {studentData.lastName}</h4>
                <div className="text-sm text-customTextGray font-medium leading-5 uppercase">
                    <p>{studentData.fatherName}</p>
                    <p>{studentData.username}</p>
                    <p>{studentData.year}-{studentData.campus}-{studentData.course}</p>
                </div>
                </div>
            </div>
            
            {/* Logout Button */}
            <Image src={logout} alt="Logout" className="w-6 h-6 cursor-pointer md:hidden" />
        </div>
    );
}
