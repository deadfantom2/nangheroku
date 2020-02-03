import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-testroute',
  templateUrl: './testroute.component.html',
  styleUrls: ['./testroute.component.scss']
})
export class TestrouteComponent implements OnInit {

  message: String;
  user: any;

  constructor(private _authService: AuthService, private _tokenService: TokenService) { }

  ngOnInit() {
    this._authService.toto().subscribe(data => {
      console.log(data)
      return this.message = data.message;
    })
  }

}
