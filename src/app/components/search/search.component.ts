import { Component, Input } from '@angular/core'
import { IVideoItem } from 'src/app/models/video-item.model'
import { SearchService } from './search.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Input() isSortVisible!: boolean

  videos: IVideoItem[] = []

  constructor(private searchService: SearchService) {}

  onSearch() {
    this.searchService.getVideos().subscribe(data => {
      this.videos = data.items
    })
  }
}
