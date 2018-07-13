import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../../services/http/http.service";
import { MatDialog } from "@angular/material";

@Component({
  selector: "chart-commits",
  templateUrl: "./commits.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommitsComponent {
  @Input() data;
  datos;
  id;

  public barChartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true
  };

  public barChartLabels: string[];
  public barChartType: string = "bar";
  public barChartLegend: boolean = true;

  public barChartData: any[] = [{ data: [0], label: "" }];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public randomize(): void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.random() * 100,
      56,
      Math.random() * 100,
      40
    ];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    console.log(this.data);

    // let repositorio;
    // let date;
    // let vecData=[];
    // let vecLabel=[]
    // for(let i in this.data){
    //   let commits=[] ;
    //   commits.push(this.data[i].commits.length);
    //   repositorio= this.data[i].repo.name;
    //   let fecha = new Date(this.data[i].repo.created_at);
    //   vecData.push({data:commits,label: repositorio});
    //   vecLabel.push(fecha.getFullYear());
    //   // this.barChartData[i].label=this.data[i].repo.name;
    //   // repositorio.push(value.repo.name);
    //   // commits.push(value.commits.length)
    // }
    // let clone = JSON.parse(JSON.stringify(vecData));
    // // clone[0].data = data;
    // this.barChartData = clone;

    // console.log(vecData)
    // this.barChartLabels=vecLabel;

    // this.route.params.subscribe(params => {
    //   this.id = params['id'];
    // });

    // if (this.id) { //edit form
    //   this._httpService.buscarId('usuarios',this.id).subscribe(
    //     resp => {
    //         this.datos = resp.datos;
    //         console.log(this.datos)
    //      },error => {
    //       console.log(error);
    //      }
    //   );
    // }
  }
}
