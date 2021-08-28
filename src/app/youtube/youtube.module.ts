import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { SharedModule } from '../shared/shared.module'
import { CatalogComponent } from './components/catalog/catalog.component'
import { CustomItemComponent } from './components/custom-item/custom-item.component'
import { DetailsCardComponent } from './components/details-card/details-card.component'
import { SortComponent } from './components/sort/sort.component'
import { StatsComponent } from './components/stats/stats.component'
import { VideoItemComponent } from './components/video-item/video-item.component'
import { DetailsComponent } from './pages/details/details.component'
import { SearchComponent } from './pages/search/search.component'
import { YoutubeRoutingModule } from './youtube-routing.module'

@NgModule({
  declarations: [
    SearchComponent,
    CatalogComponent,
    SortComponent,
    VideoItemComponent,
    DetailsComponent,
    StatsComponent,
    DetailsCardComponent,
    CustomItemComponent
  ],
  imports: [SharedModule, YoutubeRoutingModule, FormsModule],
  exports: [SearchComponent]
})
export class YoutubeModule {}
