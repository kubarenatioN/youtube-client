import { Component, OnDestroy, OnInit } from '@angular/core'
import { Event, NavigationEnd, Router, RouterEvent } from '@angular/router'
import { LoginService } from 'src/app/auth/services/login.service'
import { SearchService } from 'src/app/youtube/services/search.service'
import { SortbarManagerService } from 'src/app/youtube/services/sortbar-manager.service'
import { filter } from 'rxjs/operators'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isSearchPage = false

  userSubscription!: Subscription

  constructor(
    private sortService: SortbarManagerService,
    private searchService: SearchService,
    private loginService: LoginService,
    private router: Router
  ) {
    router.events
      .pipe(filter((e: Event): e is RouterEvent => e instanceof NavigationEnd))
      .subscribe((e: RouterEvent) => {
        this.isSearchPage = e.url === '/search'
      })
  }

  ngOnInit(): void {
    this.isSearchPage = this.router.url === '/search'
    this.userSubscription = this.loginService.user$.subscribe(user => {
      if (user === null) {
        this.router.navigate(['login'])
      }
    })
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
  }

  toggleSort(): void {
    this.sortService.toggle()
  }

  onSearch(): void {
    this.searchService.getVideos()
  }

  get username(): string {
    return this.loginService.username || 'Your name'
  }

  logoutUser(): void {
    this.loginService.removeUser()
  }

  get isUserLogged(): boolean {
    return this.loginService.isUserLogged
  }
}
