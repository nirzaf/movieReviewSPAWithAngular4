import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { sharedConfig } from './app.module.shared';
import { MoviesComponent } from './components/movies/movies.component';
import { MoviesService } from './services/movies.service';
import { ReviewsService } from './services/reviews.service';
import { ImagesService } from './services/images.service';
import { NewMovieComponent } from './components/new-movie/new-movie.component';
import { EditMovieComponent } from './components/edit-movie/edit-movie.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { NewReviewComponent } from './components/new-review/new-review.component';
import { EditReviewComponent } from './components/edit-review/edit-review.component';
import { PaginationComponent } from './components/utilities/pagination.component';
import { DetailViewComponent } from './components/detail-view/detail-view.component';




@NgModule({
    bootstrap: sharedConfig.bootstrap,
    declarations: [...sharedConfig.declarations,
        MoviesComponent,
        NewMovieComponent,
        EditMovieComponent,
        NotFoundComponent,
        ReviewsComponent,
        NewReviewComponent,
        EditReviewComponent,
        PaginationComponent,
        DetailViewComponent
],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ...sharedConfig.imports
    ],
    providers: [
        { provide: 'ORIGIN_URL', useValue: location.origin },
        MoviesService,
        ReviewsService,
        ImagesService
    ]
})
export class AppModule {
}
