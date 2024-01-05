import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {ComentariosService} from "../../services/comentarios.service";
import {CommentsFormComponent} from "../../components/comments-form/comments-form.component";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit{
  displayedColumns: string[] = ['Content',
    'PublicationDate',
    'Upvote',
    'Downvote',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _dialog: MatDialog, private _empService: ComentariosService){}

  ngOnInit() {
    this.getListaComentarios()
  }

  openAddEditEmpForm(){
    const dialogRef = this._dialog.open(CommentsFormComponent);
    dialogRef.afterClosed().subscribe({
      next: (val: any) =>
      {
        if(val){
          this.getListaComentarios();
        }
      }    })

  }
  getListaComentarios(){
    this._empService.getListaComentarios().subscribe({
      next: (res: any) =>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) =>{
        console.log(err)
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteComentario(id: number){
    this._empService.deleteComentario(id).subscribe({
      next: (res: any) => {
        alert('Comentario eliminado');
        this.getListaComentarios();
      },
    })
  }

  openEditForm(data: any){
    this._dialog.open(CommentsFormComponent, {
      data,
    });

  }

  protected readonly EmpAddEditComponent = CommentsFormComponent;
}
