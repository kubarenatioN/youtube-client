import { Injectable } from '@angular/core'
import { CanDeactivate, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'

export interface CanLeaveComponent {
  canLeave(): Observable<boolean> | Promise<boolean> | boolean
}

@Injectable({
  providedIn: 'root'
})
export class LoginLeaveGuard implements CanDeactivate<CanLeaveComponent> {
  canDeactivate(
    component: CanLeaveComponent
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return component.canLeave()
  }
}
