import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MoviesService {

    //In order to use any injectable, pass it via ctor
    constructor(private http: Http, @Inject('ORIGIN_URL') private originUrl: string) { }

    getMovies() {
        return this.http.get(this.originUrl+'/api/movies')
            //Once, we get the response back, it has to get mapped to json
            .map(res => res.json());
    }

    createMovie(movie) {
        return this.http.post('/api/movies', movie)
            .map(res => res.json());
    }

    getMovie(id) {
        return this.http.get('/api/movies/' + id)
            .map(res => res.json());
    }
    updateMovie(movie) {
        return this.http.put('/api/movies/', movie)
            .map(res => res.json());
    }
    deleteMovie(id) {
        return this.http.delete('/api/movies/' + id)
            .map(res => res.json());
    }
}
