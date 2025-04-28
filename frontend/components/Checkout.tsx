"use client"
import { Student } from "@/lib/types";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react"
import toast from "react-hot-toast";

interface Props {
    student: Student;
    cookies: {
        name: string;
        value: string
    }
}

export default function CheckoutContainer({ student, cookies }: Props) {

    const router = useRouter();

    const [checked, setChecked] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        toast.promise(
            async () => {
                try {
                    setDisabled(true);
                    await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/student/checkout`, {
                        hasApplied: student.checkoutApplied
                    }, {
                        headers: {
                            Authorization: `Bearer ${cookies?.value}`
                        },
                        withCredentials: true
                    })
                    router.push("/studentdashboard");
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
                success: `Application ${student.checkoutApplied ? "Withdrawn": "Submitted"}!`,
                error: `Error ${student.checkoutApplied ? "Withdrawing": "Submitting"} Application!`,
            }
        )
    }

    return (
        <div className="flex flex-col justify-center items-center w-full rounded-md border bg-white border-l-4 border-l-customGreen pt-5 pb-10 px-7 mb-12 gap-6 shadow-md">
            {
                student.checkoutApplied === false ? (
                    <div className="flex flex-col gap-6 shadow-xl p-10">
                        <div>
                            <div className="text-xl uppercase pb-4 border-b-2">
                                <h2>Kindly clear all your dues before applying for checkout</h2>
                                <h2 className="text-customRed">(request with pending dues will not be entertained)</h2>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 tracking-wide">
                            <h4 className="uppercase text-customRed">Steps</h4>
                            <ol className="flex flex-col gap-3 list-decimal list-inside">
                                <li>Apply for checkout</li>
                                <li>Approval from hostel warden</li>
                                <li>Fine payment (if any)</li>
                                <li>Approval from accounts department (submit your hostel ID)</li>
                                <li>Apply online for refund (if applicable) (attach scanned copy of cheque/passbook)</li>
                                <li>Account details should be of Student or of Parent</li>
                            </ol>
                            <div className="flex gap-3">
                                <input type="checkbox" name="checked" id="checked" checked={checked} onChange={() => setChecked(prev => !prev)}/>
                                <label htmlFor="checked">Agree & Continue</label>
                            </div>
                            <div className="text-center">
                                <button onClick={handleSubmit} disabled={!checked || disabled} className={`text-white py-2 px-3 rounded-md ${!checked || disabled ? "bg-red-500": "bg-customRed"}`}>Submit</button>
                            </div>
                        </div>
                    </div>
                ): (
                    <div className="flex flex-col gap-6 shadow-xl p-10">
                        <div className="flex flex-col gap-4">
                            <div className="text-xl uppercase pb-4 border-b-2">
                                <h2>You have already applied for Hostel Checkout</h2>
                                <h2 className="text-customRed">Do you wish to withdraw your application</h2>
                            </div>
                            <div className="flex flex-col gap-4 tracking-wide">
                                <div className="flex gap-3">
                                    <input type="checkbox" name="checked" id="checked" checked={checked} onChange={() => setChecked(prev => !prev)}/>
                                    <label htmlFor="checked">Agree & Continue withdrawing checkout application</label>
                                </div>
                                <div className="text-center">
                                    <button onClick={handleSubmit} disabled={!checked} className={`${!checked || disabled ? "bg-red-500": "bg-customRed"} text-white py-2 px-3 rounded-md`}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}