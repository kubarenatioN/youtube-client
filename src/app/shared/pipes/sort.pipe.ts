import { Pipe, PipeTransform } from '@angular/core'
import { SortOrder, SortType } from 'src/app/youtube/models/sort-options.model'
import { IVideoStatsItem } from 'src/app/youtube/models/video-item.model'
import { SortbarManagerService } from 'src/app/youtube/services/sortbar-manager.service'

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  private videos: IVideoStatsItem[] = []

  constructor(private sortService: SortbarManagerService) {}

  transform(value: IVideoStatsItem[]): IVideoStatsItem[] {
    const { type, order } = this.sortService.options.sort
    switch (type) {
      case SortType.Date:
        this.videos = value.sort((a, b) => this.sortByDate(a, b, order))
        break
      case SortType.ViewsCount:
        this.videos = value.sort((a, b) => this.sortByViews(a, b, order))
        break
      default:
        this.videos = value
        break
    }
    return this.videos
  }

  private sortByDate(
    a: IVideoStatsItem,
    b: IVideoStatsItem,
    order: SortOrder
  ): number {
    const res =
      new Date(a.snippet.publishedAt).getTime() -
      new Date(b.snippet.publishedAt).getTime()
    return order === 'asc' ? -res : res
  }

  private sortByViews(
    a: IVideoStatsItem,
    b: IVideoStatsItem,
    order: SortOrder
  ): number {
    const res = Number(b.statistics.viewCount) - Number(a.statistics.viewCount)
    return order === 'asc' ? -res : res
  }
}
