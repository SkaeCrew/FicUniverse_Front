import {Component, Input} from '@angular/core';
import {Fanfic} from "../../model/fanfic.entity";

@Component({
  selector: 'app-fic-details-card',
  templateUrl: './fic-details-card.component.html',
  styleUrls: ['./fic-details-card.component.scss']
})
export class FicDetailsCardComponent {
  @Input() fanfic!: Fanfic;
  views: any = 0;
  favorites: any = 0;
  chapters: any = 0;



  ngOnInit(): void {
    this.setData()
  }

  setData(){
    if(this.fanfic.views >= 1000000) {
      this.views = this.fanfic.views / 1000000;
      this.views = this.views.toFixed(2) + 'M';
    }
    else if(this.fanfic.views >= 1000) {
      this.views = this.fanfic.views / 1000;
      this.views = this.views.toFixed(2) + 'K';
    }
    if(this.fanfic.favorites >= 100000) {
      this.favorites = this.fanfic.favorites / 1000000;
      this.favorites = this.favorites.toFixed(2) + 'M';
    }
    else if(this.fanfic.favorites >= 1000) {
      this.favorites = this.fanfic.favorites / 1000;
      this.favorites = this.favorites.toFixed(2) + 'K';
    }
    this.chapters = this.fanfic.chapters.length;
  }

}
