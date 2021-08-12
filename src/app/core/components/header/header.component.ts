import { Component, OnInit } from '@angular/core'
import { Event, NavigationEnd, Router, RouterEvent } from '@angular/router'
import { LoginService } from 'src/app/auth/services/login.service'
import { SearchService } from 'src/app/youtube/services/search.service'
import { SortbarManagerService } from 'src/app/youtube/services/sortbar-manager.service'
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // @Output() changeSortVisibility = new EventEmitter<boolean>()

  // @Output() search = new EventEmitter()

  isSearchPage!: boolean

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
  }

  toggleSort() {
    this.sortService.onToggle(!this.sortService.isSortVisible)
    // this.sortService.isSortVisible = this.isSortActive
    // this.changeSortVisibility.emit(this.isSortActive)
  }

  onSearch() {
    this.searchService.getVideos()
  }

  getUsername() {
    return this.loginService.currentUser?.login || 'Your name'
  }

  logoutUser() {
    this.loginService.removeUser().subscribe(() => {
      this.router.navigate(['login'])
    })
  }

  get checkUserLogged() {
    return this.loginService.isUserLogged
  }
}
