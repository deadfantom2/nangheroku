import { Injectable } from '@angular/core';
import { EntitiesService } from './entities.service';
import { ApiService } from '../../api.service';
import { Observable, EMPTY } from 'rxjs';
import { User } from 'src/app/_models/user';
import { retry, shareReplay, catchError } from 'rxjs/operators';

@Injectable()
export class UsersService extends EntitiesService {

  protected type = 'api/users';

  constructor(_apiService: ApiService) {
    super(_apiService);
  }

  /** Get All Users of User */
  public getUsers(): Observable<User[]> {
    return this._apiService.get(this.type) as Observable<User[]>;
  }

  /** Add a User */
  public addUser(user: User): Observable<User[]> {
    return this._apiService.post(this.type + '/add', user) as Observable<User[]>;
  }
}