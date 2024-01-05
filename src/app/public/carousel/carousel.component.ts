import {Component, Input, OnInit} from '@angular/core';

interface carouselImages{
  imageSrc: string;
  imageAlt: string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit{

  @Input() images: carouselImages[] = []
  @Input() indicator = true;
  @Input() controls = true;
  @Input() autoSlide = false;
  @Input() slideInterval = 10000;

  selectedIndex = 0;

  selectImage(i: number){
    this.selectedIndex = i;
  }
  changeImage(i: number){
    let result = this.selectedIndex + i;
    if(result < 0) result = this.images.length - 1;
    if(result > this.images.length - 1) result = 0;
    this.selectedIndex = result;
  }
  ngOnInit(): void {
    if(this.autoSlide){
      this.autoSlideImages();
    }
  }

  private autoSlideImages() {
    setInterval(()=>{
        this.changeImage(1);
      }, this.slideInterval);
  }
}
