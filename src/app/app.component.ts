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
  level2: boolean = false;
  prev_level2: boolean = false;
  discontinuos_travel: boolean = false;
  states: string[] = ['Malappuram', 'Palakkad', 'Coimbatore', 'Bangalore', 'Delhi', 'Shornur', 'Chennai', 'Mangalore'];
  selectedFromplaces = [...this.states]
  selectedToplaces = [...this.states]
  colors: string[] = ['green', 'blue', '#8C9904', '#575F02', '#69BB06', '#467F02', '#02507F', '#08027F', '#3B027F', '#2C025F', '#48025F', '#380146']
  colorIndex: number = 0;
  @ViewChild('canvas')
  canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
   this. ctx.canvas.width  = window.innerWidth;
   this. ctx.canvas.height = window.innerHeight;
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
    // this.onKeyFrom("")
    this.selectedFromplaces = [...this.states]
    this.selectedToplaces = [...this.states]
    this.searchValueFrom = ""
    this.newFromPlace = ""

  }
  addPlaceTo(newPlace) {
    this.states.push(newPlace)
    this.selectedToplaces = [...this.states]
    this.selectedFromplaces = [...this.states]
    // this.onKeyTo("")
    this.searchValueTo = ""
    this.newToPlace = ""
  }
  

  drawcircle() {
    this.x = this.x + 5;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
    this.ctx.fillText(this.fromPoint.slice(0, 3).toUpperCase() + "-" + this.toPoint.slice(0, 3).toUpperCase(), this.x - 20, this.y + 20);
    this.ctx.fillStyle = this.colors[this.colorIndex];
    this.ctx.strokeStyle = this.colors[this.colorIndex];
    this.ctx.stroke();
    this.x = this.x + 5;
  }
  drawline(x_len, y_len) {
    this.x = this.x + 5;
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = 'round';

    this.x = this.x + x_len;
    this.y = this.y + y_len;
    this.ctx.lineTo(this.x, this.y);
    this.x = this.x + 5;
    this.ctx.fillStyle = this.colors[this.colorIndex];
    this.ctx.strokeStyle = this.colors[this.colorIndex];
    this.ctx.stroke();
  }
  drawarrowline(x_len, y_len, ang) {
    this.x = this.x + 5;
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = 'round';

    this.x = this.x + x_len;
    this.y = this.y + y_len;
    this.ctx.lineTo(this.x, this.y);
    this.x = this.x + 5;
    this.ctx.fillStyle = this.colors[this.colorIndex];
    this.ctx.strokeStyle = this.colors[this.colorIndex];
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x - 12, this.y - 5);
    this.ctx.lineTo(this.x - 12, this.y + 5);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.fillStyle = this.colors[this.colorIndex];
    this.ctx.strokeStyle = this.colors[this.colorIndex];
    this.x = this.x + 5;
  }
  

  addTrip() {
    this.colorIndex = this.colorIndex + 1;
    this.colorIndex = this.colorIndex % this.colors.length;
    if (this.lastfromPoint == "" && this.lasttoPoint == "") {
      this.drawcircle()
    }
    else if (this.lastfromPoint === this.fromPoint && this.lasttoPoint === this.toPoint) {
      //this.ctx.clearRect(this.x -75,this.y,80,50);
      //this.ctx.beginPath();
      if (!this.level2 && !this.prev_level2) {
        if (this.lastfromPoint != "" && this.lasttoPoint != "") {
          this.ctx.clearRect(this.x - 90, this.y - 10, 95, 20)
          this.ctx.clearRect(this.x - 30, this.y, 60, 30)
          this.x = this.x - 90;
        }
        if (!this.discontinuos_travel) {
          this.drawline(80, 80);
          this.drawcircle();
          this.drawline(80, 0);
          this.drawcircle();
        }
        else {
          this.drawline(80, 80);
          this.drawcircle();
          this.drawline(80, 0);
          this.drawcircle();
          this.discontinuos_travel = false;
        }
        this.level2 = true;
        this.prev_level2 = true;
      }
      else if (!this.level2 && this.prev_level2) {
        this.ctx.clearRect(this.x - 90, this.y - 10, 95, 90)
        this.ctx.clearRect(this.x - 30, this.y, 60, 30)
        this.x = this.x - 90;
        this.y = this.y + 80;

        if (!this.discontinuos_travel) {
          this.drawline(80, 0);
          this.drawcircle();
          this.drawline(80, 0);
          this.drawcircle();
        }
        else {
          this.drawarrowline(80, 0, 0);
          this.drawcircle();
          this.drawline(80, 0);
          this.drawcircle();
          this.discontinuos_travel = false;
        }
        this.level2 = true;
        this.prev_level2 = false;


      }
      else {
        this.drawline(80, 0);
        this.drawcircle()
      }

    }
    else if (this.lasttoPoint === this.fromPoint) {
      if (!this.level2) {
        this.drawline(80, 0);
        this.drawcircle();
        if (this.prev_level2) {
          this.prev_level2 = false;
        }
      } else {
        this.drawline(80, -80);
        this.drawcircle();
        this.level2 = false
        this.prev_level2 = true;
      }
    }
    else if (this.lasttoPoint !== this.fromPoint) {
      this.discontinuos_travel = true;
      if (!this.level2) {
        this.drawarrowline(80, 0, 0)
        this.drawcircle();
        if (this.prev_level2) {
          this.prev_level2 = false;
        }
      } else {
        this.drawline(80, -80);
        this.drawcircle();
        this.level2 = false;
        this.prev_level2 = true;
      }
    }
    this.lastfromPoint = this.fromPoint
    this.lasttoPoint = this.toPoint
  
  }
  disableAddtrip(){
    if(this.fromPoint != "" && this.toPoint != ""){
      return false;
    }else{
      return true;
    }
  }

}
