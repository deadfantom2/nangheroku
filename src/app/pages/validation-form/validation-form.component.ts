import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-span-form-message',
  templateUrl: './validation-form.component.html',
  styleUrls: ['./validation-form.component.scss']
})
export class ValidationFormComponent implements OnInit {

  @Input("validator-type") type: AbstractControl;   // getEmail or getPassword

  @Input() minSize: String;   // 11 or 4
  @Input() maxSize: String;   // 50 or 100

  @Input("message-type") message: String;  // Email or Password


  constructor() { }

  ngOnInit(): void {
  }

}
