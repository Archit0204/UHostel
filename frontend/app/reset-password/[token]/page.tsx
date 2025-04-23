"use client"
import Branding from "@/components/Branding";
import axios, { isAxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { CiLock } from "react-icons/ci";

export default function ResetPassword() {

    const router = useRouter();
    const { token } = useParams();

    const [resetPassword, setResetPassword] = useState({
        password: "",
        confirmPassword: ""
    });

    function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setResetPassword({
            ...resetPassword, [event.target.name]: event.target.value
        });
    }

    async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/student/reset/${token}`, resetPassword, {
                withCredentials: true
            });

            if (res.status === 200) {
                router.push("/")
            }

        } catch (error: any) {
            if (isAxiosError(error)) {
                console.log(error.response?.data);
            }
        }
    }

    return (
        <div className="w-full min-h-screen text-black bg-customBlueBg flex flex-col items-center gap-y-4">
            <div className="flex flex-col mt-16 items-center gap-y-12">
                <Branding/>
                <div className="flex flex-col items-center gap-y-2">
                    <h2 className="text-2xl text-center font-medium">Reset password</h2>
                    <p className="text-xs">Enter your new password</p>
                </div>
            </div>
            <div className="flex flex-col items-center w-full gap-y-2">    
                <form onSubmit={submitHandler} className="flex flex-col items-center gap-y-6">
                    <div className="relative w-full">
                        <CiLock className="absolute left-4 top-3 text-2xl font-medium" />
                        <input type="text" name="password" id="password" value={resetPassword.password} onChange={changeHandler} placeholder="Password"
                        className="w-full py-4 px-16 rounded-md focus:outline-none border text-customDarkGray text-sm border-customGray placeholder:text-sm placeholder:font-medium placeholder:text-customDarkGray"/>
                    </div>
                    <div className="relative w-full">
                        <CiLock className="absolute left-4 top-4 text-2xl"/>
                        <input type="password" name="confirmPassword" id="confirmPassword" value={resetPassword.confirmPassword} onChange={changeHandler} placeholder="Confirm Password"
                        className="w-full py-4 px-16 rounded-md focus:outline-none border text-customDarkGray text-sm border-customGray placeholder:text-sm placeholder:font-medium placeholder:text-customDarkGray"/>
                    </div>
                    <button className="bg-customRed text-white w-full py-4 rounded-md font-semibold">Submit</button>
                </form>
                <p className="text-customDarkGray text-xs font-semibold">Questions? Email us at <span className="text-customDarkBlue">chalkpad@chitkara.edu.in</span></p>
            </div>
        </div>
    )
}