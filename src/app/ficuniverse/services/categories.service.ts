import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../../shared/services/base.service";
import {Fanfic} from "../model/fanfic.entity";
import {Category} from "../model/category.entity";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends BaseService<Category>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/categories';
  }
}
