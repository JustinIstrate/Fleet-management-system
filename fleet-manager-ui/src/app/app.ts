import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from './services/car.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html', // <--- Asigură-te că fișierul tău se numește exact app.html
  styleUrl: './app.css'      // <--- Asigură-te că fișierul tău se numește exact app.css
})
export class App implements OnInit {
  cars: any[] = [];
  maintenanceLogs: any[] = [];
  selectedCar: any = null;
  totalCost: number = 0;
  errorMsg: string = '';

  constructor(
    private carService: CarService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.carService.getCars().subscribe({
      next: (data) => {
        this.cars = data;
        this.cdr.detectChanges(); // Forțează afișarea mașinilor
      },
      error: (err) => this.errorMsg = 'Backend is unreachable.'
    });
  }

  viewLogs(car: any) {
    this.selectedCar = car;
    this.maintenanceLogs = [];
    this.totalCost = 0;

    // Luăm log-urile
    this.carService.getMaintenanceLogs(car.id).subscribe({
      next: (data) => {
        this.maintenanceLogs = data;
        this.cdr.detectChanges(); // Forțează afișarea log-urilor
      }
    });

    // Luăm costul total
    this.carService.getTotalCost(car.id).subscribe({
      next: (cost) => {
        this.totalCost = cost;
        this.cdr.detectChanges(); // Forțează afișarea sumei
      }
    });
  }

  closeLogs() {
    this.selectedCar = null;
    this.maintenanceLogs = [];
  }
}
