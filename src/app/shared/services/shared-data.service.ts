import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private inputSource = new BehaviorSubject<string>("");
  currentInput = this.inputSource.asObservable();

  constructor() { }

  changeInput(input: string){
    this.inputSource.next(input);
  }
}
