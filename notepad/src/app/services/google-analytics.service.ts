import { Injectable } from '@angular/core';
declare let ga;
@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  constructor() {
  }

  emitEvent(value) {
    const { eventName, event } = value;
    const { eventCategory, eventAction, eventLabel, eventValue } = event;
    if (ga)
      ga('send', 'event', eventCategory, eventName, eventLabel, eventValue, { 'nonInteraction': 1 });
  }
}

