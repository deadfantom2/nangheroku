import { Injectable } from '@angular/core';
import { ApiService } from '../../api.service';
import { Observable } from 'rxjs';

@Injectable()
export class EntitiesService {

  protected type: string;

  constructor(public _apiService: ApiService) { }

  /** Get all the entities */
  public getAll(): Observable<any> {
    return this._apiService.get(this.type);
  }

  /** Post someone data */
  public postSomeone(): Observable<any> {
    return this._apiService.post(this.type);
  }
}
