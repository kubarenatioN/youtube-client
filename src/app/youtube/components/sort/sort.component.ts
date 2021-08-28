import { Component } from '@angular/core'
import { Subscription } from 'rxjs'
import { SortType } from '../../models/sort-options.model'
import {
  ISortButtonsClasses,
  SortbarManagerService
} from '../../services/sortbar-manager.service'

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent {
  sortVisibility$ = this.sortService.sortVisibility$

  sortType = SortType

  get classes(): ISortButtonsClasses {
    return this.sortService.classes
  }

  private sortVisibilitySubscription!: Subscription

  constructor(private sortService: SortbarManagerService) {}

  setSortType(sortType: SortType): void {
    this.sortService.setSortOptions(sortType)
  }

  setFilterByWord(): void {
    this.sortService.setFilterOptions(SortType.KeyWord)
  }

  onFilterInput(e: Event): void {
    const keywords = (e.target as HTMLInputElement).value
    this.sortService.setKeywords(keywords)
  }
}
