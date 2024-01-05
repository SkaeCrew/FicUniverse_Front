import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-fanfics',
  templateUrl: './my-fanfics.component.html',
  styleUrls: ['./my-fanfics.component.scss']
})
export class MyFanficsComponent {
  constructor(private router: Router) {
  }
  navigateToHome(){
    this.router.navigate(['home']).then();
  }
}
