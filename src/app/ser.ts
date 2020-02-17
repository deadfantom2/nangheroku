import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

import { ToastrService } from "ngx-toastr";

import { PermissionsModel } from "../../model/sso/permissions.model";
import { ResModel } from "../../model/main/res.model";

@Injectable({
  providedIn: "root"
})
export class PermissionsService {
  perm: Observable<PermissionsModel>;
  private obPerm: BehaviorSubject<PermissionsModel>;

  allPerms: Observable<PermissionsModel[]>;
  private obAllPerms: BehaviorSubject<PermissionsModel[]>;

  private listPerms: PermissionsModel[] = [];
  private tempPerms: PermissionsModel[] = [];

  constructor(private http: HttpClient, private toast: ToastrService) {
    this.obPerm = new BehaviorSubject(null) as BehaviorSubject<
      PermissionsModel
    >;
    this.perm = this.obPerm.asObservable();

    this.obAllPerms = new BehaviorSubject(null) as BehaviorSubject<
      PermissionsModel[]
    >;
    this.allPerms = this.obAllPerms.asObservable();
  }

  getPermissions() {
    const currCompany = +localStorage.cid;

    if (currCompany) {
      this.http
        .get<PermissionsModel[]>(`/api/v2/sso/permissions/${currCompany}`)
        .subscribe(
          res => {
            this.listPerms = res;
            this.tempPerms = [...res];
            this.obAllPerms.next(this.listPerms);
          },
          error => {
            console.log(error);
          }
        );
    } else {
      this.toast.error("No Selected Company", "Error");
    }
  }

  doAddPermission(perm: any) {
    const currCompany = +localStorage.cid;

    this.http
      .post<PermissionsModel>(`/api/v2/sso/permissions`, {
        cid: currCompany,
        item: perm
      })
      .subscribe(
        res => {
          this.listPerms.push(res);
          this.tempPerms = [...this.listPerms];
          this.obAllPerms.next(this.listPerms);

          this.toast.success("Permission added successfully", "Added");
        },
        error => {
          console.log(error);
        }
      );
  }

  doEditPermission(permId: number, perm: any) {
    this.http
      .put<PermissionsModel>(`/api/v2/sso/permissions`, {
        pid: permId,
        item: perm
      })
      .subscribe(
        res => {
          const idx = this.listPerms.findIndex(p => p.id === res.id);
          this.listPerms[idx] = res;
          this.tempPerms = [...this.listPerms];
          this.obAllPerms.next(this.listPerms);

          this.toast.success("Permission updated successfully", "Update");
        },
        error => {
          console.log(error);
        }
      );
  }

  doDeletePermission(permId: number) {
    this.http.delete<ResModel>(`/api/v2/sso/permissions/${permId}`).subscribe(
      res => {
        const idx = this.listPerms.findIndex(p => p.id === permId);
        this.listPerms.splice(idx, 1);
        this.tempPerms = [...this.listPerms];
        this.obAllPerms.next(this.listPerms);

        this.toast.success(res.msg, res.title);
      },
      error => {
        console.log(error);
      }
    );
  }

  doPermissionSearch(val: string) {
    this.listPerms = this.tempPerms.filter(r => {
      return r.sp_name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.obAllPerms.next(this.listPerms);
  }
}
