import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchValueFrom: string = ""
  searchValueTo: string = ""
  showAddFrom: boolean = true;
  showAddTo: boolean = true;
  newFromPlace = ""
  newToPlace = ""
  fromPoint = ""
  toPoint = ""
  lastfromPoint = ""
  lasttoPoint = ""
  x: number = 40;
  y: number = 100;
  states: string[] = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware'];
  colors: string[] = ['green', 'blue', '#8C9904', '#575F02', '#69BB06', '#467F02', '#02507F', '#08027F', '#3B027F', '#2C025F', '#48025F', '#380146']
  levelTwoFlag: boolean = true;
  colorIndex: number = 0;
  selectedFromplaces = [...this.states]
  selectedToplaces = [...this.states]

  @ViewChild('canvas')
  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  constructor() {

  }
  onKeyFrom(value) {
    let filter = this.states.filter(item =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    this.selectedFromplaces = [...filter];
  }
  onKeyTo(searchValue) {
    let filter = this.states.filter(item =>
      item.toLowerCase().includes(searchValue.toLowerCase())
    );
    this.selectedToplaces = [...filter];
  }

  addPlaceFrom(newPlace) {
    this.states.push(newPlace)
    this.onKeyFrom("")
    this.searchValueFrom = ""
    this.newFromPlace = ""

  }
  addPlaceTo(newPlace) {
    this.states.push(newPlace)
    this.onKeyTo("")
    this.searchValueTo = ""
    this.newToPlace = ""
  }
  fromValueChange(from) {
    console.log(from)
    this.fromPoint = from

  }
  addTrip() {
    this.colorIndex = this.colorIndex + 1;
    this.colorIndex = this.colorIndex % this.colors.length;
    if (this.lastfromPoint == "" && this.lasttoPoint == "") {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
      this.ctx.fillText(this.fromPoint.substring(0,3).toUpperCase()  + "-" + this.toPoint.substring(0,3).toUpperCase() , this.x - 20, this.y + 20);

      this.ctx.fillStyle = this.colors[this.colorIndex];
      this.ctx.strokeStyle = this.colors[this.colorIndex];
      this.ctx.fill()
      //this.ctx.fill("#ff0000");
      this.ctx.stroke();
      this.x = this.x + 5;
    }
    else if (this.lasttoPoint == this.fromPoint && (this.lastfromPoint != this.fromPoint && this.lasttoPoint != this.toPoint)) {

      this.ctx.beginPath();
      this.ctx.moveTo(this.x, this.y);
      this.ctx.lineWidth = 2;
      this.ctx.lineCap = 'round';

      this.x = this.x + 80;
      this.ctx.lineTo(this.x, this.y);
      this.x = this.x + 5;
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
      this.ctx.fillStyle = this.colors[this.colorIndex];
      this.ctx.strokeStyle = this.colors[this.colorIndex];
      this.ctx.fill()
      this.ctx.fillText(this.fromPoint.substring(0,3).toUpperCase()  + "-" + this.toPoint.substring(0,3).toUpperCase() , this.x - 10, this.y + 20);
      this.ctx.stroke();
      this.x = this.x + 5;
    }
    else if ((this.lasttoPoint != this.fromPoint && (this.lastfromPoint != this.fromPoint && this.lasttoPoint != this.toPoint))) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.x, this.y);
      this.ctx.lineWidth = 2;
      this.ctx.lineCap = 'round';

      this.x = this.x + 80;
      this.ctx.lineTo(this.x, this.y);
      this.x = this.x + 5;
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.moveTo(this.x, this.y);
      this.ctx.lineTo(this.x - 12, this.y - 5);
      this.ctx.lineTo(this.x - 12, this.y + 5);
      this.ctx.closePath();
      this.ctx.fill();
      this.x = this.x + 5;


      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
      this.ctx.fillText(this.fromPoint.substring(0,3).toUpperCase()  + "-" + this.toPoint.substring(0,3).toUpperCase() , this.x - 10, this.y + 20);
      this.ctx.stroke();
      this.x = this.x + 5;
    }
    else if (this.lastfromPoint == this.fromPoint && this.lasttoPoint == this.toPoint) {
      if (this.levelTwoFlag){
        this.ctx.clearRect(this.x-12, this.y-6, 20, 15);
        this.ctx.clearRect(this.x-10, this.y+10, 100, 40);
        this.x = this.x + 60;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y - 50, 5, 0, 2 * Math.PI);
        this.ctx.fillText(this.lastfromPoint.substring(0,3).toUpperCase()  + "-" + this.lasttoPoint.substring(0,3).toUpperCase() , this.x - 20, this.y - 20);
        this.ctx.strokeStyle = "#ff0000"
        this.ctx.fillStyle = "#FF0000";
        this.ctx.stroke();
        this.x = this.x + 5;
        this.levelTwoFlag=false;
      }
        this.x = this.x + 60;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y - 50, 5, 0, 2 * Math.PI);
        this.ctx.fillText(this.fromPoint.substring(0,3).toUpperCase() + "-" + this.toPoint.substring(0,3).toUpperCase() , this.x - 20, this.y - 20);
        this.ctx.strokeStyle = "#ff0000"
        this.ctx.fillStyle = "#FF0000";
        this.ctx.stroke();
        this.x = this.x + 5;
        
    }


    // this.ctx.beginPath();
    // this.ctx.moveTo(100, 100);
    // this.ctx.lineTo(88,95 );
    // this.ctx.lineTo(88,105);
    // this.ctx.closePath();
    // this.ctx.fill();
    // console.log(this.fromPoint,this.toPoint)
    // this.ctx.beginPath();
    // this.ctx.moveTo(20, 20);
    // this.ctx.lineWidth = 2;
    // this.ctx.lineCap = 'round';
    // this.ctx.fillText(this.fromPoint+"-"+this.toPoint,100, 30);

    // this.ctx.lineTo(100, 20);
    // this.ctx.stroke();

    // this.ctx.beginPath();
    // this.ctx.arc(105, 20,5,0,2*Math.PI);
    // this.ctx.stroke();

    this.lastfromPoint = this.fromPoint
    this.lasttoPoint = this.toPoint
    this.ctx.clearRect(0, 0, 2, 2);
  }
}
