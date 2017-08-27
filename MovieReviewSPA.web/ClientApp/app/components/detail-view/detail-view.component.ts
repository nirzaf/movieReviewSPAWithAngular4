import * as Raven from 'raven-js';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from './../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { ProgressService } from '../../services/progress.service';
import { ImagesService } from '../../services/images.service';
import { ToastyService } from "ng2-toasty";


@Component({
    templateUrl: './detail-view.component.html',
})
export class DetailViewComponent implements OnInit {
    @ViewChild('fileInput') fileInput: ElementRef;
    @ViewChild('loaderInput') loaderInput: ElementRef;
    movie: Movie = new Movie();
    images: any[];
    

    constructor(private route: ActivatedRoute,
        private router: Router,
        private moviesService: MoviesService,
        private toastyService: ToastyService,
        private imagesService: ImagesService
    ) {
        route.params.subscribe(p => {
            this.movie.id = +p['id'];
        });
    }
    
    ngOnInit() {
        //var nativeElement1: HTMLInputElement = this.loaderInput.nativeElement;
        // nativeElement1.className = "block";
        //var el = document.getElementById("loader");
        //console.log(el);
        //el.style.display = "block";

        this.imagesService.getImages(this.movie.id)
            .subscribe(images => {
                this.images = images[0];
            });
        //nativeElement1.className = "none";

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
        
        //this.nativeElement1.className = "block";

        //this.progressService.uploadProgress.subscribe(progress => console.log(progress));
       // setTimeout(function () {
            this.imagesService.upload(this.movie.id, nativeElement.files[0]).subscribe(image => this.images.push(image));
            this.toastyService.success({
                title: 'Success',
                msg: 'Image Uploaded!',
                theme: 'bootstrap',
                showClose: true,
                timeout: 5000
            });
       // }, 1000);
        //this.nativeElement1.className = "none";
    }
    toggleSpinner() {
        alert();
        var el = document.getElementById("loader");
        el.style.display = "block";
    }


}

