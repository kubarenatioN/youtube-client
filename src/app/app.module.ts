import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './header/profile/profile.component';
import { SortComponent } from './search/sort/sort.component';
import { CatalogComponent } from './search/catalog/catalog.component';
import { SearchItemComponent } from './search/search-item/search-item.component';
import { SearchComponent } from './search/search.component';
import { DateHighlighterDirective } from './directives/date-highlighter.directive';
import { FilterByKeywordPipe } from './pipes/filter-by-keyword.pipe';
import { SortPipe } from './pipes/sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileComponent,
    SortComponent,
    CatalogComponent,
    SearchItemComponent,
    SearchComponent,
    DateHighlighterDirective,
    FilterByKeywordPipe,
    SortPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
