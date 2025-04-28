"use client"
import { Gatepass, Student } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";

interface Cookie {
    name: string;
    value: string;
}

interface GatepassDataProps {
    cookies: Cookie;
    setToggle: (val: boolean) => void;
    setFormType: (val: string) => void;
    setGatepass: (val: Gatepass) => void;
}

export default function GatepassData({ cookies, setToggle, setFormType, setGatepass }: GatepassDataProps) {

    const [gatepassData, setGatepassData] = useState<Gatepass[]>([]);
    const [userData, setUserData] = useState<Student | null>(null);

    useEffect(() => {
        const fetchGatepassData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/student/getGatepass`, {
                    headers: {
                        Authorization: `Bearer ${cookies.value}`
                    },
                    withCredentials: true
                });
                const gatepassData: Gatepass[] = response.data.gatepassData.gatepass;
                gatepassData.reverse();
                setUserData(response.data.gatepassData);
                setGatepassData(gatepassData);
            } catch (error) {
                console.error("Error fetching gatepass data:", error);
            }
        };

        fetchGatepassData();
    });

    const editHandler = (data: Gatepass) => {
        setGatepass(data);
        setFormType("Edit");
        setToggle(true);
    }

    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    return (
        <div className="w-full mt-4 border-t pt-4">
            {/* Add an outer container for the scrollable area */}
            <div className="relative">
                {/* Add the scrollable container */}
                <div className="overflow-x-auto">
                    <div className="min-w-[1024px]"> {/* Minimum width container */}
                        <table className="w-full">
                            <thead>
                                <tr className="text-sm mt-4">
                                    <th className="px-3">#</th>
                                    <th>Leave Type</th>
                                    <th>Status</th>
                                    <th>Leave from to</th>
                                    <th>Reason</th>
                                    <th>Approve/Reject by <br /> <span className="text-customRed">(Warden)</span></th>
                                    <th>Approved Comments</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {
                                    gatepassData.map((data, idx) => {

                                        const outDate = new Date(data.outDate);

                                        const outDay = outDate.getDate();
                                        const outMonth = months[outDate.getMonth()];
                                        const outYear = outDate.getFullYear();

                                        const inDate = new Date(data.inDate);

                                        const inDay = inDate.getDate();
                                        const inMonth = months[inDate.getMonth()];
                                        const inYear = inDate.getFullYear();

                                        return (
                                            <tr className={`text-center ${idx & 1 ? "bg-white": "bg-gray-100"} hover:bg-customGray`} key={data._id}>
                                                <td>{idx + 1}</td>
                                                <td className="px-4">
                                                    <p className={`py-1 font-semibold text-sm uppercase ${data.leaveType === "Day Out" ? "bg-customYellow": "bg-customDarkBlueBg"} text-white`}>{data.leaveType}</p>
                                                </td>
                                                <td>
                                                    <div className="py-3">
                                                        <p className={`uppercase font-semibold ${data.status === "Pending" ? "text-indigo-900": data.status === "Rejected" ? "text-customRed": "text-customGreen"}`}>{data.status === "Pending" ? "New Request": data.status}</p>
                                                        <div className="bg-customCyan">
                                                            <p>{userData?.hostel}</p>
                                                            <p>{userData?.roomNo}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-sm py-3">{data.leaveType === "Day Out" ? 
                                                    <>
                                                        <p>{outDay}-{outMonth}-{outYear}</p>
                                                        <p>({data.outTime} TO {data.inTime})</p>
                                                    </>: 
                                                    <>
                                                        <p>{outDay}-{outMonth}-{outYear}</p>
                                                        <p>({data.outTime})</p>
                                                        <p>{inDay}-{inMonth}-{inYear}</p>
                                                        <p>({data.inTime})</p>
                                                    </>}
                                                </td>
                                                <td className="text-sm">{data.reason}</td>
                                                <td className={`${data.status === "Pending" ? "text-black": data.status === "Rejected" ? "text-customRed": "text-customGreen"}`}>{data.executioner !== null ? data.executioner: "---"}</td>
                                                <td>{data.comments !== null ? data.comments: "---"}</td>
                                                <td>{data.status === "Pending" ? (<button onClick={() => editHandler(data)} className="underline">Edit</button>): "---"}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )

}