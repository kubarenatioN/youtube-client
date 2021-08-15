import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { SortType } from '../../models/sort-options.model'
import {
  ISortButtonsClasses,
  SortbarManagerService,
} from '../../services/sortbar-manager.service'

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss'],
})
export class SortComponent implements OnInit, OnDestroy {
  isVisible!: boolean

  get classes(): ISortButtonsClasses {
    return this.sortService.classes
  }

  private sortVisibilitySubscr!: Subscription

  constructor(private sortService: SortbarManagerService) {}

  ngOnInit(): void {
    this.sortVisibilitySubscr = this.sortService.sortVisibility$.subscribe(
      isVisible => {
        this.isVisible = isVisible
      }
    )
  }

  setSortType(sortType: SortType) {
    this.sortService.setSortOptions(sortType)
  }

  setFilterByWord() {
    this.sortService.setSortOptions(SortType.KeyWord)
  }

  onFilterInput(e: Event) {
    const keywords = (e.target as HTMLInputElement).value
    this.sortService.setKeywords(keywords)
  }

  ngOnDestroy() {
    this.sortVisibilitySubscr.unsubscribe()
  }
}
