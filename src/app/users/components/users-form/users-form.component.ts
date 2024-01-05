import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {usuariosService} from "../../services/usuarios.service";
import {DialogRef} from "@angular/cdk/dialog";

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent {
  empForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _empService: usuariosService,
    private _dialogRef: DialogRef<UsersFormComponent>,
  ) {
    this.empForm = this._fb.group({
      Usuario:'',
      contrasenia:'',
      correo:'',
    });
  }

  onFormSubmit(){
    if(this.empForm.valid){
      this._empService.añadirusuarios(this.empForm.value).subscribe({
        next: (val: any) => {
          alert('¡usuario añadido!');
          this._dialogRef.close();
        },
        error: (err: any) =>{
          console.error(err);
        }
      })
    }
  }
}
