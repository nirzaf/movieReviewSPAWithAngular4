import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ImagesService {

    constructor(private http: Http) { }

    upload(Id, image) {
        /*return this.http.post('/api/movies/'+Id+'/photos')*/ //or
        var formData = new FormData();
        formData.append('file', image);
        return this.http.post(`/api/movies/${Id}/images`, formData)
            .map(res => res.json());
    }

    getImages(Id) {
        return this.http.get(`/api/movies/${Id}/images`)
            .map(res => res.json());
    }
}
