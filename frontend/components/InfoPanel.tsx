import Image from "next/image";
import profile from "@/public/profile.jpg";
import logout from "@/public/logout-red.png";

type StudentData = {
    firstName: string | undefined;
    lastName: string | undefined;
    fatherName: string | undefined;
    username: string | undefined;
    course: string | undefined;
    campus: string | undefined;
    year: number | undefined;
    avatar: string | undefined
}

export default function InfoPanel({studentData}: {studentData: StudentData}) {

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
