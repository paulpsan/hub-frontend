

    import { Component } from '@angular/core';

   @Component({
     selector: 'chart-lenguajes',
     templateUrl: './lenguajes.component.html'
   })
   export class LenguajesComponent {
     // Pie
     public pieChartLabels:string[] = ['JavaScript', 'Html', 'Css','TypeScript','Otros'];
     public pieChartData:number[] = [Math.round(Math.random() * 100), (Math.random() * 100),(Math.random() * 100),30,(Math.random() * 100)];
     public pieChartType:string = 'pie';

     // events
     public chartClicked(e:any):void {
       console.log(e);
     }


     public chartHovered(e:any):void {
       console.log(e);
     }
   }

