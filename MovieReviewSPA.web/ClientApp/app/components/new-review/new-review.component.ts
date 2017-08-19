import * as Raven from 'raven-js';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReviewsService } from '../../services/reviews.service';
import { Review } from './../../models/review';
import { ToastyService } from "ng2-toasty";

@Component({
  selector: 'app-new-review',
  templateUrl: './new-review.component.html',
  styleUrls: ['./new-review.component.css']
})
export class NewReviewComponent implements OnInit {

  review:Review=new Review();
  constructor(private reviewsService: ReviewsService, private toastyService: ToastyService) { }

  ngOnInit() {
  }

}
