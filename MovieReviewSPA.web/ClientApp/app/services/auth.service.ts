import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import Auth0Lock from 'auth0-lock';
/*import { myConfig } from './auth.config';*/

// Avoid name not found warnings
//declare var Auth0Lock: any;

@Injectable()
export class AuthService {
    lock = new Auth0Lock('HwTjSrCFV320gGkuhZ2KiT861miuXMh1', 'movie-review.auth0.com',{});

    constructor() {
        // Add callback for lock `authenticated` event
        this.lock.on('authenticated', (authResult) => {
            console.log(authResult);
            localStorage.setItem('token', authResult.accessToken);
        });
    }

    public login() {
        // Call the show method to display the widget.
        this.lock.show();
    };

    public authenticated() {
        // Check if there's an unexpired JWT
        // It searches for an item in localStorage with key == 'token'
        return tokenNotExpired('token');
    };

    public logout() {
        // Remove token from localStorage
        localStorage.removeItem('token');
    };
}
