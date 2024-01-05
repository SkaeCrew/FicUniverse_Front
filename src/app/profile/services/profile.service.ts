import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../../shared/services/base.service";
import {map} from "rxjs";
import {Profile} from "../model/profile.entity";

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends BaseService<Profile>{
  constructor(private _http: HttpClient) {
    super(_http);
    this.resourceEndpoint = '/profiles'
  }

  getProfileById(id: number){
    return  this._http.get<Profile>(`${this.resourcePath()}/${id}`).pipe(
      map(profile => new Profile(
        profile.firstName,
        profile.lastName,
        profile.email,
        profile.imageUrl,
        profile.username,
        profile.id
      ))
    );
  }

  getImageUrl(id: number){
    return this.getProfileById(id).pipe(map(profile => profile.imageUrl));
  }
}
