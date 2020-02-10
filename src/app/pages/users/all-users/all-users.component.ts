import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/_services/api/entities/users.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/user';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {

  public allUsers$: Observable<User[]>;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.allUsers$ = this.getAllUsers();
  }

  private getAllUsers(): Observable<User[]> {
    // return this.usersService.getAll(); // 1 method use by link protected entities services
    return this.usersService.getUsers(); // 2 method
  }

}
