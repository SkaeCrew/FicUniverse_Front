import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {CategoriesService} from "../../services/categories.service";
import {Category} from "../../model/category.entity";

@Component({
  selector: 'app-category-sheet',
  templateUrl: './category-sheet.component.html',
  styleUrls: ['./category-sheet.component.scss']
})
export class CategorySheetComponent implements OnInit {
  categoriesList: Array<Category> = [];
  categories: Array<Category> = [];
  @Output()categorySender= new EventEmitter<Array<Category>>();
  @Output()filterState = new EventEmitter<boolean>();
  constructor(private categoryService: CategoriesService, private _bottomSheetRef: MatBottomSheetRef<CategorySheetComponent>,@Inject(MAT_BOTTOM_SHEET_DATA) public data: {categories: Array<Category>}) {}

    ngOnInit(): void {
      this.categoryService.getAll().subscribe((response: any)=>{
        this.categoriesList = response;
        if(this.data.categories != null){
          for (let i = 0; i < this.categoriesList.length; i++){
            for (let j = 0; j < this.data.categories.length; j++){
              if(this.data.categories[j].name == this.categoriesList[i].name){
                this.categoriesList[i].selected = true;
              }
            }
          }
        }
      })
    }
  sendCategoriesSelected(){
    for (let i = 0; i < this.categoriesList.length; i++){
      if(this.categoriesList[i].selected)
        this.categories.push(this.categoriesList[i]);
    }
    if(this.categories.length != 0){
      this.filterState.emit(true);
    }
    else {
      this.filterState.emit(false);
    }
    this.categorySender.emit(this.categories);
    this._bottomSheetRef.dismiss();
  }
  onCancel(){
    this.filterState.emit(false);
    this._bottomSheetRef.dismiss();
  }

}
