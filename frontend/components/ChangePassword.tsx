"use client"
import axios from "axios";
import { useState } from "react"

type Cookie = {
    name: string,
    value: string
};

export default function ChangePassword({ token }: { token: Cookie }) {

    const [passwordData, setPasswordData] = useState({
        current: "", new: "", confirm: ""
    });

    function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setPasswordData({
            ...passwordData, [event.target.name]: event.target.value
        })
    }

    async function submitHandler(event: React.FormEvent) {

        event.preventDefault();

        try {
            
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/student/changePassword`, {
                currentPassword: passwordData.current,
                newPassword: passwordData.new,
                confirmPassword: passwordData.confirm
            }, {
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            })
            
            if (response.status === 200) {
                setPasswordData({
                    confirm: "", current: "", new: ""
                });
            }

        } catch (error: any) {
            console.log("Error Changing Password: " + error.message);
        }

    }

    return (
        <div className="w-full bg-white p-6 rounded-md">
            <form className="flex flex-col gap-y-6" onSubmit={submitHandler}>
                <div className="flex flex-col gap-y-2">
                    <label className="text-customTextGray font-semibold text-sm">Current Password</label>
                    <input className="border rounded-md p-3 placeholder:text-sm placeholder:text-customDarkGray placeholder:font-medium focus:outline-none" type="password" name="current" value={passwordData.current} onChange={changeHandler} placeholder="Enter your current password" required/>
                </div>
                <div className="flex flex-col gap-y-2">
                    <label className="text-customTextGray font-semibold text-sm">New Password</label>
                    <input className="border rounded-md p-3 placeholder:text-sm placeholder:text-customDarkGray placeholder:font-medium focus:outline-none" type="password" name="new" value={passwordData.new} onChange={changeHandler} placeholder="Enter your new password" required/>
                </div>
                <div className="flex flex-col gap-y-2">
                    <label className="text-customTextGray font-semibold text-sm">Confirm new password</label>
                    <input className="border rounded-md p-3 placeholder:text-sm placeholder:text-customDarkGray placeholder:font-medium focus:outline-none" type="password" name="confirm" value={passwordData.confirm} onChange={changeHandler} placeholder="Confirm new password" required/>
                </div>

                <div className="flex justify-center items-center">
                    <button className="bg-customRed text-white py-2 px-4 rounded-md font-medium">Submit</button>
                </div>
            </form>
        </div>
    )

}