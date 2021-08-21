import { HttpClient, HttpContext, HttpContextToken } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators'
import { IHttpConfig } from '../models/http-config.model'

export const IS_CONFIG_REQUEST = new HttpContextToken<boolean>(() => false)

@Injectable({
  providedIn: 'root'
})
export class HttpConfigService {
  private configUrl = './assets/config.json'

  private config?: IHttpConfig

  constructor(private http: HttpClient) {}

  getConfig(): Observable<IHttpConfig> {
    return this.config
      ? of(this.config)
      : this.http
          .get<IHttpConfig>(`${this.configUrl}`, {
            context: new HttpContext().set(IS_CONFIG_REQUEST, true)
          })
          .pipe(
            tap(conf => {
              this.config = conf
            })
          )
  }

  get configObject(): IHttpConfig | undefined {
    return this.config
  }
}
