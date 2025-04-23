"use client"
import { Gatepass } from "@/lib/types";
import axios, { isAxiosError } from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface FormProps {
    toggle: (val: boolean) => void;
    cookies: {
        name: string;
        value: string
    };
    type: string;
    gatepassData: Gatepass | null;
}
 
export default function ApplyForm({ cookies, type, toggle, gatepassData }: FormProps) {

    const date = new Date();
    const day = date.getDate();
    const year = date.getFullYear();

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthName = months[date.getMonth()];

    const [disabled, setDisabled] = useState(false);
    const [data, setData] = useState({
        leaveType: gatepassData?.leaveType || "Day Out",
        outDate: gatepassData?.outDate || "",
        inDate: gatepassData?.inDate || "",
        outTime: gatepassData?.outTime || "",
        inTime: gatepassData?.inTime ||"",
        reason: gatepassData?.reason || "Select Reason",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        const {name, value, type} = e.target;

        if (type === "radio") {
            setData(prev => ({
                ...prev,
                [name]: value,
                inDate: value === "day" ? "": prev.inDate
            }));
            return;
        }

        setData(prev => ({
            ...prev,
            [name]: value
        }));
        
    }

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        
        toast.promise(
            async () => {
                try {
                    setDisabled(true);
                    if (type === "Apply") {
                        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/student/applyGatepass`, {
                            ...data
                        }, {
                            headers: {
                                Authorization: `Bearer ${cookies?.value}`
                            },
                            withCredentials: true
                        })
                    }
                    else {
                        const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_API_URL}/student/edit`, {
                            id: gatepassData?._id,
                            ...data
                        }, {
                            headers: {
                                Authorization: `Bearer ${cookies?.value}`
                            },
                            withCredentials: true
                        })
                    }
                    toggle(false);
                } catch (error: any) {
                    if (isAxiosError(error)) {
                        console.log(error.response?.data);
                    }
                    throw error;
                }
                finally {
                    setDisabled(false);
                }
            },
            {
                loading: 'Applying',
                success: `Gatepass ${type == "Apply" ? "Applied": "Edited"}!`,
                error: `Error ${type == "Apply" ? "applying": "editing"} Gatepass!`,
            }
        );

        // try {
        //     setDisabled(true);
        //     const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/student/applyGatepass`, {
        //         ...data
        //     }, {
        //         headers: {
        //             Authorization: `Bearer ${cookies?.value}`
        //         },
        //         withCredentials: true
        //     })
        //     toast.success("Gatepass applied successfully");
            
        //     toggle(false);
        // } catch (error: any) {
        //     toast.error("Unable to apply for gatepass");
        // }
        // finally {
        //     setDisabled(false);
        // }
    }

    return (
        <div className="text-sm w-full text-customTextGray">
            <form className="flex flex-col gap-8 w-full" onSubmit={handleSubmit}>
                <p className="font-semibold">Apply Date <span className="font-normal ml-5">{day}-{monthName}-{year}</span></p>

                <div className="flex gap-x-8">
                    <p className="font-semibold">Apply For</p>
                    <div className="flex gap-5">
                        <div className="flex gap-2 items-center">
                            <input type="radio" name="leaveType" id="day" value="Day Out" checked={data.leaveType === "Day Out"} onChange={handleChange}/>
                            <label htmlFor="day">Day Out</label>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input type="radio" name="leaveType" id="night" value="Night Out" checked={data.leaveType === "Night Out"} onChange={handleChange}/>
                            <label htmlFor="night">Night Out</label>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center w-full gap-6 md:gap-16">
                    <div className="w-full md:w-1/5 flex flex-col gap-1">
                        <label className="font-semibold" htmlFor="outDate">Out Date</label>
                        <input className="focus:outline-none border rounded-md px-6 py-3" type="date" name="outDate" id="outDate" value={data.outDate.slice(0,10)} onChange={handleChange}/>
                    </div>

                    <div className="w-full md:w-1/5 flex flex-col gap-1">
                        <label className="font-semibold" htmlFor="outTime">Out Time (approximate i.e. 4:50 PM)</label>
                        <input className="focus:outline-none border rounded-md px-6 py-3" type="text" name="outTime" id="outTime" value={data.outTime} placeholder="i.e. 5:30 PM" onChange={handleChange}/>
                    </div>

                    <div className="w-full md:w-1/5 flex flex-col gap-1">
                        <label className="font-semibold" htmlFor="inTime">In Time (approximate i.e. 7:00 PM)</label>
                        <input className="focus:outline-none border rounded-md px-6 py-3" type="text" name="inTime" id="inTime" value={data.inTime} placeholder="i.e. 8:35 PM" onChange={handleChange}/>
                    </div>

                    <div className={`w-full md:w-1/5 flex flex-col gap-1 ${data.leaveType === "Day Out" ? "hidden": "visible"}`}>
                        <label className="font-semibold" htmlFor="inDate">In Date</label>
                        <input className="focus:outline-none border rounded-md px-6 py-3" type="date" name="inDate" id="inDate" value={data.inDate.slice(0,10)} onChange={handleChange}/>
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className="font-semibold" htmlFor="reason">Leave Required Reason</label>
                    <select name="reason" id="reason" className="appearance-none focus:outline-none border rounded-md px-4 py-3 w-full md:w-1/4" value={data.reason} onChange={handleChange}>
                        <option value="Select Reason">Select Reason</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Grooming">Grooming</option>
                        <option value="Vacation">Vacation</option>
                        <option value="Personal Reasons">Personal Reasons</option>
                        <option value="University Off">University Off</option>
                    </select>

                    <button disabled={disabled} className={`mt-3 ${disabled ? "bg-red-500": "bg-customRed"} text-white px-4 py-2 w-[100px] rounded-md`}>Submit</button>
                </div>
            </form>
        </div>
    )

}