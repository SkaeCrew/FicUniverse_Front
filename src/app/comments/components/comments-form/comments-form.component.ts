import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ComentariosService} from "../../services/comentarios.service";
import {DialogRef} from "@angular/cdk/dialog";

@Component({
  selector: 'app-comments-form',
  templateUrl: './comments-form.component.html',
  styleUrls: ['./comments-form.component.scss']
})
export class CommentsFormComponent {
  empForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _empService: ComentariosService,
    private _dialogRef: DialogRef<CommentsFormComponent>,
  ) {
    this.empForm = this._fb.group({
      Usuario:'',
      Contenido:'',
      Fecha:'',
    });
  }

  onFormSubmit(){
    if(this.empForm.valid){
      this._empService.añadirComentario(this.empForm.value).subscribe({
        next: (val: any) => {
          alert('¡Comentario añadido!');
          this._dialogRef.close();
        },
        error: (err: any) =>{
          console.error(err);
        }
      })
    }
  }
}
