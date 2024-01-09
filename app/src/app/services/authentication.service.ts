import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user.model';
import {AuthenticationRequest} from '../models/authentication-request.model';
import {AuthenticationApiService} from './api/authentication-api.service';
import {StorageService} from './storage.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userLogged: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  userLogged$: Observable<User | null> = this.userLogged.asObservable();

  constructor(private apiService: AuthenticationApiService,
              private storageService: StorageService,
              private router: Router) {
  }

  setUserOnInit() {
    const jwt = this.getToken() as string;
    if (jwt && jwt.length > 0) {
      this.getUserByJwt(jwt);
    }
  }

  authenticateUser(authenticationRequest: AuthenticationRequest) {
    this.apiService.authenticate(authenticationRequest).subscribe({
      next: (jwtResponse) => {
        this.saveToken(jwtResponse.jwt);
        this.getUserByJwt(jwtResponse.jwt);
      }
    });
  }

  private getUserByJwt(jwt: string) {
    this.apiService.getUserByJwt().subscribe({
      next: (user) => {
        this.userLogged.next(user.user);
        this.saveAuthorities(user.authorities);
        this.router.navigate(['']);
      }
    });
  }

  private updateUser(user: User | null) {
    this.userLogged.next(user);
  }

  logout() {
    this.apiService.invalidate().subscribe({
      next: () => {
        this.deleteToken();
        this.deleteAuthorities();
        this.updateUser(null);
        this.router.navigate(['']);
      }
    });
  }

  logoutOnError() {
    this.deleteToken();
    this.deleteAuthorities();
    this.updateUser(null);
  }

  private saveToken(jwt: string) {
    this.storageService.save('jwt', jwt);
  }

  private getToken() {
    return this.storageService.get('jwt');
  }

  private deleteToken() {
    this.storageService.delete('jwt');
  }

  private saveAuthorities(authorities: string[]) {
    this.storageService.save('authorities', authorities);
  }

  private deleteAuthorities() {
    this.storageService.delete('authorities');
  }
}
