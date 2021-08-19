import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { of } from 'rxjs'
import { tap } from 'rxjs/operators'
import { IHttpConfig } from '../models/http-config.model'

@Injectable({
  providedIn: 'root',
})
export class HttpConfigService {
  private configUrl = './assets/config.json'

  config?: IHttpConfig

  constructor(private http: HttpClient) {}

  getConfig() {
    return this.config
      ? of(this.config)
      : this.http.get<IHttpConfig>(`${this.configUrl}`).pipe(
          tap(conf => {
            console.log('get config once.')
            this.config = conf
          })
        )
  }
}
