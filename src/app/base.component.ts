import {OnDestroy} from "@angular/core";

export class BaseComponent implements OnDestroy {
  protected subscriptions = [];

  ngOnDestroy() {
    if(this.subscriptions) {
      this.subscriptions.forEach(value => value.unsubscribe());
    }
  }
}
