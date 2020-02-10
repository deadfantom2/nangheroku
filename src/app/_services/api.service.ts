import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  ////////////////////////////////
  // PUBLIC METHODS
  ////////////////////////////////

  /** Make a GET request */
  public get(url: string): Observable<any> {
    return this.http.get(environment.apiUrl + `/${url}`);
  }

  /** Make a POST request */
  public post(url: string, payload: any = null): Observable<any> {
    return this.http.post(environment.apiUrl + `/${url}`, payload);
  }


}
