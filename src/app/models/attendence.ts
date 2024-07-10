import { Employee } from "./employee";

export interface Attendence {
    id: string,
    employeeId: string,
    date?: Date,
    checkInTime?: Date,
    checkOutTime?: Date,
    employee?:Employee
}