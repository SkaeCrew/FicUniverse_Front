import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Chapter} from "../../model/chapter.entity";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-chapter-form',
  templateUrl: './chapter-form.component.html',
  styleUrls: ['./chapter-form.component.scss']
})
export class ChapterFormComponent {
  @Input()chapter: Chapter;
  @ViewChild('chapterForm', {static: false}) chapterForm!: NgForm;
  @Input() editMode = false;
  @Output()chapterAdded = new EventEmitter<Chapter>();
  @Output()chapterUpdated = new EventEmitter<Chapter>();
  @Output()editCanceled = new EventEmitter();

  constructor() {
    this.chapter = {} as Chapter;
  }

  private resetEditState(){
    this.editMode = false;
    this.chapterForm.resetForm();
    this.chapter = {} as Chapter;
  }

  onSubmit(){
    if(this.chapterForm.form.valid){
      if(this.editMode){
        this.chapterUpdated.emit(this.chapter);
      } else{
        this.chapterAdded.emit(this.chapter);
      }
      this.resetEditState();
    } else{
      console.log('Invalid Data');
    }
  }

  onCancel(){
    this.resetEditState();
    this.editCanceled.emit();
  }
}
