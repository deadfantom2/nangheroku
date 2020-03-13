import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { User } from "../../../_models";
import { UsersService } from "src/app/_services";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";

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
  ) { }
  formTemplate: FormGroup
  ngOnInit() {
    this.getUser();
    // this.form = this.formBuilder.group({
    //   file: [""],
    //   types: [""]
    // });
    this.formTemplate = new FormGroup({
      file: new FormControl('', Validators.required),
      types: new FormControl('', Validators.required),
    })
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



  // files: any;
  // @ViewChild('fileInput', { static: false }) uploadFileRef: ElementRef;
  // uploadClick(){
  //   console.log('1')
  //   this.files = this._usersService.files = [];
  //   const fileUpload = this.uploadFileRef.nativeElement;
  //   console.log(fileUpload)
  //   console.log(fileUpload.onchange)
  //   fileUpload.onchange = () => {
  //     console.log('2')
  //     for ( let i = 0; i < fileUpload.files.length; i++ ) { 
  //       const file = fileUpload.files[i];
  //       console.log(file)

  //       this._usersService.files.push({
  //         name: file.name,
  //         route: this.form.get("types").value
  //       }); 
  //     }   
  //     console.log(this.uploadFileRef)
  //     this._usersService.uploadFiles(this.uploadFileRef);
  //     // this.uService.uploadFiles(this.uploadFileRef, this.tService);
  //   }; 
  // }



  isSubmited: boolean = false;
  fileName: File;
  files: File[] = []
  routes: string;
  showPreview(event) {
    // if(event.target.files.length > 1){
    this.files = event.target.files;
    // }
    // this.fileName = event.target.files.item(0)
  }
  onSubmitTOTO(formValue, user) {
    this.fileName = this.fileName;
    // this.fileName = formValue.file.split(`\\`)[formValue.file.split(`\\`).length-1];
    this.routes = formValue.types;
    console.log(this.files)
    console.log(this.files.length)
    console.log(formValue)

    if (this.files.length === 1) {
      console.log(this.files)
      this._usersService.addProfilePicture(
        this.files[0],
        this.routes,
        user
      );
    }
    if (this.files.length > 1) {
      for (let i = 0; i < this.files.length; i++) {
        this._usersService.addProfilePicture(
          this.files[i],
          this.routes,
          user
        );
      }
      console.log('sdjkfhkjsdfhkjsdfhkzjfghjke')
    }
    // this._usersService.addProfilePicture(
    //   this.fileName,
    //   this.routes,
    //   user
    // );
  }

}
