import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
    selector: 'app-header',
    template: `
        <header class="row">
            <nav class="col-md-8 col-md-offset-2">
              <ul class="nav nav-pills">
                <li routerLinkActive="active"><a [routerLink]="['/messages']">Messenger</a></li>
                <li routerLinkActive="active"><a [routerLink]="['/auth']">Authentication</a></li>
                <div class="pull-right" *ngIf="userName">Welcome, {{ userName }}!</div> 
              </ul>
            </nav>
        </header>
    `
})
export class HeaderComponent implements OnInit {

    constructor(private authService: AuthService) {    }

    userName: string = localStorage.getItem('userName');

    ngOnInit() {
       this.authService.userName.subscribe(
         (userName) => this.userName = userName
       )
    }
}