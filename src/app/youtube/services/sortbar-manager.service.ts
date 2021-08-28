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
  providedIn: 'root'
})
export class SortbarManagerService {
  sortVisibility$!: Observable<boolean>

  private sortVisibility$$ = new BehaviorSubject<boolean>(false)

  private sortOptions: ISortOptions = {
    sort: {
      type: SortType.None,
      order: 'desc'
    },
    keywords: ''
  }

  options$ = new Observable<ISortOptions>()

  private options$$ = new BehaviorSubject(this.sortOptions)

  constructor() {
    this.sortVisibility$ = this.sortVisibility$$.asObservable()
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

  setFilterOptions(type: SortType): void {
    this.sortOptions.sort.type = type
    this.sortOptions.keywords = ''
    this.emitNewOptions()
  }

  setKeywords(keywords: string): void {
    this.sortOptions.keywords = keywords
    this.emitNewOptions()
  }

  toggle(): void {
    this.sortVisibility$$.next(!this.sortVisibility$$.value)
  }

  get classes(): ISortButtonsClasses {
    return {
      activeDate: this.sortOptions.sort.type === SortType.Date,
      activeViewsCount: this.sortOptions.sort.type === SortType.ViewsCount,
      activeByKeywords: this.sortOptions.sort.type === SortType.KeyWord,
      order: this.sortOptions.sort.order
    }
  }

  get options(): ISortOptions {
    return this.sortOptions
  }

  emitNewOptions(): void {
    this.options$$.next(this.sortOptions)
  }
}
