import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {CategorySheetComponent} from "../../components/category-sheet/category-sheet.component";
import {TagSheetComponent} from "../../components/tag-sheet/tag-sheet.component";
import {Tag} from "../../model/tag.entity";
import {Category} from "../../model/category.entity";
import {FanficsService} from "../../services/fanfics.service";
import {Fanfic} from "../../model/fanfic.entity";
import {SharedDataService} from "../../../shared/services/shared-data.service";
import {ToolbarComponent} from "../../../shared/components/toolbar/toolbar.component";
import {filter, find, interval} from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{
  searching: boolean = false;
  value: any = '';
  fanficsSearchedSize: number = 0;
  @Input() tagsSelected!: Array<Tag>;
  @Input() categoriesSelected!: Array<Category>;
  @Input() filtering!: boolean;
  textInput: string = '';
  fanfics: Array<Fanfic> = [];
  fanficsSearched: Array<Fanfic> = [];
  categories: Array<Category> = [];
  tags: Array<Tag> = [];


  constructor(private bottomSheet: MatBottomSheet, private fanficService: FanficsService, private sharedData: SharedDataService) {

  }
  openCategoriesSheet(){
    const bottomSheetRef =  this.bottomSheet.open(CategorySheetComponent, {
      data: {categories: this.categoriesSelected}}
    );
    bottomSheetRef.instance.categorySender.subscribe((selectedCategories) =>{
      this.categoriesSelected = selectedCategories;
      this.getCategories(this.categoriesSelected);
      this.applyCategoryFilter();
    })
    bottomSheetRef.instance.filterState.subscribe((filterState) =>{
      this.filtering = filterState;
    })
  }
  openTagsSheet(){
    const bottomSheetRef = this.bottomSheet.open(TagSheetComponent,{
        data: {tags: this.tagsSelected}}
    );
    bottomSheetRef.instance.tagsSender.subscribe((selectedTags)=>{
      this.tagsSelected = selectedTags;
      this.getTags(this.tagsSelected);
      this.applyTagFilter()
    })
    bottomSheetRef.instance.filterState.subscribe((filterState)=>{
      this.filtering = filterState;
    })
  }
  applyCategoryFilter(){
    if(this.categories.length == 0 && !this.searching || this.filtering) this.restoreFanficsSearched()
    let filteredFanfics = this.fanficsSearched.filter((fanfic) => {
    return this.categories.every((category) =>
      fanfic.categories.some((x) => x.name === category.name)
    );
    });
    this.fanficsSearched = filteredFanfics;
  }

  applyTagFilter(){
    if(this.tags.length == 0 && !this.searching || this.filtering) this.restoreFanficsSearched()
    let filteredFanfics = this.fanficsSearched.filter((fanfic) => {
      return this.tags.every((tag) =>
        fanfic.tags.some((x) => x.name === tag.name)
      );
    });
    this.fanficsSearched = filteredFanfics;
  }

  getCategories(categories: any){
    this.restoreCategories();
    for(let i = 0; i < categories.length; i++){
      this.categories.push(categories[i]);
    }
  }

  getTags(tags: any){
    this.restoreTags();
    for(let i = 0; i < tags.length; i++){
      this.tags.push(tags[i]);
    }
  }

  ngOnInit(): void {
    this.fanficService.getAll().subscribe((response: any) =>{
      this.fanfics = response;
      for (let i = 0; i < this.fanfics.length; i++){
        this.fanfics[i].date = new Date(this.fanfics[i].publicationDate);
      }
      for(let i = 0; i < this.fanfics.length; i++){
        this.fanficsSearched.push(this.fanfics[i]);
      }
      this.sortingBy(1);
      this.fanficsSearchedSize = this.fanficsSearched.length;

    });
  }
  restoreFanficsSearched(){
    for (let i = 0; i < this.fanficsSearchedSize; i++){
      this.fanficsSearched.pop();
    }
    for(let i = 0; i < this.fanfics.length; i++){
      this.fanficsSearched.push(this.fanfics[i]);
    }
  }

  restoreCategories(){
    let categoriesSize = this.categories.length;
    for (let i = 0; i < categoriesSize; i++){
      this.categories.pop();
    }
  }

  restoreTags(){
    let tagsSize = this.tags.length;
    for(let i=0; i < tagsSize; i++){
      this.tags.pop();
    }
  }

  searchingFanfic(){
      if(this.value == '') {
        this.restoreFanficsSearched()
        this.searching = false
      }
      else this.searching = true;
      let filteredFanfics = this.fanficsSearched.filter((fanfic) => {
      return fanfic.title.toLowerCase().includes(this.value.toLowerCase())
      });
      this.fanficsSearched = filteredFanfics;
  }

  sortingBy(option: number){
    switch (option) {

      case 1:{
        this.fanfics.sort((a,b)=>a.date.getTime() - b.date.getTime());
        this.fanficsSearched.sort((a,b)=>a.date.getTime() - b.date.getTime());
        break;
      }
      case 2:{
        this.fanfics.sort((a,b)=>b.date.getTime() - a.date.getTime());
        this.fanficsSearched.sort((a,b)=>b.date.getTime() - a.date.getTime());
        break;
      }
      case 3:{
        this.fanfics.sort((a,b)=>b.views - a.views);
        this.fanficsSearched.sort((a,b)=>b.views - a.views);
        break;
      }
      case 4:{
        this.fanfics.sort((a,b)=>b.favorites - a.favorites);
        this.fanficsSearched.sort((a,b)=>b.favorites - a.favorites);
        break;
      }
      case 5:{
        this.fanfics.sort((a,b)=>a.title.localeCompare(b.title));
        this.fanficsSearched.sort((a,b)=>a.title.localeCompare(b.title));
        break;
      }
      case 6:{
        this.fanfics.sort((a,b)=>b.title.localeCompare(a.title));
        this.fanficsSearched.sort((a,b)=>b.title.localeCompare(a.title));
        break;
      }
    }
  }

}
