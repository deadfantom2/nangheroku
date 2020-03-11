import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/_services';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private _themeService: ThemeService) { }

  ngOnInit(): void {
    this._themeService.theme;  
  }

    // Change the theme on site
    public changeTheme(): void {
      this._themeService.toggleTheme();
    }

}
