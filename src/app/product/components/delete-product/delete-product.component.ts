import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/models/iproduct';
import { ProductServiceService } from '../../service/product-service.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

  // product:IProduct = {
  //   Id: 0,
  //   title: null,
  //   price:null,
  //   image:null,
  //   description:null,
  //   category:null
  // }
  constructor(private serv:ProductServiceService,private actRout:ActivatedRoute ,private rout:Router) {

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
  //  saveAfterEdit(){
  //   let id:any = this.actRout.snapshot.paramMap.get("id");
  //    this.serv.updateProduct(id,this.product).subscribe({
  //      next:(item)=>{ },
  //      complete:()=>{this.rout.navigate(['products/']);}

  //    });


  }
