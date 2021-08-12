import { Pipe, PipeTransform } from '@angular/core'
import { ISortOptions, SortType } from '../models/sort-options.model'
import { IVideoItem } from '../models/video-item.model'

@Pipe({
  name: 'filterByKeyword',
})
export class FilterByKeywordPipe implements PipeTransform {
  transform(value: IVideoItem[], options: ISortOptions): IVideoItem[] {
    if (options.sort.type !== SortType.KeyWord) return value
    const pattern = this.toPattern(options.keywords)
    return value.filter(v => {
      return pattern.test(v.snippet.title)
    })
  }

  handleEscape = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  toPattern(search: string) {
    const matches = search.match(/\S+/g)
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
