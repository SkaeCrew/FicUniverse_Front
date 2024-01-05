import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ChapterService} from "../../../chapters/services/chapter.service";
import {Chapter} from "../../../chapters/model/chapter.entity";
import {Fanfic} from "../../model/fanfic.entity";

@Component({
  selector: 'app-fic-details-chapters',
  templateUrl: './fic-details-chapters.component.html',
  styleUrls: ['./fic-details-chapters.component.scss']
})
export class FicDetailsChaptersComponent implements OnInit{
  chapterData: Chapter;
  @Input() fanfic: any;

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['order', 'chapter']

  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;


  constructor(private chapterService: ChapterService) {
    this.chapterData = {} as Chapter;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(){
    this.dataSource = this.fanfic.chapters;
  }
}
