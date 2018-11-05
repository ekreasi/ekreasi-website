import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  version: string = environment.VERSION;

  constructor(private meta: Meta) {
    this.meta.addTag({ name: 'version', content: this.version });
  }
}


