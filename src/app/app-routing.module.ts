import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PATHS } from './constants/paths';
import { EmployeeManagementComponent } from './pages/employee-management/employee-management.component';
import { AddUpdateEmployeeComponent } from './pages/add-update-employee/add-update-employee.component';
import { AllEmployeeComponent } from './pages/all-employee/all-employee.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CheckInOutComponent } from './pages/check-in-out/check-in-out.component';
import { AttendanceReportComponent } from './pages/attendance-report/attendance-report.component';
import { EmployeeCalanderViewComponent } from './pages/employee-calander-view/employee-calander-view.component';

const routes: Routes = [
  {
    path: PATHS.default,
    redirectTo: PATHS.allEmployees,
    pathMatch: 'full'
  },
  {
    path:PATHS.allEmployees,
    component:EmployeeManagementComponent,
    children:[
      {
        path:PATHS.default,
        component:AllEmployeeComponent
      },
      {
        path:PATHS.createOrUpdateEmployee,
        component:AddUpdateEmployeeComponent
      },
      {
        path:PATHS.createOrUpdateEmployee+"/:id",
        component:AddUpdateEmployeeComponent
      },
      {
        path:PATHS.employeeCalanderView+"/:id",
        component:EmployeeCalanderViewComponent
      }
    ]    
  },
  {
    path:PATHS.dashboard,
    component:DashboardComponent,
  },
  {
    path:PATHS.checkInOut,
    component:CheckInOutComponent,
  },
  {
    path:PATHS.attendanceReport,
    component:AttendanceReportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
