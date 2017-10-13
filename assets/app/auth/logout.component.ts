import { Component } from '@angular/core';

@Component({
    selector: 'app-logout',
    template: `
        <div class="col-md-8 col-md-offset-2">
            <button class="btn btn-danger" (click)="onLogout()"> Log Out</button>
        </div>
    `
})
export class LogoutComponent {
    onLogout() {

    }
}