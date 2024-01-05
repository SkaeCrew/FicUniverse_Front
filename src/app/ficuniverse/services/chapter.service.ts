import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable} from 'rxjs';
import {BaseService} from "../../shared/services/base.service";
import {Chapter} from "../../chapters/model/chapter.entity";

@Injectable({
  providedIn: 'root'
})
export class ChapterService extends BaseService<Chapter>{
  //private apiUrl = 'http://localhost:3000';
  constructor(private httpClient: HttpClient, http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/chapters'
  }
  getCategories() {
    throw new Error('Method not implemented.');
  }

  getChaptersById(id: number): Observable<any>{
    const url = `${this.resourcePath()}/${id}`;
    return this.httpClient.get(url).pipe(
      catchError((error)=>{
        console.error('Error fetching chapter details: ', error);
        throw error;
      })
    );
  }
}
