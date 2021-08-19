import { Pipe, PipeTransform } from '@angular/core'
import { SortType, SortOrder } from 'src/app/youtube/models/sort-options.model'
import { IVideoItem } from 'src/app/youtube/models/video-item.model'
import { SortbarManagerService } from 'src/app/youtube/services/sortbar-manager.service'

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  private videos: IVideoItem[] = []

  constructor(private sortService: SortbarManagerService) {}

  transform(value: IVideoItem[]): IVideoItem[] {
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

  private sortByDate(a: IVideoItem, b: IVideoItem, order: SortOrder): number {
    const res =
      new Date(a.snippet.publishedAt).getTime() -
      new Date(b.snippet.publishedAt).getTime()
    return order === 'asc' ? -res : res
  }

  private sortByViews(a: IVideoItem, b: IVideoItem, order: SortOrder): number {
    const res = Number(b.statistics.viewCount) - Number(a.statistics.viewCount)
    return order === 'asc' ? -res : res
  }
}
