import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/services/basket.service';
import { CategoryServiceService } from 'src/app/category/service/category-service.service';
import { ICategory } from 'src/app/models/icategory';
import { IProduct } from 'src/app/models/iproduct';
import { ProductServiceService } from 'src/app/product/service/product-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  allproducts:any[]=[];
  filteredProducts:any[]=[];
  allcategories:any[]=[];
  category:any;
  searchKey:string = "";
  public searchTerm:string="";

   constructor(private ProductService:ProductServiceService,
    private _BasketService:BasketService,
    private rout:ActivatedRoute,
    private servCat:CategoryServiceService,
    private _ToastrService: ToastrService ) {
      ProductService.getAllProducts().subscribe(products=>{
        this.allproducts = products;

        this.rout.queryParamMap.subscribe(params=>{
          this.category = params.get('category');
          this.filteredProducts = (this.category) ?
          this.allproducts.filter(p=>p.category === this.category):
          this.allproducts;
        });

      });
     }
   
   ngOnInit(): void {
    this.getAllProducts();
     this.getAllCategories();
     this.ProductService.search.subscribe((val:any)=>{
      this.searchKey =val;
    })
   }
   search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    // console.log(this.searchTerm);
    this.ProductService.search.next(this.searchTerm);
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
        }

        });
     }



     /***********basket*********/


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

   outOfStock(){
    this._ToastrService.error(
      'Sorry, this product is out of stock!',
      undefined,
      {
        positionClass: 'toast-bottom-right',
      }
    );
   }

}



