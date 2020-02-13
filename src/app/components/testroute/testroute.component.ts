import { Component, OnInit } from '@angular/core';
import { AuthService, TokenService } from '../../_services';

@Component({
  selector: 'app-testroute',
  templateUrl: './testroute.component.html',
  styleUrls: ['./testroute.component.scss']
})
export class TestrouteComponent implements OnInit {

  message: String;
  user: any;

  constructor(private _authService: AuthService,
    private _tokenService: TokenService) { }

  ngOnInit() {
    this._authService.toto().subscribe(data => {
      console.log(data)
      this.user = this._tokenService.getPayload().email;
      return this.message = data.message;
    })
  }

}
