import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/services/basket.service';
import { IProduct } from 'src/app/models/iproduct';
import { ProductServiceService } from '../../service/product-service.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product:IProduct;


  constructor(private productService:ProductServiceService,
   private activeRoute:ActivatedRoute,
   private _BasketService:BasketService,
   private _ToastrService:ToastrService,
   private router:Router) {
    let id = this.activeRoute.snapshot.paramMap.get('id');
    if(id){
      this.productService.getById(id).subscribe(prod=>this.product = prod);
    }
  }

  ngOnInit(): void {
  }

  outOfStock(){
    this._ToastrService.error(
      'Sorry, this product is out of stock!',
      undefined,
      {
        positionClass: 'toast-bottom-right',
      }
    );
   }

   addItemToBasket(product:IProduct){
    this._BasketService.addItemToBasket(product);
    this._ToastrService.success(
     'Added Successfully !!',
     undefined,
     {
       positionClass: 'toast-bottom-right',
     }
   );
  }

}
