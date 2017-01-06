import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AngularFire, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class AuthService {

  isLoggedIn: boolean = false;

  constructor(public http: Http, private af: AngularFire) {
    this.getAuth().subscribe((authState: FirebaseAuthState) => {
      this.isLoggedIn = (authState) ? true : false;
    });
  }

  login(user: {}): Promise<boolean> {
      return (<Promise<boolean>>this.af.auth.login(user)
        .then((authState: FirebaseAuthState) => {
          console.log('OLHA AQUI: ', authState);
          return this.isLoggedIn = (authState) ? true : false;
        }).catch(this.handleError));       
  }

  logout(): void {
    this.af.auth.logout();
  }

  getAuth(): Observable<FirebaseAuthState> {
    return this.af.auth;
  }

  private handleError(err: any): Promise<any> {
      console.log('Error:', err); // somente para exemplo
      return Promise.reject(err.message || err);
  }


}
