import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users = [];
  constructor(
    private commonService: CommonService,
    private httpService: HttpService
  ) {}

  getAuthStatus() {
    return new Observable<boolean>((obs) => {
      const authTokenEncrypted = this.commonService.getCookie('authToken') + '';
      let authToken = '';
      if (authTokenEncrypted) {
        authToken = atob(authTokenEncrypted);
      }
      this.httpService.getUsers().subscribe(
        (usersData) => {
          this.users = usersData;
          let validUser = false;
          this.users.forEach((user: any) => {
            if (user.email == authToken) {
              validUser = true;
            }
          });
          if (validUser) {
            obs.next(true);
          } else {
            obs.next(false);
          }
        },
        (error) => {
          obs.next(false);
        }
      );
    });
  }
}
