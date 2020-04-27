import { Component, OnInit } from "@angular/core";
import { User } from "../../../_models";
import { UsersService, UserValidationService } from "src/app/_services";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, AbstractControl } from "@angular/forms";

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.scss"],
})
export class UserEditComponent implements OnInit {
  // Async Observable data stream
  public user$: Observable<User>;
  public formImage: FormGroup;
  public getFile: AbstractControl;
  public getTypes: AbstractControl;

  private files: File[] = [];
  private typeRoute: string; // ["profile", "photos", "files"]

  public options = [
    {
      name: "profile",
    },
    {
      name: "files",
    },
    {
      name: "photos",
    },
  ];

  constructor(
    private _usersService: UsersService,
    private _userValidationService: UserValidationService,
    private _activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getUser();
    this.formImage = this._userValidationService.imageForm;
    this.getFile = this._userValidationService.getFile;
    this.getTypes = this._userValidationService.getTypes;
  }

  public getUser() {
    this.user$ = this._usersService.oneUser;
    this._usersService.getUserById(this._activeRoute.snapshot.params.id);
  }

  /** FILE */
  public showPreview(event: any): void {
    this.files = event.target.files;
    console.log(this.formImage);
  }
  public onSubmit(formValue: any, user: User): void {
    this.typeRoute = formValue.types;
    console.log(user);
    if (
      this.files.length === 1 ||
      (this.files.length > 1 && this.typeRoute === "profile")
    ) {
      this._usersService.addFile(this.files[0], this.typeRoute, user);
    }
    if (this.files.length > 1) {
      for (let i = 0; i < this.files.length; i++) {
        this._usersService.addFile(this.files[i], this.typeRoute, user);
      }
    }
    this.formImage.reset();
  }
}
