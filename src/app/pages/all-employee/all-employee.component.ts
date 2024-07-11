import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PATHS } from 'src/app/constants/paths';
import { DepartmentEnum } from 'src/app/models/departmentEnum';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-all-employee',
  templateUrl: './all-employee.component.html',
  styleUrl: './all-employee.component.css'
})
export class AllEmployeeComponent {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService,
    private message: NzMessageService, private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  //UI LOGIC
  getDepartment(dept: string) {
    return DepartmentEnum[Number.parseInt(dept)];
  }

  //DATA
  getEmployees() {
    let employees: Employee[] = [];
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (error) => {
        console.log(error);
        this.message.error("Oops. Something went wrong.");
      }
    });

    return employees;
  }

  deleteEmployee(id: string) {
    this.employeeService.delete(id).subscribe({
      next: (data) => {
        this.message.success(`${data.name} Record deleted successfully`);
        this.getEmployees();
      },
      error: (error) => {
        console.log(error);
        this.message.error("Oops. Something went wrong.");
      }
    });
  }

  //NAVIGATIONS
  navToAddOrUpdate(id: string) {
    this.router.navigate([PATHS.allEmployees, PATHS.createOrUpdateEmployee, id]);
  }

  navToCheckInOut() {
    this.router.navigate([PATHS.checkInOut]);
  }

  navToAttendenceDashboard() {
    this.router.navigate([PATHS.dashboard]);
  }

  navToAttendanceReport() {
    this.router.navigate([PATHS.attendanceReport]);
  }

  navToCalenderView(id: string) {
    this.router.navigate([PATHS.allEmployees, PATHS.employeeCalanderView,id]);
  }
}
