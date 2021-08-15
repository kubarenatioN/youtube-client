import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { ISortOptions, SortOrder, SortType } from '../models/sort-options.model'

export interface ISortButtonsClasses {
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

  options$ = new Observable<ISortOptions>()

  private sortOptions: ISortOptions = {
    sort: {
      type: SortType.None,
      order: 'desc',
    },
    keywords: '',
  }

  private options$$ = new BehaviorSubject(this.sortOptions)

  constructor() {
    this.options$ = this.options$$.asObservable()
  }

  setSortOptions(sortType: SortType): void {
    const { type, order } = this.sortOptions.sort
    if (type === sortType) {
      this.sortOptions.sort.order = order === 'desc' ? 'asc' : 'desc'
    } else {
      this.sortOptions.sort.type = sortType
      this.sortOptions.sort.order = 'desc'
    }
    this.emitNewOptions()
  }

  setKeywords(keywords: string) {
    this.sortOptions.keywords = keywords
    this.emitNewOptions()
  }

  onToggle(isVisible: boolean): void {
    this.isSortVisible = isVisible
    this.sortVisibility$.next(this.isSortVisible)
  }

  get classes(): ISortButtonsClasses {
    return {
      activeDate: this.sortOptions.sort.type === SortType.Date,
      activeViewsCount: this.sortOptions.sort.type === SortType.ViewsCount,
      activeByKeywords: this.sortOptions.sort.type === SortType.KeyWord,
      order: this.sortOptions.sort.order,
    }
  }

  get options(): ISortOptions {
    return this.sortOptions
  }

  emitNewOptions() {
    this.options$$.next(this.sortOptions)
  }
}
