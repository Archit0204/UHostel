"use client"
import { Complaint } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react"

interface Props {
    cookies: {
        name: string;
        value: string;
    }
}

export default function ComplaintData({ cookies }: Props) {

    const [complaint, setComplaint] = useState<Complaint[]>([]);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/student/complaint`, {
                    headers: {
                        Authorization: `Bearer ${cookies.value}`
                    },
                    withCredentials: true
                });

                const complaintData: Complaint[] = response.data.data.complaint;
                complaintData.reverse();
                setComplaint(complaintData);
            } catch (error: any) {
                console.log(error.message);
            }
        }
        fetchData();
    })

    return (
        <div>
            {
                complaint.length === 0 ? (
                    <p className="text-center">No Data Found</p>
                ): (
                    complaint.map((data) => {
                        return (
                            <section key={data._id} className="w-full text-sm md:text-base flex flex-col border-t tracking-wide">
                                <div className="flex justify-end py-3">
                                    <p className="font-semibold">Complaint Token: {data._id}</p>
                                </div>
                                <div className="border-t p-1 md:p-3 flex flex-col gap-6">
                                    <div className="flex justify-between gap-4">
                                        <div>
                                            <p className="uppercase">{data.hostel} Hostel</p>
                                            <p className="uppercase">Room No - {data.roomNo}</p>
                                            <p><span className="font-semibold">Warden Remarks: </span>{data.wardenRemarks !== null ? data.wardenRemarks : ""}</p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <p className="font-semibold">Complaint Category: {data.category}</p>
                                            <p><span className="font-semibold">Complaint Type: </span>{data.type}</p>
                                            <p><span className="font-semibold">Student Remarks: </span>{data.remarks}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-start justify-center gap-2 max-w-[150px] w-2/5">
                                        <h3 className="font-semibold">Complaint Status</h3>
                                        <p className="bg-customGreen w-full text-center text-white font-semibold py-1">{data.status}</p>
                                    </div>
                                </div>
                            </section>
                        )
                    })
                )
            }
        </div>
    )
}