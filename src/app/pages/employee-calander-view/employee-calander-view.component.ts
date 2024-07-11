import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Attendence } from 'src/app/models/attendence';
import { AttendanceService } from 'src/app/services/attendance.service';

@Component({
  selector: 'app-employee-calander-view',
  templateUrl: './employee-calander-view.component.html',
  styleUrl: './employee-calander-view.component.css'
})
export class EmployeeCalanderViewComponent implements OnInit {
  id: string = "";
  attendance: Attendence[] = [];
  num: number[] = [10, 20, 30, 40, 50, 60, 70];

  //LIFECYCLE
  constructor(private activatedRoute: ActivatedRoute,
    private attendanceService: AttendanceService
  ) {

  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.showDate(new Date());
  }

  //UI LOGIC
  showDate(date: Date) {
    if (this.id) {
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      this.getAttendanceByEmployeeIdMonthAndYear(this.id, month, year);
    }
  }

  formatedTime(date: Date) {
    if (date) return new Date(date).toLocaleTimeString();
    else return "-";
  }

  getAttendanceAgainstDate(date: Date): Attendence | undefined {
    const attendance: Attendence | undefined = this.attendance.find(a => new Date(a.date!).toDateString() === date.toDateString());
    return attendance;
}

  //DATA
  getAttendanceByEmployeeIdMonthAndYear(id: string, month: number, year: number) {
    this.attendanceService.getByEmployeeIdMonthAndYear(id, month, year).subscribe({
      next: val => {
        console.log(val);
        this.attendance = val;
      },
      error: error => {
        console.log(error);
      }
    });
  }
}
