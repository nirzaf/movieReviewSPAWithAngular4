import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { sharedConfig } from './app.module.shared';
import { MoviesComponent } from './components/movies/movies.component';
import { MoviesService } from './services/movies.service';

@NgModule({
    bootstrap: sharedConfig.bootstrap,
    declarations: [...sharedConfig.declarations, MoviesComponent],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ...sharedConfig.imports
    ],
    providers: [
        { provide: 'ORIGIN_URL', useValue: location.origin },
        MoviesService
    ]
})
export class AppModule {
}
