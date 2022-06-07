import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/models/iproduct';
import { ProductServiceService } from '../../service/product-service.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  // product:IProduct = {
  //   Id: 0,
  //   title: null,
  //   price:null,
  //   image:null,
  //   description:null,
  //   category:null,
  //   quantity:null
  // }
  constructor(private serv:ProductServiceService,private actRout:ActivatedRoute ,private rout:Router) {
    // this.displayData();
   }

   ngOnInit(): void {
   }
  //  displayData(){
  //    let id:any = this.actRout.snapshot.paramMap.get("id");
  //    this.serv.getById(id).subscribe({
  //      next:(item)=>{this.product = item },
  //      complete:()=>{}
  //    });
  //  }
    // saveAfterEdit()
    // {
    // let id:any = this.actRout.snapshot.paramMap.get("id");
    //  this.serv.updateProduct(id,this.product).subscribe({
    //    next:(item)=>{ },
    //    complete:()=>{this.rout.navigate(['products/']);}

    //  });




 }
