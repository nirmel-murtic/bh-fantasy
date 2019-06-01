import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css']
})
export class LoginButtonComponent implements OnInit {

  @Input()
  public type: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  public facebookLogin(event) {
    this.authService.signIn(event, 'facebook');
  }

  public googleLogin(event) {
    this.authService.signIn(event, 'google');
  }
}
