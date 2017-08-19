import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ReviewsService {

    constructor(private http: Http, @Inject('ORIGIN_URL') private originUrl: string) { }

    getReviewById(id) {
        return this.http.get(this.originUrl +'/api/moviereviews/' + id)
            .map(res => res.json());
    }

    createReview(id,review) {
        return this.http.post('/api/moviereviews/' +id, review)
            .map(res => res.json());
    }

    editReview(id) {
        return this.http.get('/api/moviereviews/GetByReviewId?id=' +id)
            .map(res => res.json());
    }
}
