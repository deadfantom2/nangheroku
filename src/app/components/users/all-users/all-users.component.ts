import { Component, OnInit } from "@angular/core";
import { Observable, pipe } from "rxjs";
import { User } from "../../../_models/user";
import { UsersService } from "../../../_services";
import { map, catchError, tap } from 'rxjs/operators';

@Component({
  selector: "app-all-users",
  templateUrl: "./all-users.component.html",
  styleUrls: ["./all-users.component.scss"]
})
export class AllUsersComponent implements OnInit {

  public allUsersNormal: User[];
  public allUsersAsync$: Observable<User[]>;


  public filteredUserAsync$: Observable<User[]>;

  constructor(
    private _usersService: UsersService
  ) { }

  ngOnInit() {
    this.getAllUsersNormal()
    this.allUsersAsync$ = this.getAllUsersAsync();
  }

  /** GET ALL DATA */
  private getAllUsersNormal() {
    this._usersService.getAll().subscribe(data => {
      return this.allUsersNormal = data
    })
  }

  private getAllUsersAsync(): Observable<User[]> {
    return this._usersService.getAll(); // 1 method use by link protected entities services
    // return this._usersService.getUsers(); // 2 method
  }


  /** HTTP METHODS */
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


  /** SORTING */
  public sortAge() {
    console.log(event)
    this.allUsersNormal.sort((u1, u2) => {
      return u1.age - u2.age
    })
  }
  public sortName() {
    this.allUsersNormal.sort((u1, u2) => {
      return u1.name.localeCompare(u2.name)
    })
  }


  private sorted(): Observable<User[]> {
    return this.allUsersAsync$.pipe()

  }


}
