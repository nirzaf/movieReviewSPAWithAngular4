import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MoviesService {

    //In order to use any injectable, pass it via ctor
    constructor(private http:Http) { }

    getMovies() {
        return this.http.get('/api/movies')
            //Once, we get the response back, it has to get mapped to json
            .map(res => res.json());
    }
}
