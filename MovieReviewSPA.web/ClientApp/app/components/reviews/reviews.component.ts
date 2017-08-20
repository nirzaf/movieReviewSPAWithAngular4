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
    review: Review = new Review();
    allReviews;
    filter: any = {};

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
            this.reviews = this.allReviews= reviews;
            this.toastyService.success({
                title: 'Success',
                msg: 'Reviewes fetched successfully!',
                theme: 'bootstrap',
                showClose: true,
                timeout: 5000
            });
        });

    }
    delete(id) {
        if (confirm("Are you sure, you want delete review?")) {
            this.reviewsService.deleteReview(id)
                .subscribe(x => {
                        this.toastyService.success({
                            title: 'Success',
                            msg: 'Review Deleted!',
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
                            msg: 'An unexpected error while deleting the record!',
                            theme: 'bootstrap',
                            showClose: true,
                            timeout: 5000
                        });
                    });
        }
    }

    onDropdownChange() {
        var reviews = this.allReviews;
        if (this.filter.reviewerRating) {
            reviews = reviews.filter(r => r.reviewerRating == this.filter.reviewerRating);
        }
        this.reviews = reviews;
    }
    onResetFilter() {
        this.filter = {};
        this.onDropdownChange();
    }

}
