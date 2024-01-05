import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-write-fanfic',
  templateUrl: './write-fanfic.component.html',
  styleUrls: ['./write-fanfic.component.scss']
})
export class WriteFanficComponent {
  constructor(private router: Router) {
  }
  navigateToHome(){
    this.router.navigate(['home']).then();
  }
}
