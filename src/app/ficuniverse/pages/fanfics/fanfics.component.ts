import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import { Fanfic } from '../../model/fanfic.entity';
import { FanficsService } from '../../services/fanfics.service';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-fanfics',
  templateUrl: './fanfics.component.html',
  styleUrls: ['./fanfics.component.scss']
})
export class FanficsComponent implements OnInit, AfterViewInit{

  fanficData: Fanfic;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'title', 'author', 'summary', 'publication_date', 'language_id', 'status_id', 'saga_id', 'actions'];
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  isEditMode = false;
  

  constructor(private fanficsService: FanficsService){
    this.fanficData = {} as Fanfic;
    this.dataSource = new MatTableDataSource<any>();
  }

  private resetEditState() {
    this.isEditMode = false;
    this.fanficData = {} as Fanfic;
  }

  private getAllFanfics(){
    this.fanficsService.getAll().subscribe((response: any) =>{
      this.dataSource.data = response;
    })
  }

  private addFanfic() {
    this.fanficData.id = 0;
    this.fanficsService.create(this.fanficData).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((o: Fanfic) => {
        return o;
      });
    });
  }

  private updateFanfic() {
    let fanfic = this.fanficData;
    this.fanficsService.update(fanfic.id, fanfic).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o: Fanfic) => {
        if (o.id === response.id) {
          o = response;
        }
        return o;
      });
    });
  }

  private deleteFanfic(id: number){
    this.fanficsService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: Fanfic) => {
        return o.id !== id ? o : false
      });
    });
  }

  onEditItem(element: Fanfic){
    this.fanficData = element;
    this.isEditMode = true;
  }

  onDeleteItem(element: Fanfic){
    this.deleteFanfic(element.id);
  }

  onCancelEdit(){
    this.isEditMode = false;
    this.getAllFanfics();
  }

  onFanficAdded(fanfic: Fanfic){
    this.fanficData = fanfic;
    this.addFanfic();
    this.resetEditState();
  }

  onFanficUpdated(fanfic: Fanfic){
    this.fanficData = fanfic;
    this.updateFanfic();
    this.resetEditState();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllFanfics();
    
  }
}
