import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, observable, Observable, of, ReplaySubject } from 'rxjs';
import { filter, map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Iroles } from '../../models/iroles';
import { IUser } from '../../models/iuser';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  url="https://localhost:7282/api/Account";
 
  google:boolean=false;
  user:IUser;
  JsonUser:IUser;
  AllUsers:[]
  ID:number
  userRolrNum:number
  httpOption:any;
  baseURL = environment.apiURL;
  private currentUserSource = new ReplaySubject<any>(1);
  currentUser$ = this.currentUserSource.asObservable();
  header:any

   constructor(private http:HttpClient,private router:Router) {
    //  gapi.load("auth2",()=>{
    //    this.auth2 = gapi.auth2.init({
    //      client_id:'840047985782-e0j64sebggfclhr2v9bvpjm16fo4vu4h.apps.googleusercontent.com',
    //      scope: "email",
        
    //    })
    //  })
   }




  register(registerValues: any):Observable<any>{
       return this.http.post<any>(this.url+"/register",registerValues).pipe(
              map((user:IUser)=>{
                if(user){
                  localStorage.setItem("token",user.token);
                localStorage.setItem("role",user.role);
                console.log(localStorage.getItem("role"));
                  this.currentUserSource.next(user);
                }
              }),
       )
  }

  login(LoginValues:any):Observable<any>{
    return this.http.post<any>(this.url+"/Login",LoginValues).pipe(
      map((user:IUser)=>{
        if(user){
          localStorage.setItem("token",user.token);
        localStorage.setItem("role",user.role);
        console.log(localStorage.getItem("role"));
          this.currentUserSource.next(user);
         this.user=user;
        }
      }),
      retry(3)
      
)
  }



   

  loadCurrentUser(token: string) {
    // if (token == null) {
    //   this.currentUserSource.next(null);
    //   return of(null);
    // }

    let headers = new HttpHeaders();
   headers =headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<IUser>(this.url, {headers}).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          console.log("my user"+user)
          this.currentUserSource.next(user);
          
        }
      })
    );
  }




  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    this.currentUserSource.next(null);
    this.router.navigateByUrl('');
  }

  editProfile(_oldemail:string,values:any){
 return this.http.put<IUser>(this.url+"/user",values,{params:{"email":_oldemail}}).pipe(
   map((user:IUser)=>{
     if(user){
      this.currentUserSource.next(user);
      this.user = user;
     }
   })
 )
//     return this.http.put<any>("http://localhost:3000/Users/"+id,values).pipe(
//       map( (user)=>{
//         if(user){
//         //localStorage.setItem("token",user.user.token);
//         console.log(user.user);
//          this.currentUserSource.next(user.user);
//          this.user=user.user;
//       }
//  }
//     ))
  }




  // Login_With_Google() {
  //   this.auth2.signIn({
  //     scope: 'https://www.googleapis.com/auth/gmail.readonly'
  //   }).then(user => {
  //     //localStorage.setItem("token",user.);
  //     this.currentUserSource.next(user);
  //     this.google = true;
  //     this.router.navigateByUrl("home")
  //   }).catch(() => {
  //     this.currentUserSource.next(null);
  //   })
  // }



  // logout_with_Google() {
  //   this.auth2.signOut().then(() => {
  //     this.currentUserSource.next(null);
  //   })
  // }

  // public observable(): Observable<gapi.auth2.GoogleUser> {
  //   return this.currentUserSource.asObservable();
  // }


}
