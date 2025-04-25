"use client"
import { useState } from "react";
import Terms from "./Terms";

export default function AllotmentContainer() {

    const [submitted, setSubmitted] = useState(false);

    return (
        <div className="flex flex-col w-full rounded-md border bg-white border-l-4 border-l-customGreen pt-7 pb-10 px-8 md:px-16 mb-12 gap-6 shadow-md">
            <div className="w-full flex justify-between pb-5 items-center border-b">
                <h3 className="text-xl font-normal text-black">IMPORTANT INSTRUCTIONS FOR <span className="text-customRed">HOSTEL STUDENTS</span></h3>
            </div>
            <div className="px-4">
                {submitted ? (<p className="text-center">No Data Found</p>): (<Terms setSubmit={setSubmitted}/>)}
            </div>
        </div>
    )
}