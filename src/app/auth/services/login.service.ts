import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, Observable } from 'rxjs'
import { delay } from 'rxjs/operators'
import { IUser } from '../models/user.model'

const LOCAL_STORAGE_USER = 'user'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUser = this.getUser()

  user$ = new Observable<IUser | null>()

  private user$$ = new BehaviorSubject<IUser | null>(this.currentUser)

  get isUserLogged(): boolean {
    return !!this.currentUser
  }

  get username(): string | null {
    return this.currentUser ? this.currentUser.login : null
  }

  constructor(private router: Router) {
    this.user$ = this.user$$.pipe(delay(500))
  }

  private getUser(): IUser | null {
    const userString = localStorage.getItem(LOCAL_STORAGE_USER)
    if (userString !== null) {
      return JSON.parse(userString) as IUser
    }
    return null
  }

  setUser(newUser: IUser): void {
    this.currentUser = newUser
    localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(this.currentUser))
    this.user$$.next(this.currentUser)
    this.router.navigate(['search'])
  }

  removeUser(): void {
    localStorage.removeItem(LOCAL_STORAGE_USER)
    this.currentUser = null
    this.user$$.next(this.currentUser)
    this.router.navigate(['login'])
  }
}
