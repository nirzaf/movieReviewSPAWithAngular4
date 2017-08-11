import { Component, OnInit, ElementRef } from '@angular/core';
import {NgForm} from '@angular/forms';
import { MoviesService } from '../../services/movies.service';
import { Movie } from './../../models/movie';

@Component({
    selector: 'app-new-movie',
    templateUrl: './new-movie.component.html',
    styleUrls: ['./new-movie.component.css']
})
export class NewMovieComponent implements OnInit {

    movie: Movie =new Movie();
    constructor(private moviesService: MoviesService) { }
    ngOnInit() {
    }

    onSubmit(form: NgForm) {
        var formData = this.movie;
        formData.id = 0;
        formData.movieName = this.movie.movieName.toString();
        formData.directorName = this.movie.directorName.toString();
        formData.releaseYear = this.movie.releaseYear.toString();
        console.log(formData);
        this.moviesService.createMovie(formData)
            .subscribe(x => console.log(x));
    }
}
