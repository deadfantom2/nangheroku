import { Injectable } from "@angular/core";
import { EntitiesService } from "./entities.service";
import { ApiService } from "../../api.service";
import { Observable, BehaviorSubject } from "rxjs";
import { User, File } from "../../../_models";
import { ToastService } from "../../_outils";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsersService extends EntitiesService {
  protected type = "api/users";

  private objectAllUsers: BehaviorSubject<User[]>;
  private objectOneUser: BehaviorSubject<User[]>;
  public allUsers: Observable<User[]>;
  public oneUser: Observable<User[]>;

  private listUsers: User[] = [];
  private listUser: User[] = [];
  public tempUsers: User[] = [];

  // private formData: FormData = new FormData();

  constructor(_apiService: ApiService, private _toast: ToastService,private http: HttpClient) {
    super(_apiService);

    this.objectAllUsers = new BehaviorSubject(null) as BehaviorSubject<User[]>;
    this.objectOneUser = new BehaviorSubject(null) as BehaviorSubject<User[]>;
    this.allUsers = this.objectAllUsers.asObservable();
    this.oneUser = this.objectOneUser.asObservable();
  }

  /** Get: All Users of Users */
  public getAllUsers(): void {
    this._apiService.get(this.type).subscribe(
      res => {
        console.log(res);
        this.listUsers = res.users;
        this.tempUsers = [...res.users];
        this.objectAllUsers.next(this.listUsers);
      },
      error => {
        console.log(error);
      }
    );
  }

  /** Get: All Users of Users */
  public getUserById(id: string): void {
    console.log(id);
    this._apiService.get(this.type + "/" + id).subscribe(
      res => {
        this.listUser = res.user;
        console.log(res.user.name);
        this.objectOneUser.next(this.listUser);
      },
      error => {
        console.log(error);
      }
    );
  }

  /** Post: Add a User */
  public addUser(user: User): void {
    this._apiService.post(this.type + "/add", user).subscribe(
      res => {
        this.listUsers.unshift(res.user);
        this.tempUsers = [...this.listUsers];
        this.objectAllUsers.next(this.listUsers);
        this._toast.showSuccess(
          "Successfully created an User!",
          "Create an user"
        );
      },
      error => {
        console.log(error);
      }
    );
  }

  /** Patch: change access activation of user */
  public changeRoleUser(user: User, roleUser: string): void {
    this._apiService
      .patch(this.type + "/roles/" + user._id, { roles: roleUser })
      .subscribe(
        res => {
          this._toast.showSuccess(
            "Successfully changed role for user " + user.email,
            "Role User"
          );
        },
        error => {
          console.log(error);
        }
      );
  }

  /** Patch: change access activation of user */
  public changeActivationUser(user: User): void {
    this._apiService
      .patch(this.type + "/activations/" + user._id, user)
      .subscribe(
        res => {
          const userSelected = this.listUsers.find(
            userOfList => userOfList._id === res.user._id
          );
          userSelected.isVerified = res.user.isVerified;
          this._toast.showSuccess(
            "Successfully changed access for user " + userSelected.email,
            "Access User"
          );
        },
        error => {
          console.log(error);
        }
      );
  }

  /** Delete: a User */
  public deleteUser(user: User): void {
    this._apiService.delete(this.type + "/" + user._id).subscribe(
      item => {
        const user = this.listUsers.findIndex(
          items => items._id === item.user["_id"]
        );
        this.listUsers.splice(user, 1);
        this.tempUsers = [...this.listUsers];
        this.objectAllUsers.next(this.listUsers);
        this._toast.showSuccess(
          "Successfully deleted an User!",
          "Delete an user"
        );
      },
      error => {
        console.log(error);
      }
    );
  }

  /** Create or Update: a User image */
  public addProfilePicture(file: any, route: string, user: User): void {
    const formData = new FormData();
    formData.append("fileInput", file);
    console.log(file);
    console.log(user);
    this._apiService
      .put("upload/" + route, formData, {
        name: file.name,
        route: route
      })
      .subscribe(
        res => {
          console.log("res: ", res);
          console.log("user: ", user);
          if (route === "profile") {
            // this.listUser.img[0].name = res.fileName
            console.log("profile: ", this.listUser);
            // console.log("userSelected: ", userSelected)
            // console.log("userSelected: ", userSelected.isVerified)
            // console.log("userSelected: ", userSelected.img)
            // console.log("userSelected: ", userSelected.img[0])
            // userSelected.img[0].name = res.fileName;
          } else {
            console.log("else");
          }
          this._toast.showSuccess(res.message, "File added");
        },
        error => {
          console.log(error);
        }
      );
  }




  /** ALL FIELS UPLAOAD TEST */
  public files: File[] = []; 
  obFileService: any;

  doFileUpload(formData: FormData, file: File) {
    return this.http.put("http://localhost:3000/upload/photos",  {
      name: file.name,
      route: file.route
    }); 
  }

  uploadFiles(uploadRef: any){
    uploadRef.nativeElement.value = '';
    console.log("uploadRef: ", uploadRef)
    console.log("this.files: ", this.files)
    this.files.forEach(file => {
      this.uploadFile(file);
    }); 
  }

  uploadFile(file) {
    console.log(file)
    const formData = new FormData();
    formData.append('fileInput', file);
    console.log(formData.append('fileInput', file))
    this.doFileUpload(formData,file).pipe().subscribe(res => console.log(res))

  }







}






