import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-testroute',
  templateUrl: './testroute.component.html',
  styleUrls: ['./testroute.component.scss']
})
export class TestrouteComponent implements OnInit {

  message: String;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.toto().subscribe(data => {
      console.log(data);
      return this.message = data.message;
    })
  }

}
