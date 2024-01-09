import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationRequest} from '../../models/authentication-request.model';
import {environment} from '../../../environments/environment';
import {User} from '../../models/user.model';

@Injectable({providedIn: 'root'})
export class AuthenticationApiService {

  AUTH_URL = environment.appUrl + environment.apiPrefix + '/auth';

  constructor(private httpClient: HttpClient) {
  }

  authenticate(authenticationRequest: AuthenticationRequest) {
    return this.httpClient.post<JwtResponse>(`${this.AUTH_URL}/authenticate`, authenticationRequest);
  }

  getUserByJwt() {
    return this.httpClient.get<UserLoggedResponse>(`${this.AUTH_URL}/user-logged`);
  }

  invalidate() {
    return this.httpClient.post<void>(`${this.AUTH_URL}/invalidate`, {});
  }
}

export interface JwtResponse {
  daysSinceLastAuthentication: number;
  jwt: string;
}

export interface UserLoggedResponse {
  user: User;
  authorities: [];
}
