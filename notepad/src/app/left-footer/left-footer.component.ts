import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ViewMode } from '../enums/section-type';
import { AnalyticsEventMap } from '../interfaces/google-analytics';
import { GoogleAnalyticsService } from '../services/google-analytics.service';

@Component({
  selector: 'app-left-footer',
  templateUrl: './left-footer.component.html'
})
export class LeftFooterComponent {

  @Input() mode: ViewMode = ViewMode.Active;
  @Output() onAction: EventEmitter<any> = new EventEmitter();
  get getViewMode() { return ViewMode };
  constructor(private googleAnalyticsService: GoogleAnalyticsService) { }

  openFb() {
    this.googleAnalyticsService.emitEvent(AnalyticsEventMap.OPEN_FB);
  }

  openLinkedIn() {
    this.googleAnalyticsService.emitEvent(AnalyticsEventMap.OPEN_TWITTER);
  }

  toggleTrash() {
    this.onAction.emit(this.mode !== ViewMode.Active);
    if (this.mode === ViewMode.Active) {
      this.mode = ViewMode.InActive;
      this.googleAnalyticsService.emitEvent(AnalyticsEventMap.OPEN_TRASH);
    } else {
      this.mode = ViewMode.Active;
      this.googleAnalyticsService.emitEvent(AnalyticsEventMap.CLOSE_TRASH);
    }
  }
}
