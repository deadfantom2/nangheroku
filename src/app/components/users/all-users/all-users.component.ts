import { Component, OnInit } from "@angular/core";
import { Observable, pipe } from "rxjs";
import { User } from "../../../_models/user";
import { UsersService } from "../../../_services";
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: "app-all-users",
  templateUrl: "./all-users.component.html",
  styleUrls: ["./all-users.component.scss"]
})
export class AllUsersComponent implements OnInit {

  public allUsersNormal: User[];
  public allUsersAsync$: Observable<User[]>;

  constructor(
    private _usersService: UsersService
  ) { }

  ngOnInit() {
    this.allUsersAsync$ = this.getAllUsersAsync();
    console.log(this.allUsersAsync$)
    this.getAllUsersNormal()
  }

  private getAllUsersAsync(): Observable<User[]> {
    return this._usersService.getAll(); // 1 method use by link protected entities services
    // return this._usersService.getUsers(); // 2 method
  }

  private getAllUsersNormal() {
    this._usersService.getAll().subscribe(data => {
      return this.allUsersNormal = data
    })
  }

  public deletesUser(user: User) {
    // return this._usersService.deleteUser(user).subscribe(() => {
    this.allUsersNormal.filter(allUsers => {
      console.log(user._id)
      console.log(this.allUsersNormal.length)
      // console.log(allUsers._id, ' : ', user._id, ' = ', allUsers._id !== user._id)
      allUsers._id !== +'5e413f6a80f8b20d06466a72'
    })
    console.log(this.allUsersNormal)
    return this.allUsersNormal;
    // })
  }

  public sortAge(event) {
    console.log(event)
    this.allUsersNormal.sort((u1, u2) => {
      return u1.age - u2.age
    })
  }

  public emitToto() {
    this.allUsersNormal.sort((u1, u2) => {
      return u1.name.localeCompare(u2.name)
    })
    // return this.allUsersNormal;

    // console.log('allUsersAsync$: ', this.allUsersAsync$.pipe(map(data => console.log("data: ", data))))
  }


}
