import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import {BaseService} from "../../shared/services/base.service";
import {Fanfic} from "../model/fanfic.entity";

@Injectable({
  providedIn: 'root'
})
export class DetailfanficService extends BaseService<Fanfic>{

    constructor(http: HttpClient, private httpClient: HttpClient) {
      super(http);
      this.resourceEndpoint='/fanfics'
    }


    getFanficById(fanficId: number): Observable<any> {
      const url = `${this.resourcePath()}/${fanficId}`;
      return this.httpClient.get(url).pipe(
        catchError((error) => {
          console.error('Error fetching fanfic details:', error);
          throw error;
        })
      );
    }


}
