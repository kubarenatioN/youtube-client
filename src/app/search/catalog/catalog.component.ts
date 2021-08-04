import { Component } from '@angular/core';
import { IVideosResponse } from 'src/app/models/videos-response.model';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent {
  videos?: IVideosResponse
}
