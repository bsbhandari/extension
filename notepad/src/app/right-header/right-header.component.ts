import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AnalyticsEventMap } from '../interfaces/google-analytics';
import { GoogleAnalyticsService } from '../services/google-analytics.service';

@Component({
  selector: 'app-right-header',
  templateUrl: './right-header.component.html'
})
export class RightHeaderComponent implements OnInit {

  @Output() onAction: EventEmitter<any> = new EventEmitter();
  @Input() context: any;
  @Input() sideNavOpened: boolean;
  constructor(private googleAnalyticsService: GoogleAnalyticsService) { }

  ngOnInit(): void {
  }

  openSettings() {
    this.onAction.emit({});
  }

  toogleSideNav(value) {
    if (value)
      this.googleAnalyticsService.emitEvent(AnalyticsEventMap.SIDE_NAV_CLOSE);
    else
      this.googleAnalyticsService.emitEvent(AnalyticsEventMap.SIDE_NAV_OPEN);
  }
}
