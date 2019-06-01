import {Injectable, Renderer2, RendererFactory2, RendererType2, ViewEncapsulation} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Endpoint} from '../constants/endpoints';
import {handleApiError} from "../utils/utils";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {State} from "../reducers";
import {environment} from "../../../environments/environment";
import {SetCurrentUserAction} from "../actions/user.actions";
import {User} from "../models/user";
import {Observable} from "rxjs";
import {share} from "rxjs/operators";

@Injectable()
export class AuthService {

  private renderer: Renderer2;

  private listener: Function;

  constructor(private http: HttpClient,
              private router: Router,
              private store: Store<State>,
              private rendererFactory: RendererFactory2) {
    const type: RendererType2 = {
      id: 'bh-fantasy-' + Math.random(),
      encapsulation: ViewEncapsulation.None,
      styles: [],
      data: null
    };

    this.renderer = rendererFactory.createRenderer(null, type);
  }

  signIn(event: any = null, type: string = 'facebook'): void {
    if (event) {
      event.preventDefault();
    }

    this.clearListener();

    const marginLeft = window.innerWidth * 0.1;
    const marginTop = window.innerHeight * 0.1;

    const pw = window.open(environment.apiUrl + '/login/' + type, '_blank',
      'width=' + (window.innerWidth - marginLeft * 2) + ',height=' + (window.innerHeight - marginTop * 2) + ',' +
      'toolbar=no,scrollbars=yes,resizable=yes,left=' + marginLeft + ',top=' + marginTop);
    this.setListener(this.renderer.listen('window', 'message', (ev) => {
      if (ev.data && typeof ev.data === 'string') {
        pw.close();

        localStorage.setItem("token", ev.data);

        this.loadUserInfo();
      }
    }));
  }

  loadUserInfo(): Observable<User> {
    const result = this.http
      .get<User>(Endpoint.USER.concat('/me')).pipe(share());

    result.subscribe(data => {
      this.store.dispatch(new SetCurrentUserAction(data));
    }, error => handleApiError(error, this.router));

    return result;
  }

  clearListener(): void {
    /* Clear listener */
    if (this.listener) {
      this.listener();
    }
  }

  setListener(listener): void {
    this.clearListener();
    this.listener = listener;
  }
}
