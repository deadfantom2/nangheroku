import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'auth-pages',
  templateUrl: './auth.component.html',
  styles: []
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // init_plugins();
  }

}
