import {AfterViewInit, Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {CategoriesService} from "../../services/categories.service";
import {TagsService} from "../../services/tags.service";
import {Category} from "../../model/category.entity";
import {Tag} from "../../model/tag.entity";

@Component({
  selector: 'app-tag-sheet',
  templateUrl: './tag-sheet.component.html',
  styleUrls: ['./tag-sheet.component.scss']
})
export class TagSheetComponent implements OnInit, AfterViewInit{
  //selected: { [id: number]: boolean } = {};
  tagsList: Array<Tag> = [];
  tags: Array<Tag> = [];
  @Output()tagsSender= new EventEmitter<Array<Tag>>();
  @Output()filterState = new EventEmitter<boolean>();


  constructor(private tagService: TagsService, private _bottomSheetRef: MatBottomSheetRef<TagSheetComponent>,@Inject(MAT_BOTTOM_SHEET_DATA) public data: {tags: Array<Tag>}) {
  }

  ngOnInit(): void {
    this.tagService.getAll().subscribe((response: any)=>{
      this.tagsList = response;
      if(this.data.tags != null){
        for (let i = 0; i < this.tagsList.length; i++){
          for (let j = 0; j < this.data.tags.length; j++){
            if(this.data.tags[j].name == this.tagsList[i].name){
              this.tagsList[i].selected = true;
            }
          }
        }
      }
    })
  }

  ngAfterViewInit() {
  }

  sendTagsSelected(){
    for (let i = 0; i < this.tagsList.length; i++){
      if(this.tagsList[i].selected)
        this.tags.push(this.tagsList[i]);
    }
    if(this.tags.length != 0)
      this.filterState.emit(true)
    else
      this.filterState.emit(false)

    this.tagsSender.emit(this.tags);
    this._bottomSheetRef.dismiss();

  }
  onCancel(){
    this.filterState.emit(false);
    this._bottomSheetRef.dismiss();
  }

}
