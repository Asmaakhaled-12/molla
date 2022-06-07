import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { BasketService } from 'src/app/basket/services/basket.service';
import { CategoryServiceService } from 'src/app/category/service/category-service.service';
import { IProduct } from 'src/app/models/iproduct';
import { ProductServiceService } from 'src/app/product/service/product-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allproducts:any[]=[];
  filteredProducts:any[]=[];
  allcategories:any[]=[];
  category:any;

   constructor(private Productsserv:ProductServiceService,
    private _BasketService:BasketService,
    private rout:ActivatedRoute,
    private servCat:CategoryServiceService ) {
      Productsserv.getAllProducts().subscribe(products=>{
        this.allproducts = products

        this.rout.queryParamMap.subscribe(params=>{
          this.category = params.get('category');
          this.filteredProducts = (this.category) ?
          this.allproducts.filter(p=>p.category === this.category):
          this.allproducts;
        });

      });
     }
     addItemToBasket(product:IProduct){
      this._BasketService.addItemToBasket(product);
     // console.log(product);
    }
   ngOnInit(): void {
     this.getAllCategories();
     this.filterData();
   }
   filterData(){


   }
   getAllProducts()
   {
     this.filteredProducts = this.allproducts;

    }
     getAllCategories()
      {
       this.servCat.getAll().subscribe({
        next:(item)=>{
          this.allcategories = item.splice(0,5);
          console.log(item)
        }

        });
      }
      roleMatch(_role:string):boolean{
        let role  = localStorage.getItem("role");
         return _role==role;
      }

}
