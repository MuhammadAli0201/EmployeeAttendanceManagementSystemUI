import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Attendence } from 'src/app/models/attendence';
import { AttendanceService } from 'src/app/services/attendance.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  attendence: Attendence[] = [];
  filterDate: string = new Date().toISOString().slice(0, 10);

  constructor(private attendenceService: AttendanceService, private message: NzMessageService) {

  }

  ngOnInit(): void {
    this.getAttendenceByDate(new Date());
  }

  //UI LOGIC
  getAttendenceByDateEvent(event: any) {
    const val = event.target.value;
    this.getAttendenceByDate(new Date(val));
  }

  formatedTime(date: Date) {
    return new Date(date).toLocaleTimeString();;
  }
  //DATA
  getAttendenceByDate(date: Date) {
    this.attendenceService.getByDate(date.toISOString()).subscribe({
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
