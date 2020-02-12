import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../_models/user';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  @Input() user: User[];
  @Output() onShared = new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void {
  }

  public toto(){
    this.onShared.emit();
  }

}
