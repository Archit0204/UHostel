"use client"
import { useEffect, useState } from "react"
import GatepassData from "./GData";
import ApplyForm from "./ApplyForm";
import { Gatepass } from "@/lib/types";

interface Props {
    cookies: {
        name: string;
        value: string;
    }
}

export default function GatepassContainer({ cookies }: Props) {

    const [toggleApply, setToggleApply] = useState(false);

    return (
        <div className="flex flex-col w-full rounded-md border bg-white border-l-4 border-l-customBlue pt-5 pb-10 px-7 gap-6 shadow-md">
            <div className="w-full flex justify-between items-center">
                <h3 className="text-base font-semibold text-customRed">Gatepass {toggleApply ? "Request": "History"}</h3>
                <button onClick={() => setToggleApply(!toggleApply)} className="text-base bg-customRed px-2 py-1 text-white rounded-md">{toggleApply ? "View": "Apply Gatepass"}</button>
            </div>
            {toggleApply ? <ApplyForm toggle={setToggleApply} cookies={cookies}/> : <GatepassData cookies={cookies}/>}
        </div>
    )
}