import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'

import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component'
import { HeaderComponent } from './components/header/header.component'
import { DateHighlighterDirective } from './directives/date-highlighter.directive'
import { FilterByKeywordPipe } from './pipes/filter-by-keyword.pipe'
import { SortPipe } from './pipes/sort.pipe'
import { SortComponent } from './components/search/sort/sort.component'
import { CatalogComponent } from './components/search/catalog/catalog.component'
import { SearchItemComponent } from './components/search/search-item/search-item.component'
import { SearchComponent } from './components/search/search.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SortComponent,
    CatalogComponent,
    SearchItemComponent,
    SearchComponent,
    DateHighlighterDirective,
    FilterByKeywordPipe,
    SortPipe,
  ],
  imports: [BrowserModule, RouterModule.forRoot([]), HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
