"use client"

import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react"
import toast from "react-hot-toast";
import { CiLock, CiUser } from "react-icons/ci"

export default function SigninForm() {

    const [signinData, setSigninData] = useState({
        username: "",
        password: ""
    });
    const [disabled, setDisabled] = useState(false);

    const router = useRouter();

    function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setSigninData({
            ...signinData, [event.target.name]: event.target.value
        });
    }

    async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        toast.promise(
            async () => {
                try {
                    setDisabled(true);
                    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/student/login`, signinData, {
                        withCredentials: true
                    });
                    
                    router.push("/studentdashboard")

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
              loading: 'Loading',
              success: 'Welcome back!',
              error: (error) => 'Error logging in!',
            }
        );

        // try {
        //     setDisabled(true);
        //     const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/student/login`, signinData, {
        //         withCredentials: true
        //     });
        //     toast.success("Welcome back!");
        //     if (res.status === 200) {
        //         router.push("/studentdashboard")
        //     }

        // } catch (error: any) {
        //     toast.error("Error signing in!");
        //     if (isAxiosError(error)) {
        //         console.log(error.response?.data);
        //     }
        // }
        // finally {
        //     setDisabled(false);
        // }
    }

    return (
        <form onSubmit={submitHandler} className="flex flex-col items-center gap-y-6">
            <div className="relative w-full">
                <CiUser className="absolute left-4 top-3 text-2xl font-medium" />
                <input type="text" name="username" id="username" value={signinData.username} onChange={changeHandler} placeholder="Username"
                className="w-full py-4 px-16 rounded-md focus:outline-none border text-customDarkGray text-sm border-customGray placeholder:text-sm placeholder:font-medium placeholder:text-customDarkGray"/>
            </div>
            <div className="relative w-full">
                <CiLock className="absolute left-4 top-4 text-2xl"/>
                <input type="password" name="password" id="password" value={signinData.password} onChange={changeHandler} placeholder="Password"
                className="w-full py-4 px-16 rounded-md focus:outline-none border text-customDarkGray text-sm border-customGray placeholder:text-sm placeholder:font-medium placeholder:text-customDarkGray"/>
            </div>
            <button disabled={disabled} className={`${disabled ? "bg-red-500": "bg-customRed"} text-white w-full py-4 rounded-md font-semibold`}>Sign In</button>
        </form>
    )

}