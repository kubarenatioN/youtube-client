import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DetailsComponent } from './pages/details/details.component'
import { SearchComponent } from './pages/search/search.component'

const routes: Routes = [
  { path: '', component: SearchComponent, pathMatch: 'full' },
  { path: ':id', component: DetailsComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YoutubeRoutingModule {}
