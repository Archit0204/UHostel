
export interface Student {
    firstName: string,
    lastName: string,
    fatherName: string,
    username: string,
    year: string,
    campus: string,
    course: string,
    gatepass: Gatepass[]
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