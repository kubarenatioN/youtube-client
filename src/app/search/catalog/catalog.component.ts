import { Component, OnInit } from '@angular/core';
import { IVideoItem } from 'src/app/models/video-item.model';
import { IVideosResponse } from 'src/app/models/videos-response.model';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  videosResponse?: IVideosResponse

  videos: IVideoItem[] = []

  constructor(
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.getVideos()
  }

  getVideos(): void {
    this.searchService.getVideos().subscribe(data => {
      this.videosResponse = data
      this.videos = data.items
    })
  }
}
