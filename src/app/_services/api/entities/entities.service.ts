import { Injectable } from '@angular/core';
import { ApiService } from '../../api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {

  protected type: string;

  constructor(public apiService: ApiService) { }

  /** Get all the entities */
  public getAll(): Observable<any> {
    return this.apiService.get(this.type);
  }

  /** Post someone data */
  public postSomeone(): Observable<any> {
    return this.apiService.post(this.type);
  }
}
