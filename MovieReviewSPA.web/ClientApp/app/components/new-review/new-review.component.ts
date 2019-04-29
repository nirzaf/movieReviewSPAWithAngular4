import * as Raven from 'raven-js';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReviewsService } from '../../services/reviews.service';
import { MoviesService } from '../../services/movies.service';
import { Review } from './../../models/review';
import { Movie } from './../../models/movie';
import { ToastyService } from "ng2-toasty";
import { Router, ActivatedRoute } from '@angular/router';   

@Component({
  selector: 'app-new-review',
  templateUrl: './new-review.component.html',
  styleUrls: ['./new-review.component.css']
})
export class NewReviewComponent implements OnInit {

    review: Review = new Review();
    movie: Movie = new Movie();
    constructor(private reviewsService: ReviewsService,
      private moviesService: MoviesService,
      private toastyService: ToastyService,
      private route: ActivatedRoute,
      private router: Router) {

      route.params.subscribe(p => {
          this.review.movieId = +p['id'];
      });
  }

    ngOnInit() {
        if (this.review.movieId) {
            this.moviesService.getMovie(this.review.movieId)
                .subscribe(m => {
                        this.movie = m;
                    },
                    err => {
                        if (err.status == 404) {
                            this.router.navigate(['/movies']);
                        }
                    });
        }
  }
    onSubmit(form: NgForm) {
        var formData = this.review;
        formData.id = 0;
        formData.reviewerName = this.review.reviewerName.toString();
        formData.reviewerComments = this.review.reviewerComments.toString();
        formData.reviewerRating = this.review.reviewerRating;
        formData.movieId = this.review.movieId;
        console.log(formData);
        this.reviewsService.createReview(this.review.movieId, formData)
            .subscribe(x => {
                    console.log(x);
                    this.toastyService.success({
                        title: 'Success',
                        msg: 'New Review Created!',
                        theme: 'bootstrap',
                        showClose: true,
                        timeout: 5000
                    });
                    this.router.navigate(['/movies']);
                },
                err => {
                    Raven.captureException(err.originalError || err);
                    this.toastyService.error({
                        title: 'Error',
                        msg: 'An unexpected error occured while creating new Review!',
                        theme: 'bootstrap',
                        showClose: true,
                        timeout: 5000
                    });
                });
    }
}
