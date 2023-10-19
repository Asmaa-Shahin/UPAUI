import { Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoggedUser, User } from '../../models/userVM';
import jwtDecode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

userData:any=new BehaviorSubject(null);
    loggingUserObj: User;
    httpHeader = new HttpHeaders({
        'Accept': '*/*'
    });

    private currentUserSubject: BehaviorSubject<LoggedUser>;
    private currentUserCookieLogged: BehaviorSubject<LoggedUser>;
    public currentUser: Observable<LoggedUser>;
    public loggedUserCookie: Observable<LoggedUser>;
    lstRoleNames: string[] = [];
    cookieValue: string = "";
    public userName: string;
    constructor(private http: HttpClient, private router: Router) {
if(localStorage.getItem('userToken')!=null){

this.saveUserData();
}

        this.currentUserSubject = new BehaviorSubject<LoggedUser>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();


        if (this.currentUserCookieLogged != null || this.currentUserCookieLogged != undefined) {
            // this.currentUserCookieLogged = new BehaviorSubject<LoggedUser>(JSON.parse(this.cookieService.get('usercookie')));
            this.loggedUserCookie = this.currentUserCookieLogged.asObservable();
        }

    }
saveUserData(){

    let token=JSON.stringify(localStorage.getItem("userToken"));
    let decode=jwtDecode(token);
    this.userData.next(decode);
}
    public get currentUserValue(): LoggedUser {
        return this.currentUserSubject.value;
    }
    public get currentUserCookieValue(): LoggedUser {
        return this.currentUserSubject.value;
    }

    login(userObj: User): Observable<LoggedUser>{


    return this.http.post<LoggedUser>(`${environment.Login}`,userObj).pipe(map(user => {
                    localStorage.setItem('lang', "ar");
                    localStorage.setItem('dir', "rtl");
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    if (userObj.isRemembered) {
                        this.currentUserValue.isRemembered = true;
                        localStorage.setItem('rememberCurrentUser', 'true');
                        //   this.cookieService.set('usercookie', JSON.stringify(user));
                    } else {
                        this.currentUserValue.isRemembered = false;
                        localStorage.setItem('rememberCurrentUser', 'false');
                        localStorage.setItem('currentUser', JSON.stringify(user));
                    }
                    return user;
                }));;
}

    // login(userObj: User): Observable<LoggedUser> {
    //     return this.http.post<LoggedUser>(`${environment.Login}`, userObj, { headers: this.httpHeader })
    //         .pipe(map(user => {
    //             localStorage.setItem('lang', "ar");
    //             localStorage.setItem('dir', "rtl");
    //             localStorage.setItem('currentUser', JSON.stringify(user));
    //             this.currentUserSubject.next(user);
    //             if (userObj.isRemembered) {
    //                 this.currentUserValue.isRemembered = true;
    //                 localStorage.setItem('rememberCurrentUser', 'true');
    //                 //   this.cookieService.set('usercookie', JSON.stringify(user));
    //             } else {
    //                 this.currentUserValue.isRemembered = false;
    //                 localStorage.setItem('rememberCurrentUser', 'false');
    //                 localStorage.setItem('currentUser', JSON.stringify(user));
    //             }
    //             return user;
    //         }));
    // }


    isLogged() {
        // const cookieExists: boolean = this.cookieService.check('usercookie');
        // if (cookieExists) {
        //     this.currentUser = JSON.parse(this.cookieService.get('usercookie'));
        //     this.currentUser["roleNames"].forEach(element => {
        //         this.lstRoleNames.push(element["name"]);
        //     });
        //     return !!this.cookieService.get('usercookie');
        // }

        // const user = localStorage.getItem("currentUser");
        // if (user) {
        //     this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        //     this.currentUser["roleNames"].forEach(element => {
        //         this.lstRoleNames.push(element["name"]);
        //     });

        //     return !!localStorage.getItem("currentUser");
        // }
    }

    logout() {
        localStorage.removeItem('currentUser');
        localStorage.setItem('rememberCurrentUser', 'false');
        localStorage.clear();
        this.userName = "";
        this.currentUserSubject.next(null);
        // this.cookieService.delete('usercookie');
        // this.cookieService.deleteAll();
        localStorage.setItem('lang', "en");
        localStorage.setItem('dir', "ltr");
        this.router.navigate(['/']);

    }

}