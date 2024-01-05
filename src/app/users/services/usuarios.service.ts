import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class usuariosService {

  constructor(private _http: HttpClient) { }
  añadirusuarios(data: any): Observable<any>{
    return this._http.post('http://localhost:3000/usuarios', data);
  }

  getListausuario(): Observable<any> {
    return this._http.get('http://localhost:3000/usuarios');
  }
  deleteusuario(id: number): Observable<any>{
    return this._http.delete(`http://localhost:3000/usuarios/${id}`)
  }
}
