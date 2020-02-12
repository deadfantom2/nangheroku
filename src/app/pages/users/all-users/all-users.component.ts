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
    this.getAllUsersNormal()
  }

  private getAllUsersAsync(): Observable<User[]> {
    return this._usersService.getAll(); // 1 method use by link protected entities services
    // return this._usersService.getUsers(); // 2 method
  }

  private getAllUsersNormal() {
    this._usersService.getAll().subscribe(data =>{
      return  this.allUsersNormal = data
    })
  }



  public emitToto() {
     this.allUsersNormal.sort((u1, u2) => {
      console.log(u1.name +  ' / ' + u2.name)
      return u1.name.localeCompare(u2.name)
     })
     return this.allUsersNormal;

    // console.log('allUsersAsync$: ', this.allUsersAsync$.pipe(map(data => console.log("data: ", data))))
  }


}
