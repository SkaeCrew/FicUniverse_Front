import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit{
  invalidURL: string = '';
  constructor(private route: ActivatedRoute, private router: Router) {
  }
  navigateToHome(){
    this.router.navigate(['home']).then();
  }

  ngOnInit(){
    this.invalidURL = this.route.snapshot.url[0].path;
  }
}
