import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {getLeagues, State} from "./shared/reducers";
import {LeagueService} from "./shared/services/league.service";
import {League, LeagueType} from "./shared/models/league";
import {Observable} from "rxjs";
import {NavigationStart, Router} from "@angular/router";

declare var $: any;

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

  constructor(
    private store: Store<State>,
    private router: Router,
    private leagueService: LeagueService) {
    this.leagues = store.select(getLeagues);
  }

  public ngOnInit() {
    this.leagueService.loadLeagues();

    this.router.events.subscribe(value => {
      if(value instanceof NavigationStart) {
        window.scroll({
          'left': 0,
          'top': 0,
          'behavior': 'smooth'
        });
      }
    });

    $(window).resize(function() {
      var $this = $(this),
        w = $this.width();

      if ( w > 768 ) {
        if ( $('body').hasClass('offcanvas-menu') ) {
          $('body').removeClass('offcanvas-menu');
        }
      }
    });

    $(document).mouseup(function(e) {
      var container = $(".site-mobile-menu");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ( $('body').hasClass('offcanvas-menu') ) {
          $('body').removeClass('offcanvas-menu');
        }
      }
    });
  }

  public toggleMenu() {
    if($('body').hasClass('offcanvas-menu')) {
      $('body').removeClass('offcanvas-menu');
      this.menuOpened = true;
    } else {
      $('body').addClass('offcanvas-menu');
      this.menuOpened = false;
    }
  }

  public get LeagueType() {
    return LeagueType;
  }
}
