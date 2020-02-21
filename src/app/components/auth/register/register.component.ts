import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService, UserValidationService, ToastService, RoutesService } from '../../../_services';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  public registerSub: Subscription;
  public registerForm: FormGroup;
  public getEmail: AbstractControl;
  public getPassword: AbstractControl;
  public message: String;

  constructor(private _authService: AuthService,
    private _userValidationService: UserValidationService,
    private _toastService: ToastService,
    private _routes: RoutesService) { }

  ngOnInit() {
    this.registerForm = this._userValidationService.registerForm;
    this.getEmail = this._userValidationService.getEmail;
    this.getPassword = this._userValidationService.getPassword;
  }

  ngOnDestroy() {
    if (this.registerSub) {
      this.registerSub.unsubscribe();
    }
  }

  doRegisterUser() {
    this.registerSub = this._authService.register(this.registerForm.value)
      .subscribe(res => {
        this._toastService.showSuccess(res.message, "User created!")
        setTimeout(() => {
          this._routes.navigateToRoute('/login');
        }, 3000)
      });
  }
}