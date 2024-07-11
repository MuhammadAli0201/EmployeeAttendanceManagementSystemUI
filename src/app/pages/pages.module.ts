import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { AddUpdateEmployeeComponent } from './add-update-employee/add-update-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AllEmployeeComponent } from './all-employee/all-employee.component';
import { RouterModule } from '@angular/router';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CheckInOutComponent } from './check-in-out/check-in-out.component';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { EmployeeCalanderViewComponent } from './employee-calander-view/employee-calander-view.component';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

@NgModule({
  declarations: [
  EmployeeManagementComponent,
  AddUpdateEmployeeComponent,
  AllEmployeeComponent,
  DashboardComponent,
  CheckInOutComponent,
  AttendanceReportComponent,
  EmployeeCalanderViewComponent
  ],
  imports: [
    CommonModule,
    NzMessageModule,
    NzFlexModule,
    NzTableModule,
    NzDividerModule,
    NzButtonModule,
    NzInputModule,
    NzFormModule,
    NzDropDownModule,
    ReactiveFormsModule,
    NzSelectModule,
    RouterModule,
    NzPopconfirmModule,
    FormsModule,
    NzCalendarModule,
    NzBadgeModule
]
})
export class PagesModule { }
