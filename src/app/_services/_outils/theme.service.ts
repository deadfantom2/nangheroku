import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private themeMap = {
    dark: "light",
    light: "solar",
    solar: "dark"
  };
  public theme: string;


  constructor() { 
    this.theme = localStorage.getItem('theme');
    if(this.theme) {
        document.body.classList.add(this.theme);
    }else {
        localStorage.setItem('theme', Object.keys(this.themeMap)[0])
        document.body.classList.add(Object.keys(this.themeMap)[0]);
    } 
  }

  public toggleTheme(): void {
    const current = localStorage.getItem('theme');
    const next = this.themeMap[current];
    document.body.classList.replace(current, next);
    localStorage.setItem('theme', next);
  }

}
