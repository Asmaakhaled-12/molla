import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/models/icategory';
import { CategoryServiceService } from '../../service/category-service.service';
import { CategoryDataTableComponent } from '../category-data-table/category-data-table.component';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit,AfterViewInit {
  recivedCategory!: ICategory;
  id: any;
  category!: ICategory;
  @ViewChild('titleInput') titleInput!:ElementRef;
  @ViewChild('descriptionInput') descriptionInput!:ElementRef
  'editCategoryForm': FormGroup = new FormGroup({
    title: new FormControl(null,[
      Validators.required,
      Validators.pattern(/^[a-zA-Z-& ]{3,}$/),
    ]),
    description: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[a-zA-Z-& ]{5,}$/),
    ]),
  });


  constructor(
    private _CategoryServiceService: CategoryServiceService,
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router,
    private _MatDialogRef: MatDialogRef<CategoryDataTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.recivedCategory = this.data;
    console.log("recieved",this.recivedCategory)

  }
 
  ngAfterViewInit(): void {
    this.titleInput.nativeElement.tabIndex=-1;
    this.descriptionInput.nativeElement.tabIndex=-1;
  }
  ngOnInit(): void {
   
    // this._ActivatedRoute.paramMap.subscribe((param) => {
    //   this.id = param.get('id');
    //   this._CategoryServiceService.getById(this.id).subscribe((category) => {
    //     this.category = category;
    //   });
    // });
  }

  // edit() {
  //   if (this.editCategoryForm.valid) {
  //     this._CategoryServiceService
  //       .edit(+this.id, this.editCategoryForm.value)
  //       .subscribe((next) => {
  //         this._Router.navigate(['/categories']);
  //       });
  //   }
  // }
}
