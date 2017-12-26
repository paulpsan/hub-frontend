

    import { Component } from '@angular/core';
    
   @Component({
     selector: 'chart-lenguajes',
     templateUrl: './lenguajes.component.html'
   })
   export class LenguajesComponent {
     // Pie
     public pieChartLabels:string[] = ['JavaScript', 'Html', 'Otros'];
     public pieChartData:number[] = [300, 500, 100];
     public pieChartType:string = 'pie';
    
     // events
     public chartClicked(e:any):void {
       console.log(e);
     }

    
     public chartHovered(e:any):void {
       console.log(e);
     }
   }

