
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/iuser';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

 
user:IUser;
  constructor(private account:AccountService) { }
  //role:string;
  ngOnInit(): void {
   
    // this.account.currentUser$.subscribe((user:IUser)=>{
    //   this.user = this.account.user;
    //   console.log(this.user)
    // })

    this.user = this.account.user;
  }


}
