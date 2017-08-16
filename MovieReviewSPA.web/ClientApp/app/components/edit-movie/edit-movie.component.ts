import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from './../../models/movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {
    movie: Movie = new Movie();

    constructor(private route: ActivatedRoute,
        private router: Router, private moviesService: MoviesService) {
        route.params.subscribe(p => {
            this.movie.id = +p['id'];
        });
    }

    ngOnInit() {
        if (this.movie.id) {
            this.moviesService.getMovie(this.movie.id)
                .subscribe(m => {
                        this.movie = m;
                    },
                    err => {
                        if (err.status == 404) {
                            this.router.navigate(['/not-found']);
                        }
                    });
        }
  }

}
