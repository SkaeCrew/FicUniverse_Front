import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SharedDataService} from "../../services/shared-data.service";
import {AuthService} from "../../services/auth.service";
import {CookieService} from "ngx-cookie-service";
import {ProfileService} from "../../../profile/services/profile.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit{
  imageUrl: string = '';
  value: any = '';
  @Input() isLoged: boolean = true;

  constructor(private sharedData: SharedDataService, private cookieService: CookieService, private authService: AuthService, private profileService: ProfileService) {
  }

onInputChange(){
    this.sharedData.changeInput(this.value);
}

  userLogged(): boolean{
    return this.cookieService.check('token');
  }

  logOut(){
    this.authService.logout();
  }

  ngOnInit() {
    this.getProfileImage();
  }

  getProfileImage(){
    const id = Number(this.cookieService.get('id'));
    this.profileService.getImageUrl(id).subscribe(imageUrl => this.imageUrl = imageUrl);
  }

}
