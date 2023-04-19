import { Component, OnInit } from '@angular/core';
import { CommonLibService } from '@common-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mf-shell';
  constructor(public commonLibService: CommonLibService) { }
}
