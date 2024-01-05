import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {usuariosService} from "../../services/usuarios.service";
import {UsersFormComponent} from "../../components/users-form/users-form.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{
  displayedColumns: string[] = ['Usuario',
    'contrasenia',
    'correo',
    'id',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _dialog: MatDialog, private _empService: usuariosService){}

  ngOnInit() {
    this.getListausuario()
  }

  openAddEditEmpForm(){
    const dialogRef = this._dialog.open(UsersFormComponent);
    dialogRef.afterClosed().subscribe({
      next: (val: any) =>
      {
        if(val){
          this.getListausuario();
        }
      }    })


  }
  getListausuario(){
    this._empService.getListausuario().subscribe({
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
  deleteusuario(id: number){
    this._empService.deleteusuario(id).subscribe({
      next: (res: any) => {
        alert('Usuario eliminado');
        this.getListausuario();
      },
    })
  }

  openEditForm(data: any){
    this._dialog.open(UsersFormComponent, {
      data,
    });

  }

  protected readonly EmpAddEditComponent = UsersFormComponent;

}
