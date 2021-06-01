import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Bookmark } from '../interfaces/bookmark';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit, OnChanges {

  @Input() item: Bookmark;
  @Output() action: EventEmitter<any> = new EventEmitter();

  settings: any;
  configs: any = {
    fontFamily: [
      {
        name: 'Australia',
        code: 'AU'
      },
      {
        name: 'ghj',
        code: 'AjU'
      }
    ]
  };
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.item && this.item.url) {
      this.settings = JSON.parse(this.item.url);
    } else {
      this.settings = GET_DEFAULTS();
    }
  }

  ngOnInit() {
  }

  toJSON() {
    return JSON.stringify(this.settings);
  }
}
export function GET_DEFAULTS() {
  return {};
}
