"use client"
import { useState } from "react";
import ComplaintData from "./ComplaintData";
import ComplaintForm from "./ComplaintForm";
import { Student } from "@/lib/types";

interface Props {
    cookies: {
        name: string;
        value: string;
    };
    student: Student
}

export default function ComplaintContainer({ cookies, student }: Props) {

    const [toggleApply, setToggleApply] = useState(false);

    return (
        <div className="flex flex-col w-full rounded-md border bg-white border-l-4 border-l-customBlue pt-5 pb-10 px-7 mb-12 gap-6 shadow-md">
            <div className="w-full flex justify-between items-center">
                <h3 className="text-base font-semibold text-customRed">Complaint {toggleApply ? "Request": "Status"}</h3>
                <button onClick={() => setToggleApply(!toggleApply)} className="text-base bg-customRed px-2 py-1 text-white rounded-md">{toggleApply ? "View": "Raise Complaint"}</button>
            </div>
            {toggleApply ? <ComplaintForm setToggleApply={setToggleApply} cookies={cookies} student={student}/> : <ComplaintData cookies={cookies}/>}
        </div>
    )
}