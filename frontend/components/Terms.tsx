import { useState } from "react"

interface Props {
    setSubmit: (val: boolean) => void;
}

export default function Terms({ setSubmit }: Props) {

    const [checked, setChecked] = useState(false);

    return (
        <div className="flex flex-col gap-5 text-lg">
            <ol className="list-decimal flex flex-col gap-4">
                <li>Hostel Room Allotment shall be applicable for complete semester irrespective of the number of days/months of stay in the Hostel. Full semester fee shall be charged and no hostel fee in installments shall be accepted in any case.</li>
                <li>For Odd Semester (July – December), Hostel fee shall be deposited by <span className="font-bold">15th June</span> & for Even Semester (January – June), Hostel fee shall be deposited by <span className="font-bold">15th December</span>. Late fee fine of Rs 100/- per day will be charged from the students after above due dates.</li>
                <li>In case of admission withdrawal during first semester, the hostel fee shall be refunded on pro rata monthly basis irrespective of number of days of stay in the hostel.</li>
                <li>Once the Hostel fee is paid by the student for 2nd semester and onwards, the Hostel fee becomes Non-refundable/Non-adjustable under any circumstances. So, the decision related to the payment of Hostel fee should be taken very carefully.</li>
                <li>Hostel Checkout Date by the students for Odd Semester (July – December cycle) is <span className="font-bold">31st December</span> and for Even Semester (January – June cycle) is <span className="font-bold">30th June</span>. The Checkout process should be completed online. Students should vacate the hostel latest by the above-mentioned dates to avoid any late fine and follow the instructions strictly.</li>
                <li>In Case Checkout is not done by the schedule mentioned in the Point No. (5) above, fine of Rs 500/- per day shall be charged, which is to be paid at the time of Hostel Checkout.</li>
                <li>Hostel room Up-gradation is allowed subject to the availability of accommodation and payment of charges, if any.</li>
                <li>Hostel Room Allotment is temporary and the student may be directed to vacate / shift Hostel at any point of time as per the University requirement.</li>
                <li>Hostel Fee is subject to revision at the discretion of University Authority.</li>
                <li>(a) Students who choose to book an AC room will be required to retain their reservation for a minimum period of one year. (b) We kindly request that all students who intend to book an AC room carefully consider this policy before making their decision.</li>
            </ol>
            <div className="bg-customRed text-white p-4">
                If it is confirmed by payment gateway that your payment is successful then kindly wait for receipt for 24 hours or 48 hrs in case of holidays.
                For unsuccessful transaction kindly contact your bank or credit card company.
            </div>
            <div className="flex items-center gap-3">
                <input type="checkbox" id="terms" checked={checked} onChange={() => setChecked(!checked)}/>
                <label className="text-base" htmlFor="terms">I understand and accept the terms & conditions of Hostel Allotment.</label>
            </div>
            <div className="text-center">
                <button disabled={!checked} onClick={() => setSubmit(true)} className={`${checked ? "bg-customRed": "bg-red-500"} text-white px-3 py-2 rounded-md`}>Submit</button>
            </div>
        </div>
    )

}