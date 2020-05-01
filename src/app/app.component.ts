import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  //   this.agencyDD.splice( 0, 0, { agency: 'None' } );
  searchValueFrom:string=""
  searchValueTo:string=""
  showAdd:boolean=true;
  newFromPlace=""
  newToPlace=""
  states: string[] = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware'  ];
  selectedFromplaces = [...this.states]
  selectedToplaces = [...this.states]


    constructor( ){

    }
    onKeyFrom( value ) {
      let filter = this.states.filter( item =>
          item.toLowerCase().includes( value.toLowerCase() )
      );
      this.selectedFromplaces = [...filter];
  }
  onKeyTo(searchValue){
    let filter = this.states.filter( item =>
      item.toLowerCase().includes( searchValue.toLowerCase() )
  );
  this.selectedToplaces = [...filter];
  }

  addPlaceFrom(newPlace){
    this.states.push(newPlace)
    this.onKeyFrom("")
    this.searchValueFrom=""
    this.newFromPlace=""
    
  }
  addPlaceTo(newPlace){
    this.states.push(newPlace)
   this. onKeyTo("")
   this.searchValueTo=""
    this.newToPlace=""
  }
  }
