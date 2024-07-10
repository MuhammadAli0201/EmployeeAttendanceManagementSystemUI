import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DEFAULTVALUES } from 'src/app/constants/defaultValue';
import { PATHS } from 'src/app/constants/paths';
import { DepartmentEnum } from 'src/app/models/departmentEnum';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-update-employee',
  templateUrl: './add-update-employee.component.html',
  styleUrl: './add-update-employee.component.css'
})
export class AddUpdateEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  departmentOptions: any = [];

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService, private messageService: NzMessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      id: new FormControl({ value: DEFAULTVALUES.EmptyGuid, disabled: true }),
      name: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      department: new FormControl("", [Validators.required])
    });
    this.departmentOptions = this.getDeptEnum();

    const id = this.activatedRoute.snapshot.params['id'];
    if (id)
      this.popluateFormWithId(id);
  }

  //UI LOGIC
  popluateFormWithId(id: string) {
    this.employeeService.getEmployeeById(id).subscribe({
      next: (employee) => {
        if (employee) {
          this.employeeForm.patchValue({
            id: employee.id,
            name: employee.name,
            email: employee.email,
            department: employee.department
          });
        }
      },
      error: (error) => {
        console.log(error);
        this.messageService.error("Oops! Something unexpected occurs.");
      }
    });
  }

  getDeptEnum() {
    return Object.keys(DepartmentEnum)
      .filter(key => isNaN(Number(key)))
      .map(key => ({
        label: key,
        value: (DepartmentEnum as any)[key] as number
      }));
  }

  //DATA LOGIC
  createOrUpdate() {
    if (this.employeeForm.valid) {
      const employee: Employee = {
        id: this.employeeForm.get('id')?.value,
        name: this.employeeForm.value.name,
        department: this.employeeForm.value.department,
        email: this.employeeForm.value.email
      };
      this.employeeService.createOrUpdate(employee).subscribe({
        next: (employee: Employee) => {
          this.messageService.success("Employee Saved successfully");
          this.navToCreateOrUpdate(employee.id);
        },
        error: (error: any) => {
          console.log(error);
          if (error.status == 400)
            this.messageService.error("Oops! Email Already Exist.");
          else
            this.messageService.error("Oops! Something unexpected occurs.");
        }
      });
    }
    else {
      Object.values(this.employeeForm.controls).forEach((val) => {
        if (val.invalid) {
          val.markAllAsTouched();
          val.updateValueAndValidity({ onlySelf: true });
        }
      })
    }
  }

  //NAVIGATIONS
  navToCreateOrUpdate(id: string) {
    this.router.navigate([PATHS.allEmployees, PATHS.createOrUpdateEmployee, id]);
  }

  navToAllEmployees() {
    this.router.navigate([PATHS.allEmployees])
  }
}
