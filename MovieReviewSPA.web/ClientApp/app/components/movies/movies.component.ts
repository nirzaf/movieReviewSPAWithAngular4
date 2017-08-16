import * as Raven from 'raven-js';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from './../../models/movie';
import {  Router } from '@angular/router';
import { ToastyService } from "ng2-toasty";

@Component({
    selector: 'app-movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

    movies;
    movie: {};
    constructor(
        private moviesService: MoviesService, private router: Router, private toastyService: ToastyService) {

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

    delete(id) {
        if (confirm("Are you sure?")) {
            this.moviesService.deleteMovie(id)
                .subscribe(x => {
                        this.toastyService.success({
                            title: 'Success',
                            msg: 'Movie Deleted!',
                            theme: 'bootstrap',
                            showClose: true,
                            timeout: 5000
                        });
                        this.router.navigate(['/home']);
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
}
