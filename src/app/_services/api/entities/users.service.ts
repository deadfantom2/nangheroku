import { Injectable } from '@angular/core';
import { EntitiesService } from './entities.service';
import { ApiService } from '../../api.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends EntitiesService {

  protected type = 'api/users';

  constructor(apiService: ApiService) {
    super(apiService);
  }

  /** Get All Users of User */
  public getUsers(): Observable<User[]> {
    return this.apiService.get(this.type) as Observable<User[]>;
  }

  /** Create a User */
  public createUser(user: User): Observable<User[]> {
    return this.apiService.post(this.type + '/add', user) as Observable<User[]>;
  }
}