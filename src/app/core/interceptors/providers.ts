import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { Provider } from '@angular/core'
import { UrlTransformerInterceptor } from './url-transformer.interceptor'

export const INTERCEPTOR_PROVIDERS: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: UrlTransformerInterceptor,
    multi: true
  }
]
