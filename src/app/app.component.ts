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
  fromPoint=""
  toPoint=""
  lastfromPoint=""
  lasttoPoint=""
  x:number=20;
  y:number =40;
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
  fromValueChange(from){
    console.log(from)
    this.fromPoint=from

  }
  addTrip() {
    if( this.lastfromPoint=="" &&this.lasttoPoint==""){
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y,5,0,2*Math.PI);
      this.ctx.fillText(this.fromPoint+"-"+this.toPoint,this.x-20, this.y+20);
      this.ctx.stroke();
      this.x=this.x+5;
    }
    else if( this.lastfromPoint != this.fromPoint && this.lasttoPoint !=this.toPoint){
      this.ctx.beginPath();
      this.ctx.moveTo(this.x, this.y);
      this.ctx.lineWidth = 2;
      this.ctx.lineCap = 'round';
      
      this.x = this.x+80;
      this.ctx.lineTo(this.x, this.y);
      this.x =this.x+5;
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y,5,0,2*Math.PI);
      this.ctx.fillText(this.fromPoint+"-"+this.toPoint,this.x-10,this.y+20);
      this.ctx.stroke();
      this.x =this.x+5;
    }
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
     this.lasttoPoint =this.toPoint
  }
}
