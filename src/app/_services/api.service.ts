import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User, File } from "../_models";

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  ////////////////////////////////
  // PUBLIC METHODS
  ////////////////////////////////

  /** Make a GET request */
  public get(url: string): Observable<any> {
    return this.http.get<User[]>(environment.apiUrl + `/${url}`);
  }

  /** Make a POST request */
  public post(url: string, payload: any = null): Observable<any> {
    return this.http.post<User[]>(environment.apiUrl + `/${url}`, payload);
  }

  /** Make a PUT request */
  public put(
    url: string,
    formData?: any,
    payload: any = null
  ): Observable<any> {
    return this.http.put<File[]>(
      environment.apiUrl + `/${url}`,
      formData,
      payload
    );
  }

  /** Make a PATCH request */
  public patch(url: string, payload: any = null): Observable<any> {
    return this.http.patch<User[]>(environment.apiUrl + `/${url}`, payload);
  }

  /** Make a DELETE request */
  public delete(url: string): Observable<any> {
    return this.http.delete<User[]>(environment.apiUrl + `/${url}`);
  }
}
