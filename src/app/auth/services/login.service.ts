import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { IUser } from '../models/user.model'

const LOCAL_STORAGE_TOKEN = 'user'

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  currentUser?: IUser

  constructor() {
    this.currentUser = this.getUser()
  }

  getUser() {
    const userString = localStorage.getItem(LOCAL_STORAGE_TOKEN)
    if (userString !== null) {
      return JSON.parse(userString)
    }
    return undefined
  }

  setUser(newUser: IUser): Observable<void> {
    return new Observable(observer => {
      setTimeout(() => {
        this.currentUser = newUser
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN,
          JSON.stringify(this.currentUser)
        )
        observer.next()
      }, 1000)
    })
  }

  removeUser() {
    return new Observable(observer => {
      setTimeout(() => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN)
        this.currentUser = undefined
        observer.next()
      }, 1000)
    })
  }

  get isUserLogged(): boolean {
    return !!this.currentUser
  }
}
