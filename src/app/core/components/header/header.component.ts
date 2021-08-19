import { Component, OnInit } from '@angular/core'
import { Event, NavigationEnd, Router, RouterEvent } from '@angular/router'
import { filter } from 'rxjs/operators'
import { LoginService } from 'src/app/auth/services/login.service'
import { SearchService } from 'src/app/youtube/services/search.service'
import { SortbarManagerService } from 'src/app/youtube/services/sortbar-manager.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isSearchPage!: boolean

  query = ''

  isUserLogged!: boolean

  constructor(
    private sortService: SortbarManagerService,
    private searchService: SearchService,
    private loginService: LoginService,
    private router: Router
  ) {
    router.events
      .pipe(filter((e: Event): e is RouterEvent => e instanceof NavigationEnd))
      .subscribe((e: RouterEvent) => {
        // console.log('router event', e.url)
        this.isSearchPage = e.url === '/search'
      })
  }

  ngOnInit() {
    this.isSearchPage = this.router.url === '/search'
    this.loginService.isUserLogged$.subscribe(isLogged => {
      this.isUserLogged = isLogged
    })
  }

  toggleSort() {
    this.sortService.onToggle(!this.sortService.isSortVisible)
  }

  onSearch() {
    if (this.query.length > 2 && this.isSearchPage) {
      this.searchService.getVideos(this.query)
    }
  }

  get username() {
    return this.loginService.currentUser?.login || 'Your name'
  }

  logoutUser() {
    this.loginService.removeUser()
  }

  navigateToLoginPage() {
    this.router.navigate(['login'])
  }
}
