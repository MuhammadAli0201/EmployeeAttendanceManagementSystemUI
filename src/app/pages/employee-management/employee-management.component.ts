import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageComponent, NzMessageService } from 'ng-zorro-antd/message';
import { PATHS } from 'src/app/constants/paths';
import { DepartmentEnum } from 'src/app/models/departmentEnum';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrl: './employee-management.component.css'
})
export class EmployeeManagementComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService,
    private message: NzMessageService, private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getEmployees();
    console.log(this.employees);
  }

  //UI LOGIC
  popluateEmployees() {
    console.log(this.employees);
  }

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

  //NAVIGATIONS
  navToAddOrUpdate(id: string) {
    this.router.navigate([PATHS.allEmployees, PATHS.createOrUpdateEmployee, id]);
  }
}
