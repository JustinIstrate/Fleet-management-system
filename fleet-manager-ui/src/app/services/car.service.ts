import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CarService {
  private carsUrl = 'http://localhost:8080/api/cars';
  private maintenanceUrl = 'http://localhost:8080/api/maintenance'; // Updated to match your Controller

  constructor(private http: HttpClient) { }

  getCars(): Observable<any[]> {
    return this.http.get<any[]>(this.carsUrl);
  }

  // Points to @GetMapping("/{carId}") in your MaintenanceLogController
  getMaintenanceLogs(carId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.maintenanceUrl}/${carId}`);
  }

  // Bonus: Points to @GetMapping("/total/{carId}")
  getTotalCost(carId: number): Observable<number> {
    return this.http.get<number>(`${this.maintenanceUrl}/total/${carId}`);
  }
}
