import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { SearchComponent } from './pages/search/search.component'
import { CatalogComponent } from './components/catalog/catalog.component'
import { SortComponent } from './components/sort/sort.component'
import { VideoItemComponent } from './components/video-item/video-item.component'
import { DetailsComponent } from './pages/details/details.component'
import { SharedModule } from '../shared/shared.module'
import { YoutubeRoutingModule } from './youtube-routing.module'
import { StatsComponent } from './components/stats/stats.component'
import { DetailsCardComponent } from './components/details-card/details-card.component'

@NgModule({
  declarations: [
    SearchComponent,
    CatalogComponent,
    SortComponent,
    VideoItemComponent,
    DetailsComponent,
    StatsComponent,
    DetailsCardComponent,
  ],
  imports: [SharedModule, YoutubeRoutingModule, FormsModule],
  exports: [SearchComponent],
})
export class YoutubeModule {}
