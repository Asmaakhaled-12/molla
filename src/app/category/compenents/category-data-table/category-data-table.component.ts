import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ICategory } from 'src/app/models/icategory';
import { CategoryServiceService } from '../../service/category-service.service';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { ToastrService } from 'ngx-toastr';
import { CategoryDetailsComponent } from '../category-details/category-details.component';

@Component({
  selector: 'app-category-data-table',
  templateUrl: './category-data-table.component.html',
  styleUrls: ['./category-data-table.component.css'],
})
export class CategoryDataTableComponent implements OnInit, OnDestroy {
  refreshObservable: BehaviorSubject<boolean>;
  dataSource: any;
  searchInput: string = '';
  subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['id', 'title', 'description', 'Actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  constructor(
    private _CategoryServiceService: CategoryServiceService,
    private _MatDialog: MatDialog,
    private _ToastrService: ToastrService
  ) {
    this.refreshObservable = new BehaviorSubject<boolean>(true);
  }

  ngOnInit(): void {
    var subscribe = this.refreshObservable.subscribe(() => {
      this.getAll();
    });
    this.subscriptions.push(subscribe);
  }

  applyFilter(filterdVallue: any) {
    this.dataSource.filter = filterdVallue.target.value
      .trim()
      .toLocaleLowerCase();
  }

  getAll() {
    var subscribe = this._CategoryServiceService
      .getAll()
      .subscribe((categories) => {
        this.dataSource = new MatTableDataSource<ICategory>(categories);
        this.dataSource.paginator = this.paginator;
      });
    this.subscriptions.push(subscribe);
  }

  addCategory() {
    const _component = this._MatDialog.open(AddCategoryComponent, {
      width: '450px',
    });
    _component.afterClosed().subscribe((result) => {
      //data from child to parent
      if (result) {
        var data = JSON.stringify(result);
        var dataJson = JSON.parse(data);
        this._CategoryServiceService.add(dataJson).subscribe(() => {
          this.refreshObservable.next(true);
          this._ToastrService.success(
            'Category Added Succesfully!',
            undefined,
            {
              positionClass: 'toast-bottom-right',
            }
          );
        });
      }
    });
  }

  delete(id: number) {
    const _component = this._MatDialog.open(CategoryDetailsComponent, {
      width: '400px',
    });
    _component.afterClosed().subscribe((deleted) => {
      //data from child to parent
      if (deleted) {
        var subscribe = this._CategoryServiceService
          .delete(id)
          .subscribe((next) => {
            this.refreshObservable.next(true);
            this._ToastrService.success(
              'Category Deleted Succesfully!',
              undefined,
              {
                positionClass: 'toast-bottom-right',
              }
            );
          });
        this.subscriptions.push(subscribe);
      }
    });
  }

  edit(element: any) {
    const _component = this._MatDialog.open(EditCategoryComponent, {
      width: '450px',
      data: element, //data from parent to child
    });
    _component.afterClosed().subscribe((result) => {
      console.log("resultt",result);
      if(result)
      {
        var data = JSON.stringify(result);
        var dataJson = JSON.parse(data);
        this._CategoryServiceService.edit(+element.id, dataJson).subscribe(() => {
          this._ToastrService.success('Category Edited Succesfully!', undefined, {
            positionClass: 'toast-bottom-right',
          });
        });
      }
      this.refreshObservable.next(true);
    });
  }

  ngOnDestroy(): void {
    for (var i = 0; i < this.subscriptions.length; i++) {
      this.subscriptions[i].unsubscribe();
    }
  }
}
