import { Injectable } from '@angular/core';
import { AuthGuard } from '../services/auth-guard.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AdminAuthGuard extends AuthGuard {

    constructor(auth: AuthService, private router:Router) { super(auth); }

    //Here, we can check whether user is logged in or not
    canActivate() {
        //Called the base class canActivate method
        var isAuthenticated = super.canActivate();
        //If it returns true, then need to check whether user is in right role
        return isAuthenticated ? this.auth.isInRole('Admin') : false;
    }
}