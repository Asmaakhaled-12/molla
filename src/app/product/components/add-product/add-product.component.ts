import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { IProduct } from 'src/app/models/iproduct';
import { ProductServiceService } from '../../service/product-service.service';
import { CategoryServiceService } from 'src/app/category/service/category-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  imgURL:any;
  categoryList:any;
  product ={} as IProduct;

  productForm !:FormGroup;
  actionBtn:string = "Save";
  constructor(private formBuilder:FormBuilder,
    private toastr:ToastrService,
    private catService:CategoryServiceService,
       private rout:Router,
          private serv:ProductServiceService,
        @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef:MatDialogRef<AddProductComponent>
    ) { }
  ngOnInit(): void {
    this.getAllCatgeories();
    console.log("ghjk")
    this.productForm = this.formBuilder.group({
     id:[''],
     title:['',[Validators.required,Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
     price:['',[Validators.required,Validators.pattern(/^[0-9]{2,}$/)]],
     quantity:['',[Validators.required,Validators.pattern(/^[0-9]{1,}$/)]],
     category:['',Validators.required],
     image:[null,Validators.required],
     description:['',Validators.required],
      offer:['']//[Validators.required,Validators.pattern(/^[0-9]{2,}$/)]]
    });
    if(this.editData)
    {
      this.actionBtn = "Update";
      //this.productForm.controls['id'].setValue(this.editData.id);
      this.productForm.controls['title'].setValue(this.editData.title);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['description'].setValue(this.editData.description);
      this.productForm.controls['image'].setValue(this.editData.image);
      this.productForm.controls['offer'].setValue(this.editData.offer);
    }
  }
  getAllCatgeories(){
    this.catService.getAll().subscribe((data)=>{this.categoryList=data})
  }
  imgePreview(){
    var arr=this.productForm.value.image.split("\\");
    this.productForm.value.image="assets/images/products/"+arr[arr.length-1]
  }
  addProduct() {

    if(!this.editData)
    {
      if(this.productForm.valid){
        var arr=this.productForm.value.image.split("\\");
        this.productForm.value.image="assets/images/products/"+arr[arr.length-1];
        this.productForm.value.category=this.productForm.value.category.title;
        this.productForm.value.id = 1
        this.serv.addProduct(this.productForm.value).subscribe({
          next:(re)=>{
            this.toastr.success(
              'product added succesufully!',
              undefined,
              {
                positionClass: 'toast-bottom-right',
              }
            );
            //alert("product added succesufully");
            this.productForm.reset();
            this.dialogRef.close();
            console.log(re);
          },
          error:()=>{
            console.log(this.productForm.value);
            this.toastr.error(
              'Error While adding Product!',
              undefined,
              {
                positionClass: 'toast-bottom-right',
              }
            );
            //alert("Error While adding Product");
          }
        })
      }
    }
    else{
        this.updateProductData()
      }
    }

    updateProductData(){
      console.log(this.productForm.value)
      this.productForm.value.id = this.editData.id;
      this.productForm.value.category = this.productForm.value.category.title
      this.serv.updateProduct(this.productForm.value,this.editData.id)
      .subscribe({
        next:(res)=>{
          this.toastr.success(
            'Product Updated Successfully!',
            undefined,
            {
              positionClass: 'toast-bottom-right',
            }
          );
          //alert("Product Updated Successufly");
          console.log(res)
          this.productForm.reset;
        this.dialogRef.close('updated');
      },

      error:()=>{
        this.toastr.error(
          'Error While Updating Product!',
          undefined,
          {
            positionClass: 'toast-bottom-right',
          }
        );
       // alert("Error while Upadting Product" );
      }
      })
    }


}


