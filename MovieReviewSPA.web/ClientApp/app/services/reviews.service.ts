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
}
