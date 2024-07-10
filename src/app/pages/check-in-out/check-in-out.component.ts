import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DEFAULTVALUES } from 'src/app/constants/defaultValue';
import { PATHS } from 'src/app/constants/paths';
import { Attendence } from 'src/app/models/attendence';
import { Employee } from 'src/app/models/employee';
import { AttendanceService } from 'src/app/services/attendance.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-check-in-out',
  templateUrl: './check-in-out.component.html',
  styleUrl: './check-in-out.component.css'
})
export class CheckInOutComponent implements OnInit {
  checkInOutForm!: FormGroup;
  employees: Employee[] = [];
  selectedPersonAttendence!: Attendence;
  isCheckIn: boolean = true;
  isCheckOut: boolean = false;

  constructor(private employeeService: EmployeeService, private fb: FormBuilder,
    private attendanceService: AttendanceService, private message: NzMessageService,
    private router: Router) { }

  ngOnInit(): void {
    this.checkInOutForm = this.fb.group({
      id: new FormControl(DEFAULTVALUES.EmptyGuid),
      employeeId: new FormControl("", Validators.required),
      checkInOutTime: new FormControl({ value: new Date().toLocaleTimeString(), disabled: true }, Validators.required),
    });
    this.getEmployees();
  }

  //DATA
  getEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (error) => {
        console.log(error);
        this.message.error("Oops. Something went wrong.");
      }
    });
  }

  getCurrentDateAttendenceByEmployeeId(id: any) {
    if (id) {
      this.attendanceService.getCurrentDateAttendenceByEmployeeId(id).subscribe({
        next: (data) => {
          this.selectedPersonAttendence = data;
          this.checkInOutForm.patchValue({ id: data.id });

          if (data.checkInTime == null) {
            this.isCheckOut = false;
            this.isCheckIn = true;
          }
          else if (data.checkOutTime == null) {
            this.isCheckOut = true;
            this.isCheckIn = false;
          }
          else {
            this.isCheckIn = false;
            this.isCheckOut = false;
          }
        },
        error: (error) => {
          if (error.status == 404) {
            this.isCheckIn = true;
            this.isCheckOut = false;
          }
        }
      });
    }
  }

  checkInOutEvent() {
    if (this.checkInOutForm.valid) {
      let attendance: Attendence = {
        id: this.checkInOutForm.value.id,
        employeeId: this.checkInOutForm.value.employeeId
      }
      if (this.isCheckIn) {
        attendance.date = new Date();
        attendance.checkInTime = this.checkInOutForm.get('checkInOutTime')?.value;
      }
      else {
        if (this.selectedPersonAttendence) {
          attendance.date = this.selectedPersonAttendence.date;
          attendance.checkInTime = this.selectedPersonAttendence.checkInTime;
          attendance.checkOutTime = this.checkInOutForm.get('checkInOutTime')?.value;
        }
      }
      this.attendanceService.checkInOut(attendance).subscribe({
        next: (data) => {
          console.log(data);
          this.checkInOutForm.patchValue({
            id: DEFAULTVALUES.EmptyGuid,
            employeeId: "",
            checkInOutTime: new Date().toLocaleTimeString()
          });
        },
        error: (error) => {
          console.log(error);
          this.message.error("Oops! something unexpected occurs.");
        }
      });
    }
    else {
      Object.values(this.checkInOutForm.controls).map(val => {
        if (val.invalid) {
          val.markAllAsTouched();
          val.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  //NAVIGATIONS
  navToAllEmployees() {
    this.router.navigate([PATHS.allEmployees]);
  }
}
