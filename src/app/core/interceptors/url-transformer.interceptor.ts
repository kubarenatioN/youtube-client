import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import {
  HttpConfigService,
  IS_CONFIG_REQUEST
} from 'src/app/shared/services/http-config.service'

@Injectable()
export class UrlTransformerInterceptor implements HttpInterceptor {
  constructor(private configService: HttpConfigService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const isConfig = req.context.get(IS_CONFIG_REQUEST)
    if (isConfig) {
      return next.handle(req)
    }
    const config = this.configService.configObject!
    const newReq = req.clone({
      url: `${config.youtubeApiBase}${req.url}`,
      setParams: {
        key: config.apiKey
      }
    })
    return next.handle(newReq)
  }
}
