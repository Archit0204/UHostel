import Branding from "@/components/Branding";
import SigninForm from "@/components/SigninForm";
import Link from "next/link";

export default function Home() {
    return (
        <div className="w-full min-h-screen p-2 flex flex-col items-center bg-customBlueBg text-black">
            <section className="flex flex-col items-center gap-y-6 mb-14">
                <Branding/>
                <h5 className="text-center font-semibold uppercase text-base">Punjab Campus</h5>
            </section>

            <main className="flex flex-col items-center gap-y-7 w-full">
                
                <section className="flex flex-col items-center gap-y-4">
                    <SigninForm/>
                    <div className="flex flex-col items-center gap-y-6 text-xs">
                        <Link href="/forgot" className="hover:underline hover:font-bold">Forgot your password? Click here</Link>
                        <p className="text-customDarkGray font-semibold">Questions? Email us at <span className="text-customDarkBlue">chalkpad@chitkara.edu.in</span></p>
                    </div>
                </section>


                <footer className="flex flex-col items-center gap-y-5 justify-end">
                    <p className="text-customDarkGray font-semibold text-sm">Copyright ©2025 Chitkara University</p>
                    <div className="flex text-customBlue text-sm">
                        <p className="px-2 py-1 text-sm font-extralight hover:underline hover:text-customDarkBlue cursor-pointer border-r border-customGray ">About Us</p>
                        <p className="px-2 py-1 text-sm font-extralight hover:underline hover:text-customDarkBlue cursor-pointer border-r border-customGray ">Contact Us</p>
                        <p className="px-2 py-1 text-sm font-extralight hover:underline hover:text-customDarkBlue cursor-pointer border-r border-customGray ">Terms & Conditions</p>
                        <p className="px-2 py-1 text-sm font-extralight hover:underline hover:text-customDarkBlue cursor-pointer border-r border-customGray ">Refund & Cancellation</p>
                        <p className="px-2 py-1 text-sm font-extralight hover:underline hover:text-customDarkBlue cursor-pointer">Privacy Policy</p>
                    </div>
                </footer>
            </main>

        </div>
    );
}
