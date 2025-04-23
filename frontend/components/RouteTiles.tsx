import DashTile from "./DashTile";

export default function RouteTiles() {

    return (
        <div className="flex flex-col rounded-md border border-l-4 border-l-customGreen md:grid md:grid-cols-4 pt-5 pb-10 px-7 gap-6 shadow-md">
            <DashTile title="Gate Pass" description="Gate Pass for Students Leave, In & Out Campus Request" route="Gatepass"/>
            <DashTile title="Payment Receipt" description="Payment Transaction Receipt" route="paymentreceipt"/>
            <DashTile title="Non-Disciplinary Action" description="Extra Dues for Non-Disciplinary Action" route="finecollection"/>
            <DashTile title="New Semester Allotment (Room Booking)" description="Only limited number of rooms are available which will be allotted on first come first serve basis based upon the date and time of registration. The room will be allotted after physical verification of documents." route="newallotment"/>
            <DashTile title="Hostel Checkout" description="Hostel Checkout" route="hostelcheckout"/>
            <DashTile title="Complaint" description="Complaint" route="studentComaplaint"/>
            <DashTile title="Admission Form" description="Admission Form" route="admissionForm"/>
        </div>
    )

}