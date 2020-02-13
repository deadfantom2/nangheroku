import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styles: []
})
export class ComponentsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // init_plugins();
  }

}
