"use client"
import { Gatepass } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";

interface Cookie {
    name: string;
    value: string;
}

export default function GatepassData({ cookies }: { cookies: Cookie }) {

    const [gatepassData, setGatepassData] = useState<Gatepass[]>([]);

    useEffect(() => {
        const fetchGatepassData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/student/getGatepass`, {
                    headers: {
                        Authorization: `Bearer ${cookies.value}`
                    },
                    withCredentials: true
                });
                setGatepassData(response.data.gatepassData.gatepass);
            } catch (error) {
                console.error("Error fetching gatepass data:", error);
            }
        };

        fetchGatepassData();
    }, []);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return (
        <div className="w-full mt-4 border-t pt-4">
            <table className="w-full">
                <thead>
                    <tr className="text-sm mt-4">
                        <th>#</th>
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
                                <tr key={data._id}>
                                    <td>{idx + 1}</td>
                                    <td>{data.leaveType}</td>
                                    <td>{data.status}</td>
                                    {/* <td>{data.leaveType === "Day Out" ? `${outDay}-${outMonth}-${outYear}(${data.outTime} TO ${data.inTime})`: ``}</td> */}
                                    <td>{data.leaveType === "Day Out" ? 
                                        <>
                                            <p>{outDay}-{outMonth}-{outYear}</p>
                                            <p>({data.outTime} TO {data.inTime})</p>
                                        </>: 
                                        <>
                                            <p>{inDay}-{inMonth}-{inYear}</p>
                                            <p>({data.outTime})</p>
                                            <p>{outDay}-{outMonth}-{outYear}</p>
                                            <p>({data.outTime})</p>
                                        </>}</td>
                                    <td>{data.reason}</td>
                                    <td>{data.executioner !== null ? data.executioner: "-"}</td>
                                    <td>{data.comments !== null ? data.comments: "-"}</td>
                                    <td>{data.status === "Pending" ? "Edit": "-"}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )

}