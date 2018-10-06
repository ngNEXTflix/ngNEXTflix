import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'plb-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // #CTOR#
  constructor(private _router:Router) {}

  // #Public Methods#
  public isAdmin() : boolean {
    return this._router.url.indexOf('admin') !== -1;
  }
}
