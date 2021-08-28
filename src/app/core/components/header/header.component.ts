import { Component, OnInit } from '@angular/core'
import { Event, NavigationEnd, Router, RouterEvent } from '@angular/router'
import { filter } from 'rxjs/operators'
import { LoginService } from 'src/app/auth/services/login.service'
import { SearchService } from 'src/app/youtube/services/search.service'
import { SortbarManagerService } from 'src/app/youtube/services/sortbar-manager.service'

const MIN_CHARS_TO_START_SEARCHING = 3

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isSearchPage = false

  query = ''

  user$ = this.loginService.user$

  constructor(
    private sortService: SortbarManagerService,
    private searchService: SearchService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isSearchPage = this.router.url === '/search'
    this.router.events
      .pipe(filter((e: Event): e is RouterEvent => e instanceof NavigationEnd))
      .subscribe((e: RouterEvent) => {
        this.isSearchPage = (e as NavigationEnd).urlAfterRedirects === '/search'
      })
  }

  toggleSort(): void {
    this.sortService.toggle()
  }

  onSearch(): void {
    if (
      this.query.length >= MIN_CHARS_TO_START_SEARCHING &&
      this.isSearchPage
    ) {
      this.searchService.getVideos(this.query)
    }
  }

  get username(): string {
    return this.loginService.username || 'Your name'
  }

  logoutUser(): void {
    this.loginService.removeUser()
  }

  navigateToLoginPage(): void {
    this.router.navigate(['login'])
  }
}
