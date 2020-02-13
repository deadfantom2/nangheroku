import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../_models/user';
import { UsersService } from '../../_services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  @Input() user: User[];
  @Output() onShared = new EventEmitter<any>();
  @Output() onDeleteUser = new EventEmitter<any>();
  @Output() onSortAge = new EventEmitter<any>();

  constructor(private _usersService: UsersService) { }

  ngOnInit(): void {
  }

  public deleteUser() {
    this.onDeleteUser.emit();
  }

  public sortUsers() {
    this.onShared.emit();
  }

  public sortAge() {
    this.onSortAge.emit();
  }

}
