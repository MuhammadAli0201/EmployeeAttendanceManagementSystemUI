import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private _url = "https://localhost:7071/api/Employees/";
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this._url);
  }

  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(this._url + id);
  }
  
  delete(id: string): Observable<Employee> {
    return this.http.delete<Employee>(this._url + id);
  }

  createOrUpdate(employee: Employee) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post<Employee>(this._url, employee, options);
  }
}
