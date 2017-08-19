import * as Raven from 'raven-js';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from './../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { ToastyService } from "ng2-toasty";

@Component({
    selector: 'app-edit-movie',
    templateUrl: './edit-movie.component.html',
    styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {
    movie: Movie = new Movie();

    constructor(private route: ActivatedRoute,
        private router: Router, private moviesService: MoviesService, private toastyService: ToastyService) {
        route.params.subscribe(p => {
            this.movie.id = +p['id'];
        });
    }

    ngOnInit() {
        if (this.movie.id) {
            this.moviesService.getMovie(this.movie.id)
                .subscribe(m => {
                    this.movie = m;
                        console.log("Movie:-", this.movie);
                },
                err => {
                    if (err.status == 404) {
                        this.router.navigate(['/']);
                    }
                });
        }

    }

    onSubmit() {
        if (this.movie.id) {
            this.moviesService.updateMovie(this.movie)
                .subscribe(x => {
                        console.log(x);
                        this.toastyService.success({
                            title: 'Success',
                            msg: 'Movie Updated!',
                            theme: 'bootstrap',
                            showClose: true,
                            timeout: 5000
                        });
                        this.router.navigate(['/movies'])
                    },
                    err => {
                        Raven.captureException(err.originalError || err);
                        this.toastyService.error({
                            title: 'Error',
                            msg: 'An unexpected error while updating the record!',
                            theme: 'bootstrap',
                            showClose: true,
                            timeout: 5000
                        });
                    });
        }
    
    }

}
