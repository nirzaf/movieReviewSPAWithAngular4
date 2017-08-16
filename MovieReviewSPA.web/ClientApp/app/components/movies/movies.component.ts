import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from './../../models/movie';

@Component({
    selector: 'app-movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

    movies;
    movie: {};
    constructor(
        private moviesService: MoviesService) {

    }

    ngOnInit() {
        this.moviesService.getMovies().subscribe(movies => {
            this.movies = movies;
            console.log("Movies:- ", this.movies);
        });
    }

    submit() {
        this.moviesService.createMovie(this.movie)
            .subscribe(x => console.log(x));
    }
}
