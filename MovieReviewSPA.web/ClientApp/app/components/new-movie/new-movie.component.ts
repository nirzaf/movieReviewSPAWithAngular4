import { Component, OnInit, ElementRef } from '@angular/core';
import {NgForm} from '@angular/forms';
/*import { MoviesService } from '../../services/movies.service';*/
/*import { movie } from './../../models/movie';*/

@Component({
    selector: 'app-new-movie',
    templateUrl: './new-movie.component.html',
    styleUrls: ['./new-movie.component.css']
})
export class NewMovieComponent implements OnInit {

   
   /* movie: movie ={
        id: 0,
        directorName: '',
        movieName: '',
        releaseYear:''
    };*/
    constructor() { }
    ngOnInit() {
    }

    onSubmit(form:NgForm) {
        console.log(form);
    }
}
