import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, retry, throwError} from "rxjs";
import {JwtInterceptorInterceptor} from "./interceptor/jwt-interceptor.interceptor";
import {CookieService} from "ngx-cookie-service";


export class BaseService<T> {
  basePath: string = `${environment.serverBasePath}`;
  resourceEndpoint: string = '/resources';


  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  }
  constructor(private http: HttpClient) {

  }

  handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.error(`An error occurred: ${error.error.message}`);
    } else{
      console.log(`Backend returned core ${error.status}, body was ${error.error}`);
    }
    return throwError(()=> new Error('Something happened with request, please try again'))
  }
  resourcePath(): string{
    return `${this.basePath}${this.resourceEndpoint}`;
  }

  create(item: any){
    return this.http.post<T>(this.resourcePath(),JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  delete(id: any){
    return this.http.delete(`${this.resourcePath()}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  update(id: any, item: any){
    return this.http.put<T>(`${this.resourcePath()}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2),catchError(this.handleError));
  }

  getAll(){
    return this.http.get<T[]>(this.resourcePath(),this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}

