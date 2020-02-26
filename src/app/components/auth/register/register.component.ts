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

  constructor(private _authService: AuthService,
    private _userValidationService: UserValidationService,
    private _toastService: ToastService,
    private _routesService: RoutesService) { }

  ngOnInit() {
    this.registerForm = this._userValidationService.authForm;
    this.getEmail = this._userValidationService.getEmail;
    this.getPassword = this._userValidationService.getPassword;
    /** RESET AUTH FORM */
    this.registerForm.setValue({
      email: new Date().getTime() + "@fr.fr",
      password: "frfr",
      confirmPassword: "frfr"
    });
  }

  ngOnDestroy() {
    if (this.registerSub) {
      this.registerSub.unsubscribe();
    }
  }

  public doRegisterUser(): void {
    this.registerSub = this._authService.register(this.registerForm.value)
      .subscribe(res => {
        this._toastService.showSuccess(res.message, "User created!")
        setTimeout(() => {
          this.registerForm.reset();
          this._routesService.navigateToRoute('/login');
        }, 3000)
      });

  }
}