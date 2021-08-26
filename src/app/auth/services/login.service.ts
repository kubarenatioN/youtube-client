import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { delay } from 'rxjs/operators'
import { IUser } from '../models/user.model'

const LOCAL_STORAGE_USER = 'user'

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private currentUser = this.getUser()

  private user$$ = new Subject<IUser | null>()

  user$ = this.user$$.pipe(delay(1000))

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
  }

  removeUser(): void {
    localStorage.removeItem(LOCAL_STORAGE_USER)
    this.currentUser = null
    this.user$$.next(null)
  }

  get isUserLogged(): boolean {
    return !!this.currentUser
  }

  get username(): string | undefined {
    return this.currentUser?.login
  }
}
