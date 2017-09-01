import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(protected  auth: AuthService) { }

    //Here, we can check whether user is logged in or not
    canActivate() {
        if (this.auth.authenticated())
            return true;
        //else redirect user to login page
        window.location.href = "https://movie-review.auth0.com/login?client=HwTjSrCFV320gGkuhZ2KiT861miuXMh1";
        return false;
    }
    
}