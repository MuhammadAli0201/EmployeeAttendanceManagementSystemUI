import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Attendence } from '../models/attendence';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private _url = "https://localhost:7071/api/Attendance/";
  constructor(private http: HttpClient) { }

  getByDate(date: string): Observable<Attendence[]> {
    return this.http.get<Attendence[]>(this._url + `date?date=${date}`);
  }

  checkInOut(attendance: Attendence): Observable<Attendence> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }
    return this.http.post<Attendence>(this._url + `CheckInOut`, attendance, options);
  }

  getCurrentDateAttendenceByEmployeeId(id: string): Observable<Attendence> {
    return this.http.get<Attendence>(this._url + `GetCurrentDateAttendenceByEmployeeId?id=${id}`);
  }
  
  getReport(startDate:string,endDate:string,dept:number): Observable<Attendence[]> {
    return this.http.get<Attendence[]>(this._url + `Report?startDate=${startDate}&endDate=${endDate}&department=${dept}`);
  }
}
