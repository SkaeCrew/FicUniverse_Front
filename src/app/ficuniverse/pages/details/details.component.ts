import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailfanficService } from '../../services/detailfanfic.service';
import {FanficsService} from "../../services/fanfics.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{
    fanficId: number = 0;
    fanfic: any;


    constructor(private route: ActivatedRoute, private detailfanficService: FanficsService) {}

    ngOnInit() {
      this.route.params.subscribe((params) => {
        this.fanficId = +params['fanficId'];
        this.loadFanficDetails();
      });
    }

    loadFanficDetails() {
      this.detailfanficService.getFanficById(this.fanficId).subscribe(
        (fanfic) => {
          this.fanfic = fanfic;
        },
        (error) => {
          console.error('Error al cargar los detalles del fanfic', error);
        }
      );
    }

    addToFavorites(): void {
    }

  }

