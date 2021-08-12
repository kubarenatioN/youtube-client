import { Pipe, PipeTransform } from '@angular/core'
import {
  ISortOptions,
  SortType,
  SortOrder,
} from 'src/app/youtube/models/sort-options.model'
import { IVideoItem } from 'src/app/youtube/models/video-item.model'

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  private videos: IVideoItem[] = []

  transform(value: IVideoItem[], options: ISortOptions): IVideoItem[] {
    const { order } = options.sort
    const { type } = options.sort
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
    if (order === 'asc') {
      return (
        new Date(b.snippet.publishedAt).getTime() -
        new Date(a.snippet.publishedAt).getTime()
      )
    }
    return (
      new Date(a.snippet.publishedAt).getTime() -
      new Date(b.snippet.publishedAt).getTime()
    )
  }

  private sortByViews(a: IVideoItem, b: IVideoItem, order: SortOrder): number {
    if (order === 'desc') {
      return Number(b.statistics.viewCount) - Number(a.statistics.viewCount)
    }
    return Number(a.statistics.viewCount) - Number(b.statistics.viewCount)
  }
}
