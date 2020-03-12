import { Component, OnInit } from "@angular/core";
import { User } from "../../../_models";
import { UsersService } from "src/app/_services";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.scss"]
})
export class UserEditComponent implements OnInit {
  // Async Observable data stream
  public user$: Observable<User[]>;
  public form: FormGroup;
  public fileToUpload: File = null;

  constructor(
    private _usersService: UsersService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getUser();
    this.form = this.formBuilder.group({
      file: [""],
      types: [""]
    });
  }

  public getUser() {
    this.user$ = this._usersService.oneUser;
    this._usersService.getUserById(this.route.snapshot.params.id);
  }

  /** FILE */
  public handleFileInput(files: FileList) {
    console.log(files.item(0));
    if (files.length > 0) {
      const file = files.item(0); // files[0]
      this.form.get("file").setValue(file);
    }
  }
  public handleType(event: any): void {
    console.log(event.target.value);
    this.form.get("types").setValue(event.target.value);
  }
  public onSubmit(user: User): void {
    console.log(user);
    console.log(this.form.get("file").value);
    console.log(this.form.get("types").value);
    this._usersService.addProfilePicture(
      this.form.get("file").value,
      this.form.get("types").value,
      user
    );
  }
}
