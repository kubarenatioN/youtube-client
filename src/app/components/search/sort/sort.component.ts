import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import {
  ISortOptions,
  SortOrder,
  SortType,
} from 'src/app/models/sort-options.model'

interface ISortButtonsClasses {
  activeDate: boolean
  activeViewsCount: boolean
  activeByKeywords: boolean
  order: SortOrder
}

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss'],
})
export class SortComponent implements OnInit {
  @Input() isVisible!: boolean

  @Output() sortVideos = new EventEmitter<ISortOptions>()

  private sortOptions: ISortOptions = {
    sort: {
      type: SortType.None,
      order: 'desc',
    },
    keywords: '',
  }

  ngOnInit(): void {
    this.sortVideos.emit(this.sortOptions)
  }

  onSort(type: SortType) {
    this.setSortType(type)
    this.sort()
  }

  onFilter() {
    this.sortOptions.sort.type = SortType.KeyWord
  }

  onFilterKeywordsChange(e: Event) {
    this.sortOptions.keywords = (e.target as HTMLInputElement).value
    this.sort()
  }

  private setSortType(sortType: SortType) {
    const { type, order } = this.sortOptions.sort
    if (type === sortType) {
      this.sortOptions.sort.order = order === 'desc' ? 'asc' : 'desc'
    } else {
      this.sortOptions.sort.type = sortType
      this.sortOptions.sort.order = 'desc'
    }
  }

  private sort() {
    this.sortVideos.emit(this.sortOptions)
  }

  get classes(): ISortButtonsClasses {
    return {
      activeDate: this.sortOptions.sort.type === SortType.Date,
      activeViewsCount: this.sortOptions.sort.type === SortType.ViewsCount,
      activeByKeywords: this.sortOptions.sort.type === SortType.KeyWord,
      order: this.sortOptions.sort.order,
    }
  }
}
