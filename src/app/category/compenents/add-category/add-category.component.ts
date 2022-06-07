import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryServiceService } from '../../service/category-service.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
//elementRef:ElementRef={} as ElementRef;

export class AddCategoryComponent implements OnInit,AfterViewInit {

  @ViewChild('titleInput') titleInput!:ElementRef;
  @ViewChild('descriptionInput') descriptionInput!:ElementRef

  'addNewCategoryForm':FormGroup=new FormGroup({
    'title':new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z]{3,}$/)]),
    'description':new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z ]{5,}$/)])
})

  constructor(private _CategoryServiceService:CategoryServiceService,private _Router:Router) { }

  ngAfterViewInit(): void {
    this.titleInput.nativeElement.tabIndex=-1;
    this.descriptionInput.nativeElement.tabIndex=-1;
  }

  ngOnInit(): void {}

  add(){
   if(this.addNewCategoryForm.valid)
   {
     const formdata= new FormData();
    //  formdata.append('title',this.addNewCategoryForm.get('title')?.value)
    //  formdata.append('description',this.addNewCategoryForm.get('description')?.value)

      this._CategoryServiceService.add(this.addNewCategoryForm.value).subscribe((next)=>{
        this._Router.navigate(['/categories']);
      });

   }
  }
}
