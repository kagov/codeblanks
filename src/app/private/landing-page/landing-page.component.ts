import { Component, OnInit } from '@angular/core';
import { LandingPageService } from './landing-page.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private landingPageService: LandingPageService) { }

  ngOnInit(): void {
  }

}
