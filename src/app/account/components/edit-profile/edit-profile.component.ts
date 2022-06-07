import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { map, Observable } from 'rxjs';
import { Iroles } from 'src/app/models/iroles';
import { IUser } from 'src/app/models/iuser';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  editForm:FormGroup;
  currentUser$: Observable<any>;
 // Roles: any[] = [];
 // selected:any
 olduser :IUser;
newuser={} as IUser
  // newuser:{
  // email:string,
  // displayName: string,
  // token: string,
  // role:string,
  // gender: string,
  // image: string,
  // };

  constructor(private fb:FormBuilder,private account:AccountService,private router:Router,private http:HttpClient) { 
  }


  ngOnInit(): void {
    this.currentUser$=this.account.currentUser$;
    this.olduser= this.account.user
    this.editForm = this.fb.group(
      {
        displayname: [this.olduser.displayName, [Validators.required,Validators.pattern(/^[a-zA-Z]{3,}$/)]],//new FormControl(''),
       
        email: [this.olduser.email, [Validators.required, Validators.email]],
        //password: [this.olduser.password, [Validators.required, Validators.minLength(5)]],
        gender:[this.olduser.gender,[Validators.required]],
        image:[null],
      }
    ); 
      }
  



   edit(){
console.log(this.editForm.value)
     this.newuser.displayName = this.editForm.value.displayname;
     this.newuser.email = this.editForm.value.email;
     this.newuser.gender = this.editForm.value.gender;
     //this.newuser.password = this.editForm.value.password;
     var arr=this.editForm.value.image.split("\\");
     this.editForm.value.image=arr[arr.length-1]
     this.newuser.image=this.editForm.value.image;
     this.newuser.token=this.olduser.token;
     this.newuser.role=this.olduser.role
     console.log(this.newuser)
   this.account.editProfile(this.olduser.email,this.newuser).subscribe((user)=>{
     console.log(this.editForm.value)
     console.log(user);
     this.router.navigateByUrl("profile");
   })
   }

 


  imgePreview(){
    var arr=this.editForm.value.image.split("\\");
    this.editForm.value.image="assets/images/team/about-2/"+arr[arr.length-1]
  }
}
