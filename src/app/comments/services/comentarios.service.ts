import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  constructor(private _http: HttpClient) { }
  añadirComentario(data: any): Observable<any>{
    return this._http.post('http://localhost:4200/comentarios', data);
  }

  getListaComentarios(): Observable<any> {
    return this._http.get('http://localhost:4200/comentarios');
  }
  deleteComentario(id: number): Observable<any>{
    return this._http.delete(`http://localhost:4200/comentarios/${id}`)
  }
}
