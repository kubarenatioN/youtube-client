import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { ISortOptions, SortType } from '../../models/sort-options.model'
import { SearchService } from '../../services/search.service'
import {
  ISortButtonsStyles,
  SortbarManagerService,
} from '../../services/sortbar-manager.service'

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss'],
})
export class SortComponent implements OnInit {
  isVisible!: boolean

  classes!: ISortButtonsStyles

  // @Output() sort = new EventEmitter<ISortOptions>()

  constructor(
    private sortService: SortbarManagerService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.updateClasses()
    this.sortService.sortVisibility$.subscribe(isVisible => {
      this.isVisible = isVisible
    })
  }

  setSortType(sortType: SortType) {
    this.sortService.setSortOptions(sortType)
    this.updateClasses()
    this.onSort()
  }

  setFilterByWord() {
    // this.sortOptions.sort.type = SortType.KeyWord
    this.sortService.setSortOptions(SortType.KeyWord)
    this.updateClasses()
  }

  filterByWord(e: Event) {
    const keywords = (e.target as HTMLInputElement).value
    this.sortService.setKeywords(keywords)
    this.onSort()
  }

  private onSort() {
    this.searchService.emitSort()
    // this.sort.emit(this.sortService.getSortOptions())
  }

  private updateClasses(): void {
    this.classes = this.sortService.updateClasses()
  }
}
