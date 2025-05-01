"use client"
import { Fine, Student } from "@/lib/types";
import toast from "react-hot-toast";
import { useState } from "react";

interface Props {
    student: Student;
    fines: Fine[];
    paidFines: Fine[];
}

export default function FineContainer({ student, fines, paidFines }: Props) {
    const [selectedFines, setSelectedFines] = useState<string[]>([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [selectedReason, setSelectedReason] = useState("");

    // Handle individual checkbox change
    const handleCheckboxChange = (fineId: string, amount: number) => {
        setSelectedFines(prev => {
            // First update selectedFines based on the current state
            const newSelectedFines = prev.includes(fineId) 
                ? prev.filter(id => id !== fineId) 
                : [...prev, fineId];
    
            // Then calculate the total amount based on the updated selected fines
            const newTotalAmount = newSelectedFines.reduce((sum, id) => {
                const fine = fines.find(f => f._id === id);
                return sum + (fine ? fine.amount : 0);
            }, 0);
    
            setTotalAmount(newTotalAmount);
            
            return newSelectedFines;
        });
    };

    // Handle select all checkbox
    const handleSelectAll = () => {
        if (selectedFines.length === fines.length) {
            setSelectedFines([]);
            setTotalAmount(0);
        } else {
            const allFineIds = fines.map(fine => fine._id);
            setSelectedFines(allFineIds);
            const total = fines.reduce((sum, fine) => sum + fine.amount, 0);
            setTotalAmount(total);
        }
    };

    // Show reason in modal
    const handleReasonClick = (reason: string) => {
        setSelectedReason(reason);
        setShowModal(true);
    };

    const payHandler = async() => {
        toast("Coming Soon");
    }

    return (
        <>
            <div className="flex flex-col w-full rounded-md border bg-white border-l-4 border-l-customGreen pt-5 pb-10 px-10 mb-12 gap-6 shadow-md">
                <div className="flex flex-col md:flex-row gap-6 w-full">
                    {/* Fine Dues Table */}
                    <div className="flex flex-col gap-4 w-full">
                        <h3 className="text-lg font-semibold border-b pb-3">Fine Dues</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-base">
                                <thead className="bg-gray-100 text-left">
                                    <tr>
                                        <th className="px-4">#</th>
                                        <th className="p-2">
                                            <input 
                                                type="checkbox" 
                                                checked={selectedFines.length === fines.length && fines.length > 0}
                                                onChange={handleSelectAll}
                                            />
                                        </th>
                                        <th className="p-2">Date</th>
                                        <th className="p-2">Fine</th>
                                        <th className="p-2">Reason</th>
                                        <th className="px-4">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fines.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="text-center py-4 text-gray-500">
                                                No pending fines found
                                            </td>
                                        </tr>
                                    ) : (
                                        fines.map((fine, index) => {

                                            const date = new Date(fine.createdAt);
                                            const day = date.getDate().toString().padStart(2, '0');
                                            const month = date.toLocaleString('default', { month: '2-digit' });
                                            const year = date.getFullYear();

                                            return (
                                                <tr key={fine._id} className="border-t">
                                                    <td className="px-4">{index + 1}</td>
                                                    <td className="p-2">
                                                        <input 
                                                            type="checkbox"
                                                            checked={selectedFines.includes(fine._id)}
                                                            onChange={() => handleCheckboxChange(fine._id, fine.amount)}
                                                        />
                                                    </td>
                                                    <td className="p-2">{day} - {month} - {year}</td>
                                                    <td className="p-2">Hostel Fine</td>
                                                    <td 
                                                        className="p-2 cursor-pointer"
                                                        onClick={() => handleReasonClick(fine.reason)}
                                                    >
                                                        {fine.reason.length > 10 ? fine.reason.slice(0,10) + "...": fine.reason}
                                                    </td>
                                                    <td className="px-4">{fine.amount}</td>
                                                </tr>
                                            )
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {
                            fines.length > 0 &&     
                            <div className="flex justify-end items-center gap-4">
                                <span className="font-semibold">Total Amount:</span>
                                <span className="text-customRed font-bold">{totalAmount}</span>
                            </div>
                        }
                    </div>

                    {/* Fine Paid Table */}
                    <div className="flex flex-col gap-4 w-full">
                        <h3 className="text-lg font-semibold border-b pb-3">Fine Paid</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-base">
                                <thead className="bg-gray-100 text-left">
                                    <tr>
                                        <th className="px-4">#</th>
                                        <th className="p-2">Date</th>
                                        <th className="p-2">Receipt No.</th>
                                        <th className="p-2">Reason</th>
                                        <th className="p-2">Paid Amount</th>
                                        <th className="px-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paidFines.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="text-center py-4 text-gray-500">
                                                No paid fines found
                                            </td>
                                        </tr>
                                    ) : (
                                        paidFines.map((fine, index) => {

                                            const date = new Date(fine.updatedAt);
                                            const day = date.getDate().toString().padStart(2, '0');
                                            const month = date.toLocaleString('default', { month: '2-digit' });
                                            const year = date.getFullYear();

                                            return (
                                                <tr key={fine._id} className="border-t">
                                                    <td className="p-2">{index + 1}</td>
                                                    <td className="p-2">{day} - {month} - {year}</td>
                                                    <td className="p-2 uppercase">
                                                        UHFN{fine._id.slice(0,10)}
                                                        <br />
                                                        <span className="bg-orange-400 px-2 py-1 rounded text-white">
                                                            {fine._id.slice(0,15)}
                                                        </span>
                                                    </td>
                                                    <td className="p-2">{fine.reason.length > 10 ? fine.reason.slice(0,10) + "...": fine.reason}</td>
                                                    <td className="px-4">{fine.amount}</td>
                                                    <td className="p-2">
                                                        <span className="bg-green-600 text-white px-2 py-1 rounded">
                                                            SUCCESS
                                                        </span>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div>
                    <button onClick={payHandler} className="text-white rounded-md bg-customRed uppercase text-xl px-3 py-2">
                        Pay Now
                    </button>
                </div>

                <div className="bg-customRed text-white p-3 text-lg">
                    <p>If it is confirmed by payment gateway that your payment is successful then kindly wait for receipt for 24 hours or 48 hrs in case of holidays.</p>
                    <p>For unsuccessful transaction kindly contact your bank or credit card company.</p>
                </div>
            </div>

            {/* Reason Modal */}
            {showModal && (
                <div className="fixed inset-0 px-10 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                        <h3 className="text-lg font-semibold mb-4">Fine Reason</h3>
                        <p className="text-gray-700">{selectedReason}</p>
                        <button 
                            onClick={() => setShowModal(false)}
                            className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
