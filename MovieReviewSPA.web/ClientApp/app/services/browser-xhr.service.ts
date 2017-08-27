/*import { Injectable } from '@angular/core';
import { Http, BrowserXhr } from '@angular/http';
import { ProgressService } from '../services/progress.service';

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
}*/