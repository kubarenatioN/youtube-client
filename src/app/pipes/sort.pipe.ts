import { Pipe, PipeTransform } from '@angular/core'
import { ISortOptions, SortType, SortOrder } from '../models/sort-options.model'
import { IVideoItem } from '../models/video-item.model'

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  private videos: IVideoItem[] = []

  transform(value: IVideoItem[], options: ISortOptions): IVideoItem[] {
    const { type, order } = options.sort
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
    if (order === 'asc') return res * -1
    return res
  }

  private sortByViews(a: IVideoItem, b: IVideoItem, order: SortOrder): number {
    const res = Number(b.statistics.viewCount) - Number(a.statistics.viewCount)
    if (order === 'asc') return res * -1
    return res
  }
}
