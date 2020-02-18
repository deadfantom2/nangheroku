import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../_models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  @Input() user: User[];
  @Output() sortByName = new EventEmitter<any>();
  @Output() deleteById = new EventEmitter<User[]>();

  constructor() { }

  ngOnInit(): void {
  }

  public sortName(): void {
    this.sortByName.emit();
  }
  public deleteUser(): void {
    this.deleteById.emit();
  }

}
