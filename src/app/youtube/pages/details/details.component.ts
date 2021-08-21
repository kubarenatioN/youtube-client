import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { IVideoStatsItem } from '../../models/video-item.model'
import { SearchService } from '../../services/search.service'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  video: IVideoStatsItem | null = null

  private videoSubscription!: Subscription

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.videoSubscription = this.searchService.videoDetails$.subscribe(
      video => {
        this.video = video
      }
    )
    const { id } = this.route.snapshot.params || ''
    this.searchService.getById(id)
  }

  ngOnDestroy(): void {
    this.videoSubscription.unsubscribe()
  }
}
