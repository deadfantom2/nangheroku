import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(private router: Router) {}

  public navigateToRoute(pathRoute: string) {
    return this.router.navigateByUrl(pathRoute);
  }
  
}
