import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { Fanfic } from '../model/fanfic.entity';
import { HttpClient } from '@angular/common/http';
import {Observable, map, catchError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FanficsService extends BaseService<Fanfic>{

  constructor(http: HttpClient, private httpClient: HttpClient) {
    super(http);
    this.resourceEndpoint = '/fanfics'
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

