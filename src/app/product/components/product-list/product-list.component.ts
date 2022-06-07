import { IProduct } from 'src/app/models/iproduct';
import { ProductServiceService } from '../../service/product-service.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
 allproducts:IProduct[]=[];
 displayedColumns: string[] = [ 'title', 'category', 'price','offer','Quantity','action'];
 dataSource!: MatTableDataSource<any>;

 @ViewChild(MatPaginator) paginator!: MatPaginator;
 @ViewChild(MatSort) sort!: MatSort;
 //ctor for injection only
  constructor(private serv:ProductServiceService,private toastr:ToastrService,
    private dialog:MatDialog,
    
    ) { }

  //on page loading
  ngOnInit(): void {
    this.getAllProducts();
  }



  openDialog() {
    this.dialog.open(AddProductComponent, {
      width:'50%'

    }).afterClosed().subscribe(val=>{
      if(val ='save'){
        this.getAllProducts();
      }
    });
  }
  getAllProducts()
  {
    this.serv.getAllProducts().subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator =this.paginator;
        this.dataSource.sort =this.sort;
      },
      error:()=>{
        alert("Error while getting Products");
      }
    });
  }
  editProduct(row:any){
    this.dialog.open(AddProductComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val ='update'){
        this.getAllProducts();
      }
    })
  }
  deleteProduct(id:number){
  this.serv.deleteProduct(id)
  .subscribe({
  next:(res)=>{
    this.toastr.success(
      'Product deleted succesfully',
      undefined,
      {
        positionClass: 'toast-bottom-right',
      }
    );
    //alert("Product deleted Successfully")
    this.getAllProducts();
  },
  error:()=>{
    this.toastr.error(
      'Error while deleting Product !',
      undefined,
      {
        positionClass: 'toast-bottom-right',
      }
    );
    //alert("Error while deleting Product !!")
  }
  })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
