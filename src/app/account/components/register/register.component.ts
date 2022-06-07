import { HttpClient } from '@angular/common/http';
import { ArrayType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Iroles } from 'src/app/models/iroles';
import { IUser } from 'src/app/models/iuser';
import { environment } from 'src/environments/environment';

import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registerForm: FormGroup;
  Roles: any[] = [];
  selected:any
  constructor(private fb: FormBuilder, private account: AccountService, private router: Router, private http: HttpClient) {
    this.registerForm = fb.group(
      {
        displayname: ['', [Validators.required,Validators.pattern(/^[a-zA-Z]{3,}$/)]],//new FormControl(''),
       
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        gender:['',[Validators.required]],
        image:[null],
       
      }
    );



  }

  ngOnInit(): void {
    //this.account.getRoles();
    // this.account.getRoles().subscribe((res)=>{
    //   map((role: Iroles) => {       
    //     role.selected = false;
    //   })
    //   this.Roles = res;
    // });
    // this.selected=1;
  }

  // let t = JSON.stringify(res);
      // let x = JSON.parse(t);
      //console.log(Array.isArray(x));
      //console.log("Roles:" + res);
  user={}as IUser;

  submit() {
    this.user.displayName = this.registerForm.value.displayname;
    this.user.email = this.registerForm.value.email;
    this.user.password = this.registerForm.value.password;
    this.user.gender=this.registerForm.value.gender;
    var arr=this.registerForm.value.image.split("\\");
    this.registerForm.value.image=arr[arr.length-1]
    this.user.image=this.registerForm.value.image;
   
    this.account.register(this.user).subscribe((res) => {
      console.log("Server response"+res);
      this.router.navigateByUrl('login');
    }
    );


  }


  registerInanotherAPI() {
    return this.http.post<any>("http://localhost:3000/Users", this.user).pipe(
      map((user) => {
        console.log(user);
        console.log(user.id);
        this.account.ID = user.id;
        console.log(this.account.ID);
      })
    );
  }


  // updateSelectedRole(index: number) {
  //   this.Roles[index].selected = !this.Roles[index].selected;

  // }
  imgePreview(){
    var arr=this.registerForm.value.image.split("\\");
    this.registerForm.value.image="assets/images/team/about-2/"+arr[arr.length-1]
  }
  
}
