import {Component, OnInit} from '@angular/core';
import {FanficsService} from "../../../ficuniverse/services/fanfics.service";
import {CookieService} from "ngx-cookie-service";
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  fanfics: Array<any> = []

  constructor(private fanficService: FanficsService, private cookieService: CookieService) {
  }

  images = [{
    imageSrc: 'https://ma.wattpad.com/the_hookup_pact_hfc_desktop_final.jpg',
    imageAlt: 'promo1'
  },
    {
      imageSrc: 'https://ma.wattpad.com/threadofashandfire_hfc_desktop_final.jpg',
      imageAlt: 'promo2'
    },
    {
      imageSrc: 'https://ma.wattpad.com/picky_eater__hfc_desktop_final.png',
      imageAlt: 'promo3'
    },]
  ngOnInit(): void {
    this.fanficService.getAll().subscribe((response: any) =>{
      this.fanfics = response
    } )
  }

  isLogged(): boolean{
    return this.cookieService.check('token');
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<img src="https://cdn.iconscout.com/icon/free/png-512/free-left-arrow-1438247-1216208.png?w=25">', '<img src="https://cdn.iconscout.com/icon/free/png-512/free-right-arrow-1438233-1216194.png?w=25">'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1200: {
        items: 5
      }
    },
    nav: true
  }
}
