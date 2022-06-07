import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
   ToastrModule.forRoot(),
     MatTableModule,
     MatButtonModule,
     MatInputModule,
     MatDialogModule,
     MatIconModule,
     MatPaginatorModule,
     BrowserAnimationsModule,
     MatStepperModule
  ],
  exports:[
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatStepperModule
  ]
})
export class AngularMaterialModule { }
