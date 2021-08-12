import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { ISortOptions, SortOrder, SortType } from '../models/sort-options.model'

export interface ISortButtonsStyles {
  activeDate: boolean
  activeViewsCount: boolean
  activeByKeywords: boolean
  order: SortOrder
}

@Injectable({
  providedIn: 'root',
})
export class SortbarManagerService {
  isSortVisible = false

  sortVisibility$ = new BehaviorSubject<boolean>(this.isSortVisible)

  classes!: ISortButtonsStyles

  private sortOptions: ISortOptions = {
    sort: {
      type: SortType.None,
      order: 'desc',
    },
    keywords: '',
  }

  constructor() {
    this.classes = this.updateClasses()
  }

  setSortOptions(sortType: SortType): void {
    const { type } = this.sortOptions.sort
    const { order } = this.sortOptions.sort
    if (type === sortType) {
      this.sortOptions.sort.order = order === 'desc' ? 'asc' : 'desc'
    } else {
      this.sortOptions.sort.type = sortType
      this.sortOptions.sort.order = 'desc'
    }
  }

  setKeywords(keywords: string) {
    this.sortOptions.keywords = keywords
  }

  onToggle(isVisible: boolean): void {
    this.isSortVisible = isVisible
    this.sortVisibility$.next(this.isSortVisible)
  }

  updateClasses(): ISortButtonsStyles {
    this.classes = {
      activeDate: this.sortOptions.sort.type === SortType.Date,
      activeViewsCount: this.sortOptions.sort.type === SortType.ViewsCount,
      activeByKeywords: this.sortOptions.sort.type === SortType.KeyWord,
      order: this.sortOptions.sort.order,
    }
    return this.classes
  }

  getSortOptions(): ISortOptions {
    return this.sortOptions
  }
}
