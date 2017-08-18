import * as Raven from 'raven-js';
import { Component, OnInit } from '@angular/core';
import { ReviewsService } from '../../services/reviews.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService } from "ng2-toasty";
import { Review } from './../../models/review';


@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

    reviews;
    review: Review= new Review();

    constructor(private reviewsService: ReviewsService,
        private route: ActivatedRoute,
        private router: Router,
        private toastyService: ToastyService) {
        route.params.subscribe(p => {
            this.review.movieId = +p['id'];
        });
    }

    ngOnInit() {
        this.reviewsService.getReviewById(this.review.movieId).subscribe(reviews => {
            this.reviews = reviews;
            console.log("Reviews:- ", this.reviews);
        });

  }

}
