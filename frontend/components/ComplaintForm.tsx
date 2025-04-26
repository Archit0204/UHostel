import { Student } from "@/lib/types";
import axios, { isAxiosError } from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface Props {
    cookies: {
        name: string;
        value: string;
    };
    student: Student;
    setToggleApply: (val: boolean) => void;
}

export default function ComplaintForm({ cookies, student, setToggleApply }: Props) {

    const [complaintData, setComplaintData] = useState({
        studentName: student.firstName + " " + student.lastName,
        studentId: student.username,
        hostel: student.hostel,
        roomNo: student.roomNo,
        category: "",
        type: "",
        remarks: ""
    });
    const [disabled, setDisabled] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setComplaintData(prev => {

            if (name === "category") {
                return {
                    ...prev,
                    category: value,
                    type: ""
                };
            }

            return {
                ...prev,
                [name]: value
            };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        toast.promise(
            async () => {
                try {
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/student/complaint`, complaintData, {
                        headers: {
                            Authorization: `Bearer ${cookies?.value}`
                        },
                        withCredentials: true
                    })
                    setToggleApply(false);
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
                success: `Complaint Raised!`,
                error: `Error Raising Complaint!`,
            }
        );
    }

    const options = {
        Carpenter: [
            "Beading Repair",
            "Book Rack / Shelf Repair",
            "Chair / Bed Shoes Broken",
            "Chapka Kunda Repair",
            "Cloth Wire",
            "Curtain Rod / Ring",
            "Disert Cooler Frame",
            "Door Closer Repair",
            "Door Create Sound",
            "Door Handle Repair",
            "Door Lock Repair",
            "Door Repair",
            "Door Stoper Repair",
            "Drawer Channel Repair",
            "Drawer Handle Repair",
            "Drawing Table Repair",
            "Exhuast Fan Frame Repair",
            "Gypsum Wall Repair",
            "Handle Repair",
            "Jaali Door Repair",
            "Side Storage Lock Repair",
            "Stool Repair",
            "Student Table Repair",
            "Study Table Repair",
            "Table / Stool Shoes Repair",
            "Table Drawer Repair",
            "Table Repair",
            "Window Repair",
            "Window Stoper Repair",
            "Wooden Almirah Lock Repair",
            "Wooden Almirah Repair",
            "Wooden Bed Repair"
        ],
        Electrical: [
            "Microwave Sounding Problem",
            "Water Cooler Current Problem",
            "Window A.C Not Working",
            "Window AC Cooling Effect Low",
            "Deep Fridge Effect Low",
            "Deep Fridge Handle Broken",
            "Deep Fridge Not Working",
            "Deep Fridge Rubber Gasket Need to be Repair / Replace",
            "Fridge Tray Broken",
            "Microwave Glass Plate Broken",
            "Microwave Not Working",
            "Refrigerator Cooling Effect Low",
            "Refrigerator Handle Broken",
            "Refrigerator Not Working",
            "Small Fridge Cooling Efect Low",
            "Small Fridge Not Working",
            "Water Cooler Cooling Effect Low",
            "Water Cooler Not Working",
            "Ceiling Fan Sounding Problem",
            "Cooler Body Damage",
            "Desert Cooler Water Pump Not Working",
            "Switch Board not working",
            "Electrical Hole needs to be Cover",
            "Sheet Broken",
            "AC MCB Proper Fix",
            "Ceiling Fan Sound Problem",
            "Ceiling Fan Speed Slow",
            "Ceiling light not working",
            "CFL Blinking Problem",
            "CFL Broken",
            "CFL Holder Broken",
            "CFL Not Working",
            "Cleaning the Fan Wall",
            "Desert Cooler Grill Damage",
            "Desert Cooler Not Working",
            "Desert Cooler Speed Slow",
            "Deset Cooler Pad Change",
            "Fan Regulator Broken",
            "Fan Regulator Change",
            "Fan Regulator Nob Change",
            "Fan Regulator Not Working",
            "Floor Light Not Working",
            "Induction Not Working",
            "Iron(Press) Current Problem",
            "Loose Wires",
            "Mess Big Cooler",
            "Mess LED Tv Audio Problem",
            "PVC Batten Broken",
            "PVC Batten Not Fixed Proper",
            "PVC Exhaust Fan Not Working",
            "Switch Not Working",
            "Tube Light Blinking Problem",
            "Tube Light Location Change",
            "Tube Rod Blinking Problem",
            "Tube Rod Broken",
            "Vacuum Cleaner Not Working",
            "Wall Fan Not Working",
            "Switch Broken",
            "Ceiling fan not working",
            "Exaust Fan not working",
            "Iron Not Working",
            "Tea Kettle Not Working",
            "Tube light not working",
            "Fan Cup Change",
            "Fly Cactcher Not Working",
            "Fly Catcher Tube Not Working",
            "Induction is not Working",
            "LCD TV Not Working",
            "Lift Button is not Working",
            "Lift Exhaust Fan is not Working",
            "Lift Door Not Open / Close",
            "Lift Light Not Working",
            "Lift Not Working",
            "Socket Broken",
            "Tata Sky Not Working",
            "Water Cooler Tank Repair"
        ],
        IT: [
            "Internet Browsing",
            "Network Connection New/Repair",
            "WiFi support"
        ],
        Maintenance: [
            "Glass Work- Mirror Fitting",
            "Glass Work-Looking Glass Broken",
            "Glass Work-Ventilator Glass Broken",
            "Glass Work-Window Glass Broken",
            "Mason work",
            "Mason- Grouting / Road Repair",
            "Mason--Floor Marble Repair",
            "Mason--Floor Tiles Repair",
            "Mason-Plaster Repair work",
            "Mason-Pole Fixing Work",
            "Mason-Stair Marble Repair",
            "Mason-Wall Tiles Repair",
            "Mason-Washroom Floor Level Problem",
            "Mason-Washroom Floor Tiles Repair",
            "Mason-Washroom Wall Tiles Repair",
            "Mason-Water Cooler Area Cement Repair",
            "Printer (M1005)",
            "Tailor-Chair Cloth Repair",
            "Tailor-Curtain Stiching",
            "Tailor-Matress Cover Repair",
            "Welding- Door Chowkhat",
            "Welding-Aluminium Door Repair",
            "Welding-Aluminium Jaali Repair",
            "Welding-Aluminium Window Repair",
            "Welding-Bed Repair",
            "Welding-Desert Cooler Stand Repair",
            "Welding-Steel Almirah Door Repair",
            "Welding-Steel Almirah Handle",
            "Welding-Steel Almirah Lock Repair",
            "Welding-Steel Almirah Repair",
            "Welding-Steel Almirah Rod",
            "Welding-Student Locker Repair",
            "Welding-Table Repair",
            "Welding-Water Cooler Stand Repair",
            "Welding-Window Chowkhat"
        ],
        Painter: [
            "Paint",
            "Paint Work-Almirah",
            "Paint work-Beading Paint",
            "Paint Work-Bed Paint /Polish Work",
            "Paint Work-Ceiling Fan Rod",
            "Paint Work-Chair",
            "Paint Work-Chowkhat",
            "Paint Work-Cup Board",
            "Paint Work-Desert Cooler",
            "Paint Work-Desert Cooler Stand",
            "Paint Work-Door",
            "Paint Work-Door Jaali",
            "Paint Work-Looking Glass Frame",
            "Paint Work-Magazine Rack",
            "Paint Work-Side Storage",
            "Paint Work-Student Locker",
            "Paint Work-Student Table",
            "Paint Work-Table",
            "Paint Work-Water Cooler Stand",
            "Paint Work-Window",
            "Paint Work-Window jaali",
            "Paint Work-Wooden Rack",
            "Whitewash",
            "Whitewash-(Exterior) Ground Floor",
            "Whitewash-Balcony",
            "Whitewash-Ceiling (Roof)",
            "Whitewash-Corridor",
            "Whitewash-in side washroom",
            "Whitewash-Out side washroom",
            "Whitewash-Room in Side (Hostel)",
            "Whitewash-Room out side (Hostel)"
        ],
        Plumber: [
            "Blockage",
            "Soap Stand",
            "Water Tap Repair",
            "Angle Valve Repair",
            "Aqua Guard Leakage",
            "Ceiling Leakage",
            "Desert Cooler Over Flow",
            "Duct Pipe Leakage",
            "Flush Tanki Leakage",
            "Flush Tanki Switch Repair",
            "Fountain Water Drain Out",
            "Fresh Water Not Coming",
            "Jet Set Repair",
            "PVC Connection Repair",
            "Seepage",
            "Sewage Line Blockage",
            "Shower Repair",
            "Terrace Water Tanki Over Flow",
            "Toilet Seat Cover",
            "Toilet Seat Reapir",
            "Urinal Pot Repair",
            "Urinal Spender Repair",
            "Washbasin White Cement Repair",
            "Washroom Smell Problem",
            "Waste Jaali Repair",
            "Waste Pipe Repair",
            "Water Tanki Cover",
        ]
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <label className="text-customTextGray font-semibold" htmlFor="studentName">Student Name</label>
                        <input className="focus:outline-none border py-3 px-4 text-customTextGray uppercase font-medium rounded-md" type="text" id="studentName" placeholder="Student Name" value={complaintData.studentName} readOnly/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-customTextGray font-semibold" htmlFor="studentId">Student Roll No.</label>
                        <input className="focus:outline-none border py-3 px-4 text-customTextGray uppercase font-medium rounded-md" type="text" id="studentId" placeholder="Student Roll No." value={complaintData.studentId} readOnly/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-customTextGray font-semibold" htmlFor="hostel">Hostel</label>
                        <input className="focus:outline-none border py-3 px-4 text-customTextGray uppercase font-medium rounded-md" type="text" id="hostel" placeholder="Student Name" value={complaintData.hostel} readOnly/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-customTextGray font-semibold" htmlFor="room">Room</label>
                        <input className="focus:outline-none border py-3 px-4 text-customTextGray uppercase font-medium rounded-md" type="text" id="room" placeholder="Student Name" value={complaintData.roomNo} readOnly/>
                    </div>
                    <div className="w-full flex flex-col md:flex-row gap-8 md:gap-3">
                        <div className="w-full flex flex-col gap-2">
                            <label className="text-customTextGray font-semibold" htmlFor="category">Complaint Category</label>
                            <select 
                                name="category" 
                                id="category"
                                value={complaintData.category}
                                onChange={handleChange}
                                className="appearance-none cursor-pointer focus:outline-none border py-3 px-4 text-customTextGray uppercase font-medium rounded-md"
                            >
                                <option value="">Choose Complaint Category</option>
                                <option value="Carpenter">Carpenter</option>
                                <option value="Electrical">Electrical</option>
                                <option value="IT">IT</option>
                                <option value="Maintenance">Maintenance</option>
                                <option value="Painter">Painter</option>
                                <option value="Plumber">Plumber</option>
                            </select>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <label className="text-customTextGray font-semibold" htmlFor="type">Complaint Type</label>
                            <select 
                                name="type" 
                                id="type"
                                value={complaintData.type}
                                onChange={handleChange}
                                className="appearance-none cursor-pointer focus:outline-none border py-3 px-4 text-customTextGray uppercase font-medium rounded-md"
                                disabled={!complaintData.category}
                            >
                                <option value="">Choose Complaint Type</option>
                                {complaintData.category && 
                                    options[complaintData.category as keyof typeof options].map((type, index) => (
                                        <option key={index} value={type}>
                                            {type}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <label className="text-customTextGray font-semibold" htmlFor="remarks">Complaint Remarks</label>
                        <textarea className="appearance-none focus:outline-none border py-3 px-4 text-customTextGray font-medium rounded-md resize-none" name="remarks" id="remarks" value={complaintData.remarks} placeholder="Enter your Complaint Remarks" onChange={handleChange}></textarea>
                    </div>
                </div>
                <div className="text-center">
                    <button disabled={disabled} className={`${disabled ? "bg-red-500": "bg-customRed"} text-white px-3 py-2 rounded-md text-lg`}>Submit</button>
                </div>
            </form>
        </div>
    )
}