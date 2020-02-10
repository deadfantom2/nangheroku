import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UsersService } from 'src/app/_services/api/entities/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public user: User = new User();

  constructor(private usersService: UsersService) { }

  ngOnInit() {
  }

  public createOneUser(user: User): void {
    this.usersService.createUser(user).subscribe();
  }

}
