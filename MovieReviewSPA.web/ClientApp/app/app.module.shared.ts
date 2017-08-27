import * as Raven from 'raven-js';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserXhr } from '@angular/http';
import { ToastyModule } from 'ng2-toasty';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { MoviesComponent } from './components/movies/movies.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { NewMovieComponent } from './components/new-movie/new-movie.component';
import { EditMovieComponent } from './components/edit-movie/edit-movie.component';
import { NewReviewComponent } from './components/new-review/new-review.component';
import { EditReviewComponent } from './components/edit-review/edit-review.component';
import { PaginationComponent } from './components/utilities/pagination.component';
import { DetailViewComponent } from './components/detail-view/detail-view.component';
import { MoviesService } from './services/movies.service';
import { ReviewsService } from './services/reviews.service';
import { ImagesService } from './services/images.service';
import { AuthService } from './services/auth.service';
import { ProgressService, BrowserXHRService } from './services/progress.service';


Raven
    .config('https://7579eaef4acc46bab3ffd87d3d85f3ea@sentry.io/203240')
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
        DetailViewComponent
    ],
    imports: [
        FormsModule,
        ToastyModule.forRoot(),
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'movies', component: MoviesComponent },
            { path: 'movies/new', component: NewMovieComponent },
            { path: 'movies/:id', component: EditMovieComponent },
            { path: 'movies/detail/:id', component: DetailViewComponent },
            { path: 'reviews/:id', component: ReviewsComponent },
            { path: 'editreview/:id', component: EditReviewComponent },
            { path: 'reviews/new/:id', component: NewReviewComponent },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        MoviesService,
        ReviewsService,
        ImagesService,
        AuthService
     //   { provide: BrowserXhr, useValue: BrowserXHRService },
       // ProgressService
    ]
        
    
};
