import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ToastService {

  private configToast = {
    progressBar: true,
    closeButton: true,
    timeOut: 3000,
    positionClass: 'toast-top-right',
  }

  constructor(private toastr: ToastrService) { }

  public showToast(message: string, title: string): void {
    this.toastr.success(message, title, this.configToast)
  }

  public showSuccess(message: string, title: string): void {
    this.toastr.success(message, title, this.configToast)
  }

  public showError(message: string, title: string): void {
    this.toastr.error(message, title, this.configToast)
  }

  public showWarning(message: string, title: string): void {
    this.toastr.warning(message, title, this.configToast)
  }

  public showInfo(message: string, title: string): void {
    this.toastr.info(message, title, this.configToast)
  }

  public showShow(message: string, title: string): void {
    this.toastr.show(message, title, this.configToast)
  }
}
