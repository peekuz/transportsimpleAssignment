import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { NgModule } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
@NgModule({
  imports: [ MatButtonModule, MatCheckboxModule,MatSelectModule,MatIconModule ],
  exports: [ MatButtonModule, MatCheckboxModule,MatSelectModule,MatIconModule ]
})

export class MaterialModule {

}