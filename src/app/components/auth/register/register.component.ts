import { Component, OnInit } from '@angular/core';
import { retryWhen, delay, take } from 'rxjs/operators';
import { User } from '../../../_models/user';
import { AuthService } from '../../../_services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public user: User = new User();

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

  public createOneUser(user: User): void {
    this._authService.register(user).pipe(
      retryWhen(errors => errors.pipe(delay(5000), take(2)))
    ).subscribe();
  }

}
