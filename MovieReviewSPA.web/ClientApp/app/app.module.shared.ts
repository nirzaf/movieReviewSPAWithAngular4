import * as Raven from "raven-js";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ToastyModule } from "ng2-toasty";
import { AUTH_PROVIDERS } from 'angular2-jwt/angular2-jwt';
import { AppComponent } from "./components/app/app.component"
import { NavMenuComponent } from "./components/navmenu/navmenu.component";
import { HomeComponent } from "./components/home/home.component";
import { FetchDataComponent } from "./components/fetchdata/fetchdata.component";
import { CounterComponent } from "./components/counter/counter.component";
import { MoviesComponent } from "./components/movies/movies.component";
import { ReviewsComponent } from "./components/reviews/reviews.component";
import { NewMovieComponent } from "./components/new-movie/new-movie.component";
import { EditMovieComponent } from "./components/edit-movie/edit-movie.component";
import { NewReviewComponent } from "./components/new-review/new-review.component";
import { EditReviewComponent } from "./components/edit-review/edit-review.component";
import { PaginationComponent } from "./components/utilities/pagination.component";
import { DetailViewComponent } from "./components/detail-view/detail-view.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { MoviesService } from "./services/movies.service";
import { ReviewsService } from "./services/reviews.service";
import { ImagesService } from "./services/images.service";
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./services/auth-guard.service";
import { AdminAuthGuard } from "./services/admin-auth-guard.service";



Raven
    .config("https://7579eaef4acc46bab3ffd87d3d85f3ea@sentry.io/203240")
    .install();

export const sharedConfig: NgModule = {
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        MoviesComponent,
        NewMovieComponent,
        EditMovieComponent,
        ReviewsComponent,
        NewReviewComponent,
        EditReviewComponent,
        PaginationComponent,
        DetailViewComponent,
        NotFoundComponent,
        NotAuthorizedComponent
    ],
    imports: [
        FormsModule,
        ToastyModule.forRoot(),
        RouterModule.forRoot([
            { path: "", redirectTo: "home", pathMatch: "full" },
            { path: "movies", component: MoviesComponent },
            { path: "movies/new", component: NewMovieComponent, canActivate: [AdminAuthGuard] },
            { path: "movies/:id", component: EditMovieComponent },
            { path: "movies/detail/:id", component: DetailViewComponent },
            { path: "reviews/:id", component: ReviewsComponent },
            { path: "editreview/:id", component: EditReviewComponent },
            { path: "reviews/new/:id", component: NewReviewComponent },
            { path: "home", component: HomeComponent },
            { path: "counter", component: CounterComponent },
            { path: "fetch-data", component: FetchDataComponent },
            { path: "pageNotFound", component: NotFoundComponent, data: { title: "Page not found" } },
            { path: "notAuthorized", component: NotAuthorizedComponent, data: { title: "Not Authorized" } },
            { path: "**", redirectTo: "pageNotFound", pathMatch: "full" }
            /*{ path: '**', redirectTo: 'home' }*/
        ])
    ],
    providers: [
        MoviesService,
        ReviewsService,
        ImagesService,
        AuthService,
        AuthGuard,
        AdminAuthGuard,
        AUTH_PROVIDERS
     ]
        
    
};
