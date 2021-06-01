import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, SimpleChanges, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChromeApiService } from '../services/chrome-api.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Bookmark } from '../interfaces/bookmark';
import { APP_CONSTANTS } from '../app.constants';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ViewMode } from '../enums/section-type';
import { GoogleAnalyticsService } from '../services/google-analytics.service';
import { AnalyticsEventMap } from '../interfaces/google-analytics';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit, OnChanges {
  sideNavOpened: boolean = true;
  @Output() action: EventEmitter<any> = new EventEmitter();
  @Input() activeBookmark: Bookmark;
  @Input() inActiveBookmark: Bookmark;
  item: Bookmark;
  form: FormGroup;
  mode: ViewMode = ViewMode.Active;
  constructor(public dialog: MatDialog, private cas: ChromeApiService, private fb: FormBuilder, private gas: GoogleAnalyticsService) {
    this.form = this.fb.group({
      title: [''],
      url: [''],
      id: []
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.item = { ...this.activeBookmark };
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(debounceTime(600), distinctUntilChanged()).subscribe(res => {
      const id = this.form.value.id;
      const u1 = res.url ? res.url.replace(/<p><br><\/p>/g, '<br>').replace(/<p>/g, '').replace(/<\/p>/g, '<br>') : '';
      const url = APP_CONSTANTS.URL_PREFIX + encodeURI(u1);
      if (id)
        this.cas.update(id, { url }).subscribe((x) => { });
    });
  }



  onNodeSelect(event) {
    const { data, eventType } = event;
    if (eventType === 'SELECT_NOTE') {
      data.url = decodeURI(data.url ? data.url.replace(APP_CONSTANTS.URL_PREFIX, '') : '');
      this.form.patchValue(data);
      this.gas.emitEvent(AnalyticsEventMap.SELECT_NODE);
    }
  }

  openSettings() {
    this.action.emit({});
  }

  onContentChanged(event) {

  }

  openTrash(isActiveContainer: boolean) {
    if (isActiveContainer) {
      this.item = { ...this.activeBookmark };
    } else {
      this.item = { ...this.inActiveBookmark };
    }
  }
}
