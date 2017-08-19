import * as Raven from 'raven-js';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from './../../models/review';
import { ReviewsService } from '../../services/reviews.service';
import { ToastyService } from "ng2-toasty";


@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.css']
})
export class EditReviewComponent implements OnInit {

    review: Review = new Review();
    constructor(private route: ActivatedRoute,
        private router: Router,
        private reviewsService: ReviewsService,
        private toastyService: ToastyService) {

        route.params.subscribe(p => {
            this.review.id = +p['id'];
        });
    }

    ngOnInit() {
        if (this.review.id) {
            this.reviewsService.editReview(this.review.id)
                .subscribe(m => {
                    this.review = m;
                        console.log("Review:-", this.review);
                    },
                    err => {
                        if (err.status == 404) {
                            this.router.navigate(['/movies']);
                        }
                    });
        }
  }

}
