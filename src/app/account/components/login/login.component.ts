import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/iuser';
import { environment } from 'src/environments/environment';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 

 
  loginForm:FormGroup;
  constructor(private fb:FormBuilder,private account:AccountService
    ,private router:Router,private ref:ChangeDetectorRef) {

    this.loginForm = fb.group({
         email:['',Validators.email],
         password:['',[Validators.required, Validators.minLength(5)]]
    })
   }

  ngOnInit(): void {
    // this.account.observable().subscribe(user=>{
    //   this.user=user
    //   this.ref.detectChanges();
    // })
  }

  Login(){
    this.account.login(this.loginForm.value).subscribe((use)=>{
      this.router.navigateByUrl('home');   
  })  
  }


  loginGoogle(){
    //this.account.Login_With_Google();
  }

}
