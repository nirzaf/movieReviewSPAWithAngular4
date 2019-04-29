import { Injectable } from '@angular/core';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import Auth0Lock from 'auth0-lock';



// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class AuthService {
    profile: any;

    private roles: string[] = [];
    lock = new Auth0Lock('HwTjSrCFV320gGkuhZ2KiT861miuXMh1', 'movie-review.auth0.com', {});

    constructor() {
        this.profile = JSON.parse(localStorage.getItem('profile'));
        var token = localStorage.getItem('token');
        
        if (token && token.length > 25) {
            var jwtObj = new JwtHelper();
            var decodedToken = jwtObj.decodeToken(token);
            this.roles = decodedToken['https://movie-review.com/roles'];
        }

        // Add callback for lock `authenticated` event
        this.lock.on('authenticated', (authResult) => {
            localStorage.setItem('token', authResult.accessToken);
            //Decoding token
            var jwtObj = new JwtHelper();
            var decodedToken = jwtObj.decodeToken(authResult.accessToken);
            this.roles = decodedToken['https://movie-review.com/roles'];
            console.log("Roles:- ", this.roles);
            this.lock.getUserInfo(authResult.accessToken,
                (error, profile) => {
                    if (error)
                        throw error;

                    console.log(profile);
                    localStorage.setItem('profile', JSON.stringify(profile));
                    this.profile = profile;
                });
        });
    }

    public isInRole(roleName) {
        return this.roles.indexOf(roleName) > -1;
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
        localStorage.removeItem('profile');
        this.profile = null;
        this.roles = [];
    };
}
