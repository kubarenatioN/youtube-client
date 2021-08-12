import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs'

export interface CanLeaveComponent {
  canLeave(): Observable<boolean> | Promise<boolean> | boolean
}

@Injectable({
  providedIn: 'root',
})
export class LoginLeaveGuard implements CanDeactivate<CanLeaveComponent> {
  canDeactivate(
    component: CanLeaveComponent,
    activatedRoute: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // console.log('can leave?', component.canLeave())
    // console.log(activatedRoute)
    // console.log(router)
    return component.canLeave()
  }
}
