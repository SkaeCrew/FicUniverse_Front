import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-home-fanfic',
  templateUrl: './home-fanfic.component.html',
  styleUrls: ['./home-fanfic.component.scss']
})
export class HomeFanficComponent {
  @Input() imgUrl :String = '';
  @Input() title: String = '';
  @Input() id!: number;

}
