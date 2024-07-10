import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Attendence } from 'src/app/models/attendence';
import { DepartmentEnum } from 'src/app/models/departmentEnum';
import { AttendanceService } from 'src/app/services/attendance.service';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrl: './attendance-report.component.css'
})
export class AttendanceReportComponent {
  reportSearchForm!: FormGroup;
  attendence: Attendence[] = [];
  date: Date = new Date();
  departmentOptions: any = [];

  constructor(private attendenceService: AttendanceService, private fb: FormBuilder,
    private message: NzMessageService) {

  }

  ngOnInit(): void {
    this.reportSearchForm = this.fb.group({
      filterStartDate: new FormControl('', Validators.required),
      filterEndDate: new FormControl('', Validators.required),
      department: new FormControl("", Validators.required)
    });

    this.getCurrentDateAttendence();
    this.departmentOptions = this.getDeptEnum();
  }

  //UI LOGIC
  formatedTime(date: Date) {
    return new Date(date).toLocaleTimeString();
  }
  
  formatedDate(date: Date) {
    return new Date(date).toLocaleDateString();
  }

  getDeptEnum() {
    return Object.keys(DepartmentEnum)
      .filter(key => isNaN(Number(key)))
      .map(key => ({
        label: key,
        value: (DepartmentEnum as any)[key] as number
      }));
  }


  //DATA
  SearchForReport() {
    if (this.reportSearchForm.valid) {
      console.log(this.reportSearchForm);
      const startDate = new Date(this.reportSearchForm.get('filterStartDate')?.value).toISOString();
      const endDate = new Date(this.reportSearchForm.get('filterEndDate')?.value).toISOString();
      const department = this.reportSearchForm.get('department')?.value;
      
      this.attendenceService.getReport(startDate, endDate, department).subscribe({
        next: (data) => {
          this.attendence = data;
        },
        error: (error) => {
          console.log(error);
          this.message.error("Oop! Something went wrong.");
        }
      });
    }
    else {
      Object.values(this.reportSearchForm.controls).map(val => {
        if (val.invalid) {
          val.markAllAsTouched();
          val.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  getCurrentDateAttendence() {
    this.attendenceService.getByDate(new Date().toISOString()).subscribe({
      next: (data) => {
        this.attendence = data;
      },
      error: (error) => {
        console.log(error);
        this.message.error("Oop! Something went wrong.");
      }
    });
  }
}
