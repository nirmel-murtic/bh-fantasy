import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {getCurrentUser, getLeagues, State} from "./shared/reducers";
import {LeagueService} from "./shared/services/league.service";
import {League, LeagueType} from "./shared/models/league";
import {Observable} from "rxjs";
import {NavigationStart, Router} from "@angular/router";
import {DOCUMENT} from "@angular/common";
import {AuthService} from "./shared/services/auth.service";
import {User} from "./shared/models/user";
import {SetCurrentUserAction} from "./shared/actions/user.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bh-fantasy';

  public leagues: Observable<League[]>;

  public expandedIndices = new Map();

  public menuOpened = false;

  public user: User;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private store: Store<State>,
    private router: Router,
    private authService: AuthService,
    private leagueService: LeagueService) {
    this.leagues = store.select(getLeagues);
  }

  public ngOnInit() {
    this.leagueService.loadLeagues();

    this.router.events.subscribe(value => {
      if(value instanceof NavigationStart) {
        if(!/\/leagues\/\d*\/rounds\/\d*$/gm.test(value.url)) {
          window.scroll({
            'left': 0,
            'top': 0,
            'behavior': 'smooth'
          });
        }

        this.closeMenu();
      }
    });

    if(localStorage.token) {
      this.authService.loadUserInfo();
    }

    this.store.select(getCurrentUser).subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    delete localStorage.token;

    this.store.dispatch(new SetCurrentUserAction(null));
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event) {
    if(event.target.className === 'site-wrap') {
      if ( this.document.body.classList.contains('offcanvas-menu') ) {
        this.document.body.classList.remove('offcanvas-menu');
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if ( event.target.innerWidth > 768 ) {
      if ( this.document.body.classList.contains('offcanvas-menu') ) {
        this.document.body.classList.remove('offcanvas-menu');
      }
    }

    event.target.innerWidth;
  }

  private closeMenu() {
    if (this.document.body.classList.contains('offcanvas-menu') ) {
      this.document.body.classList.remove('offcanvas-menu');

      this.menuOpened = false;
    }
  }

  public toggleMenu() {
    if(this.document.body.classList.contains('offcanvas-menu')) {
      this.document.body.classList.remove('offcanvas-menu');
      this.menuOpened = true;
    } else {
      this.document.body.classList.add('offcanvas-menu');
      this.menuOpened = false;
    }
  }

  public get LeagueType() {
    return LeagueType;
  }
}
