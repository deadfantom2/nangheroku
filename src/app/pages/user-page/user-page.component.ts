import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../_models/user';
import { RoutesService, UsersService } from 'src/app/_services';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  @Input() user: User[];
  @Output() sortByName = new EventEmitter<User[]>();
  @Output() deleteById = new EventEmitter<User[]>();

  constructor(private router: RoutesService) { }

  ngOnInit(): void {
  }

  public sortName(): void {
    this.sortByName.emit();
  }
  public editUser(): void {
    this.router.navigateToRoute('/user');
  }
  public deleteUser(): void {
    this.deleteById.emit();
  }

}
