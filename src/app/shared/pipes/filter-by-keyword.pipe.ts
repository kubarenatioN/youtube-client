import { Pipe, PipeTransform } from '@angular/core'
import {
  ISortOptions,
  SortType,
} from 'src/app/youtube/models/sort-options.model'
import { IVideoItem } from 'src/app/youtube/models/video-item.model'

@Pipe({
  name: 'filterByKeyword',
})
export class FilterByKeywordPipe implements PipeTransform {
  transform(value: IVideoItem[], options: ISortOptions): IVideoItem[] {
    // console.log(value, options);
    if (options.sort.type !== SortType.KeyWord) return value
    return value.filter(el =>
      el.snippet.title
        .toLowerCase()
        .split(' ')
        .some(word =>
          options.keywords
            .trim()
            .toLowerCase()
            .split(' ')
            .some(w => word.includes(w))
        )
    )
  }
}
