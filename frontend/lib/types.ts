
export interface Student {
    firstName: string,
    lastName: string,
    fatherName: string,
    username: string,
    year: string,
    campus: string,
    course: string,
    gatepass: Gatepass[],
    roomNo: string,
    hostel: string,
    complaint: Complaint[],
    checkoutApplied: boolean,
    fines: Fine[],
};

export interface Gatepass {
    _id: string,
    leaveType: string,
    status: string,
    reason: string,
    executioner: string,
    comments: string,
    outTime: string,
    outDate: string,
    inTime: string,
    inDate: string
}

export interface Complaint {
    _id: string;
    studentName: string;
    studentId: string;
    hostel: string;
    roomNo: string;
    category: string;
    type: string;
    remarks: string;
    wardenRemarks: string | null;
    status: "Pending" | "Closed";
}

export interface Fine {
    _id: string;
    amount: number;
    reason: string;
    paid: boolean;
    createdAt: string;
    updatedAt: string;
}