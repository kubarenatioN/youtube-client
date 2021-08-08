import { Component, Input, ViewChild } from '@angular/core'
import { CatalogComponent } from './catalog/catalog.component'
import { SearchService } from './search.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Input() isSortActive!: boolean

  @ViewChild(CatalogComponent)
  private catalog!: CatalogComponent

  constructor(private searchService: SearchService) {}

  onSearch() {
    this.searchService.videos.subscribe(data => {
      // console.log('search:', data)
      this.catalog.setData(data.items)
    })
  }
}
