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
  @Output() onShared = new EventEmitter<any>();
  @Output() onDeleteUser = new EventEmitter<any>();
  @Output() onSortAge = new EventEmitter<any>();
  @Output() sorted = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  public sortUsers(): void {
    this.onShared.emit();
  }

  public sortAge(): void {
    this.onSortAge.emit();
  }

  public deleteUser(): void {
    this.onDeleteUser.emit();
  }


  public sortedAsync(): void {
    this.sorted.emit();
  }
}
