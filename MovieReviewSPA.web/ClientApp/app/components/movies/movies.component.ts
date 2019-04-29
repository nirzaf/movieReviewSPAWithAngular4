import * as Raven from 'raven-js';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Router } from '@angular/router';
import { ToastyService } from "ng2-toasty";

@Component({
    selector: 'app-movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

    movies;
    allMovies;
    movie: {};
    filter: any = {};
    totalMovies;
    query: any = {
        pageSize: 3,
        allMovies: 10
    }
    queryResult: any = {};
    showHide: boolean;

    constructor(
        private moviesService: MoviesService, private router: Router, private toastyService: ToastyService) {
        this.showHide = true;
    }

    ngOnInit() {
        setTimeout(function () {
            this.moviesService.getMovies(this.query).subscribe(movies => {
                this.movies = this.allMovies = movies;
                console.log("Movies:- ", this.movies);
            });
            this.showHide = false;
        }.bind(this), 3000);
        this.moviesService.getMoviesCount().subscribe(movies => {
            this.totalMovies = movies.length;
            console.log("Total Movies:- ", this.totalMovies);
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
    private populateMovies() {
        this.moviesService.getMovies(this.query)
            .subscribe(result => this.movies = result);
    }
    onDropdownChange() {
        var movies = this.allMovies;
        if (this.filter.id) {
            movies = movies.filter(m => m.id == this.filter.id);
        }
        this.movies = movies;
    }
    onResetFilter() {
        this.filter = {};
        this.onDropdownChange();
    }

    onPageChange(page) {
        this.query.page = page;
        this.populateMovies();
    }
}
