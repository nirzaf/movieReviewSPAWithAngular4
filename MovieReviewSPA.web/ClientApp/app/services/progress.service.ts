import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/subject';
import { BrowserXhr } from '@angular/http';

@Injectable()
export class ProgressService {

    uploadProgress: Subject<any> = new Subject();
    //uploadProgress1=this.uploadProgress.asObservable();
    downloadProgress: Subject<any> = new Subject();
}

@Injectable()
export class BrowserXHRService extends BrowserXhr {

    //Since, we are extending BrowserXhr, hence we need to call ctor of base class
    constructor(private progressService: ProgressService) { super(); }

    build(): XMLHttpRequest {
        var xhr: XMLHttpRequest = super.build();

        xhr.onprogress = (event) => {
            this.progressService.downloadProgress.next(this.calculateProgress(event));
        }
        xhr.upload.onprogress = (event) => {
            this.progressService.uploadProgress.next(this.calculateProgress(event));
        }

        return xhr;
    }

    private calculateProgress(event) {
        return {
            total: event.total,
            percent: Math.round(event.loaded / event.total * 100)
        }
    }
}