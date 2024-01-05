import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Chapter} from "../../model/chapter.entity";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ChapterService} from "../../services/chapter.service";

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.scss']
})
export class ChaptersComponent implements OnInit, AfterViewInit{
  chapterData: Chapter;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'bookId', 'order','title', 'content', 'actions']
  inEditMode = false;

  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;

  constructor(private chapterService: ChapterService) {
    this.chapterData = {} as Chapter;
    this.dataSource = new MatTableDataSource<any>();
  }

  private resetEditState() {
    this.inEditMode = false;
    this.chapterData = {} as Chapter;
  }
  private getAllChapters(){
    this.chapterService.getAll().subscribe((response: any)=>{
      this.dataSource.data = response;
    })
  }

  private addChapter(){
    this.chapterData.id = 0;
    this.chapterService.create(this.chapterData).subscribe((response: any)=>{
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((o: Chapter)=>{
        return o;
      })
    })
  }

  private updateChapter(){
    let appointment = this.chapterData;
    this.chapterService.update(appointment.id,appointment).subscribe((response: any)=>{
      this.dataSource.data = this.dataSource.data.map((o: Chapter) =>{
        if(o.id === response.id){
          o = response;
        }
        return o;
      });
    });
  }

  private deleteChapter(id: number){
    this.chapterService.delete(id).subscribe(() =>{
      this.dataSource.data =this.dataSource.data.filter((o: Chapter) =>{
        return o.id !== id ? o : false
      });
    })
  }
  onEditItem(element: Chapter){
    this.chapterData = element;
    this.inEditMode = true;
  }

  onCancelEdit(){
    this.inEditMode = false;
    this.getAllChapters();
  }

  onDeleteItem(element: Chapter){
    this.deleteChapter(element.id)
  }

  onChapterAdded(chapter: Chapter){
    this.chapterData = chapter;
    this.addChapter();
    this.resetEditState();
  }

  onChapterUpdated(chapter: Chapter){
    this.chapterData = chapter;
    this.updateChapter();
    this.resetEditState();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllChapters()
  }

}
