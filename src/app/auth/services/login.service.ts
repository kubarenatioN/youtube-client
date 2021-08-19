import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, Observable } from 'rxjs'
import { IUser } from '../models/user.model'

const LOCAL_STORAGE_TOKEN = 'user'

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  currentUser?: IUser

  isUserLogged$ = new Observable<boolean>()

  private isUserLogged$$ = new BehaviorSubject<boolean>(this.isUserLogged)

  get isUserLogged(): boolean {
    return !!this.currentUser
  }

  constructor(private router: Router) {
    this.currentUser = this.getUser()
    this.isUserLogged$ = this.isUserLogged$$.asObservable()
  }

  getUser() {
    const userString = localStorage.getItem(LOCAL_STORAGE_TOKEN)
    if (userString !== null) {
      return JSON.parse(userString)
    }
    return undefined
  }

  setUser(newUser: IUser) {
    setTimeout(() => {
      this.currentUser = newUser
      localStorage.setItem(
        LOCAL_STORAGE_TOKEN,
        JSON.stringify(this.currentUser)
      )
      this.isUserLogged$$.next(true)
      this.router.navigate(['search'])
    }, 1000)
  }

  removeUser() {
    setTimeout(() => {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN)
      this.currentUser = undefined
      this.isUserLogged$$.next(false)
      this.router.navigate(['login'])
    }, 1000)
  }
}
