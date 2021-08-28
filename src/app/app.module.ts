import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { StoreModule } from '@ngrx/store'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CoreModule } from './core/core.module'
import { INTERCEPTOR_PROVIDERS } from './core/interceptors/providers'
import { customVideosReducer } from './redux/reducers/custom-videos.reducer'
import { videosReducer } from './redux/reducers/videos.reducer'
import { SharedModule } from './shared/shared.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    StoreModule.forRoot({
      videos: videosReducer,
      customVideos: customVideosReducer
    }),
    AppRoutingModule
  ],
  providers: [INTERCEPTOR_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule {}
