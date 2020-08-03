import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/sevices/login.service';
import { HelperService } from 'src/app/Helper/helper.service';
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private helperService: HelperService,
    private loginService: LoginService,
 
    private router: Router
  ) { }

  isLoggedin: boolean;
  ngOnInit() {
    this.isLoggedin = this.helperService.token ? true : false;
  }

  logOut(): void {
    const data = {};
    this.loginService.logoutUser(data)
      .subscribe(result => {
        console.log(result);
        this.router.navigate(['/login']);
      }, err => {
        alert(err);
      });
  }

}
