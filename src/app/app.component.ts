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
  x: number = 20;
  y: number = 40;
  level2: boolean = false;
  prev_level2: boolean = false;
  discontinuos_travel: boolean = false;
  states: string[] = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware'];
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

  drawcircle() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
    this.ctx.fillText(this.fromPoint.slice(0, 3) + "-" + this.toPoint.slice(0, 3), this.x - 20, this.y + 20);
    this.ctx.stroke();
    this.x = this.x + 5;
  }
  drawline(x_len, y_len) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = 'round';

    this.x = this.x + x_len;
    this.y = this.y + y_len;
    this.ctx.lineTo(this.x, this.y);
    this.x = this.x + 5;
    this.ctx.stroke();
  }
  drawarrowline(x_len, y_len, ang) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = 'round';

    this.x = this.x + x_len;
    this.y = this.y + y_len;
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



  }
  addTrip() {
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


}
