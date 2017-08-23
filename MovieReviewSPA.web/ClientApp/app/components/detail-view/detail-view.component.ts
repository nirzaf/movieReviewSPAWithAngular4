import * as Raven from 'raven-js';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from './../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { ToastyService } from "ng2-toasty";


@Component({
    templateUrl: './detail-view.component.html',
    })
export class DetailViewComponent implements OnInit {
    @ViewChild('fileInput') fileInput: ElementRef;
    movie: Movie = new Movie();
    photos: any[];

    constructor(private route: ActivatedRoute,
        private router: Router,
        private moviesService: MoviesService,
        private toastyService: ToastyService) {
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
                    this.router.navigate(['/movies']);
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

    uploadImage() {
        var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
        this.photoService.upload(this.movie.id, nativeElement.files[0]).subscribe(photo => this.photos.push(photo));
    }
}

