import {
  Component, EventEmitter, Input, OnInit, Output
} from '@angular/core';
import { ISortOptions, SortOrder, SortType } from 'src/app/models/sort-options.model';

interface ISortButtonsStyles {
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

  sortOptions: ISortOptions = {
    sort: {
      type: SortType.None,
      order: 'desc'
    },
    keywords: ''
  }

  classes!: ISortButtonsStyles

  ngOnInit(): void {
    this.updateClasses()
    this.sortVideos.emit(this.sortOptions)
  }

  setSortType(sortType: SortType) {
    const { type } = this.sortOptions.sort
    const { order } = this.sortOptions.sort
    if (type === sortType) {
      this.sortOptions.sort.order = order === 'desc'
        ? 'asc'
        : 'desc'
    } else {
      this.sortOptions.sort.type = sortType
      this.sortOptions.sort.order = 'desc'
    }
    this.updateClasses()
    this.onSort()
  }

  setFilterByWord() {
    this.sortOptions.sort.type = SortType.KeyWord
    this.updateClasses()
  }

  filterByWord(e: Event) {
    this.sortOptions.keywords = (e.target as HTMLInputElement).value
    this.onSort()
  }

  private onSort() {
    this.sortVideos.emit(this.sortOptions)
  }

  private updateClasses(): void {
    this.classes = {
      activeDate: this.sortOptions.sort.type === SortType.Date,
      activeViewsCount: this.sortOptions.sort.type === SortType.ViewsCount,
      activeByKeywords: this.sortOptions.sort.type === SortType.KeyWord,
      order: this.sortOptions.sort.order
    }
  }
}
