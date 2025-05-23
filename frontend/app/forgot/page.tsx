"use client"
import Branding from "@/components/Branding";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiUser } from "react-icons/ci";

export default function Forgot() {

    const router = useRouter();

    const [username, setUsername] = useState("");

    async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/student/forgot`, {
                username: username
            }, {
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
                    <h2 className="text-2xl text-center font-medium">Forgot password</h2>
                    <p className="text-xs">Enter your username to reset your password</p>
                </div>
            </div>
            <div className="flex flex-col items-center w-full gap-y-2">
                <form onSubmit={submitHandler} className="flex flex-col items-center gap-y-6">
                    <div className="relative w-full">
                        <CiUser className="absolute left-4 top-3 text-2xl font-medium" />
                        <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"
                        className="w-full py-4 px-16 rounded-md focus:outline-none border text-customDarkGray text-sm border-customGray placeholder:text-sm placeholder:font-medium placeholder:text-customDarkGray"/>
                    </div>
                    <button className="bg-customRed text-customBlueBg w-full py-4 rounded-md font-semibold">Submit</button>
                </form>
                <p className="text-customDarkGray text-xs font-semibold">Questions? Email us at <span className="text-customDarkBlue">chalkpad@chitkara.edu.in</span></p>
            </div>
        </div>
    )
}