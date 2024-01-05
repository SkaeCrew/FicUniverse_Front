import {Component, OnInit} from '@angular/core';
import {Profile} from "../../model/profile.entity";
import {ProfileService} from "../../services/profile.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  profile : Profile = Profile.createEmptyProfile();

  constructor(private profileService: ProfileService, private cookieService: CookieService) {  }

  ngOnInit() {
    this.getProfileById();
  }

  getProfileById(){
    const id = Number(this.cookieService.get('id'));
    this.profileService.getProfileById(id).subscribe(profile => this.profile = profile);
  }
}
