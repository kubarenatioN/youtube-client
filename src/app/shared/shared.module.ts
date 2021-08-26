import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { DateHighlighterDirective } from './directives/date-highlighter.directive'
import { FilterByKeywordPipe } from './pipes/filter-by-keyword.pipe'
import { SortPipe } from './pipes/sort.pipe'

@NgModule({
  declarations: [DateHighlighterDirective, FilterByKeywordPipe, SortPipe],
  imports: [CommonModule, RouterModule],
  exports: [
    CommonModule,
    DateHighlighterDirective,
    FilterByKeywordPipe,
    SortPipe,
  ],
})
export class SharedModule {}
