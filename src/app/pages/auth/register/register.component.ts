import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/services.index';
import { retryWhen, delay, take } from 'rxjs/operators';

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
