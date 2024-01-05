import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Fanfic} from "../../model/fanfic.entity";

@Component({
  selector: 'app-fanfic-form',
  templateUrl: './fanfic-form.component.html',
  styleUrls: ['./fanfic-form.component.scss']
})
export class FanficFormComponent {

  @Output()editCanceled = new EventEmitter();
  @Output()onFanficAdded = new EventEmitter<Fanfic>();
  @Output()onFanficUpdated = new EventEmitter<Fanfic>();
  @Input()editMode = false;
  @Input()fanfic: Fanfic;

  @ViewChild('fanficForm', {static: false}) fanficForm!: NgForm;

  constructor(){
    this.fanfic = {} as Fanfic;
  }

  private resetEditState() {
    this.editMode = false;
    this.fanficForm.resetForm();
    this.fanfic = {} as Fanfic;
  }

  onSubmit() {
    if (this.fanficForm.form.valid) {
      if (this.editMode) {
        this.onFanficUpdated.emit(this.fanfic);
      } else {
        this.onFanficAdded.emit(this.fanfic);
      }
      this.resetEditState();
    } else {
      console.log('Invalid Data');
    }
  }

  onCancel() {
    this.resetEditState();
    this.editCanceled.emit();
  }

}
