import Image from "next/image";
import user from "@/public/user.png";
import logout from "@/public/logout-red.png";
import { Student } from "@/lib/types";
import Link from "next/link";

export default async function InfoPanel({ student }: { student: Student }) {

    return (
        <div className="flex w-full items-center rounded-md uppercase justify-between border border-gray-200 border-l-4 border-l-customRed bg-white py-4 px-6 shadow-md">
            {/* Profile & Info Section */}
            <div className="flex items-center gap-4">
                <Image src={user} alt="Profile" className="rounded-full" width={55} height={55} />
                <div className="text-customTextGray">
                <h4 className="text-lg font-semibold">Hi, {student.firstName} {student.lastName}</h4>
                <div className="text-base text-customTextGray font-semibold leading-5 uppercase">
                    <p>{student.fatherName}</p>
                    <p>{student.username}</p>
                    <p>{student.year}-{student.campus}-{student.course}</p>
                </div>
                </div>
            </div>
            
            {/* Logout Button */}
            <Link href="/" className="w-6 h-6 cursor-pointer md:hidden">
                <Image src={logout} alt="Logout"/>
            </Link>
        </div>
    );
}
