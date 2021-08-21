import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { CanLoadUnauthGuard } from './core/guards/can-load-unauth.guard'
import { ErrorPageComponent } from './core/pages/error-page/error-page.component'

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  {
    path: 'search',
    loadChildren: () =>
      import('./youtube/youtube.module').then(m => m.YoutubeModule),
    canLoad: [CanLoadUnauthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  { path: '**', component: ErrorPageComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
