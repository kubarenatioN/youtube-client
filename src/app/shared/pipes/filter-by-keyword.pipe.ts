import { Pipe, PipeTransform } from '@angular/core'
import { SortType } from 'src/app/youtube/models/sort-options.model'
import { IVideoItem } from 'src/app/youtube/models/video-item.model'
import { SortbarManagerService } from 'src/app/youtube/services/sortbar-manager.service'

@Pipe({
  name: 'filterByKeyword',
})
export class FilterByKeywordPipe implements PipeTransform {
  constructor(private sortService: SortbarManagerService) {}

  transform(value: IVideoItem[]): IVideoItem[] {
    const { options } = this.sortService
    if (options.sort.type !== SortType.KeyWord) return value
    const pattern = this.getPattern(options.keywords)
    return value.filter(v => pattern.test(v.snippet.title))
  }

  private handleEscape = (str: string) =>
    str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  private getPattern(query: string) {
    const matches = query.match(/\S+/g)
    if (matches === null) return new RegExp('')
    return new RegExp(
      `^${matches
        .map(this.handleEscape)
        .map(word => `(?=.*${word})`)
        .join('')}`,
      'i'
    )
  }
}
