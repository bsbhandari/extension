import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChromeApiService } from '../services/chrome-api.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Bookmark } from '../interfaces/bookmark';
import { APP_CONSTANTS } from '../app.constants';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ViewMode } from '../enums/section-type';
import { GoogleAnalyticsService } from '../google-analytics.service';
import { AnalyticsEventMap } from '../interfaces/google-analytics';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit, OnDestroy {
  sideNavOpened = true;

  get getViewMode() { return ViewMode };
  @Output() toogleSetting: EventEmitter<any> = new EventEmitter();
  @Input() activeContainer: Bookmark;
  @Input() inActiveContainer: Bookmark;
  @Input() mappingContainer: Bookmark;
  container: Bookmark;
  viewMode: ViewMode = ViewMode.Active;
  form: FormGroup;
  id = new FormControl('');
  editorOptions = APP_CONSTANTS.EDITOR_OPTIONS;
  constructor(public dialog: MatDialog, private chromeApiService: ChromeApiService, private fb: FormBuilder, private googleAnalyticsService: GoogleAnalyticsService) {
    this.form = this.fb.group({
      title: [''],
      url: [''],
      id: this.id
    });
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        debounceTime(600),
        distinctUntilChanged()
      ).subscribe(res => {
        const id = this.form.value.id;
        const u1 = res.url ? res.url.replace(/<p><br><\/p>/g, '<br>').replace(/<p>/g, '').replace(/<\/p>/g, '<br>') : '';
        const url = APP_CONSTANTS.URL_PREFIX + encodeURI(u1);
        if (id)
          this.chromeApiService.update(id, { url }).subscribe((x) => { });
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.activeContainer) {
      this.container = this.activeContainer;
    }
  }

  onAction(event) {
    const { data, eventType } = event;
    if (eventType === 'SELECT_NOTE') {
      data.url = decodeURI(data.url ? data.url.replace(APP_CONSTANTS.URL_PREFIX, '') : '');
      this.form.patchValue(data);
      this.googleAnalyticsService.emitEvent(AnalyticsEventMap.SELECT_NODE);
    }
  }

  openTrash() {
    if (this.viewMode == ViewMode.Active) {
      this.viewMode = ViewMode.InActive;
      this.container = { ...this.inActiveContainer };
      this.googleAnalyticsService.emitEvent(AnalyticsEventMap.OPEN_TRASH);
    }
    else {
      this.viewMode = ViewMode.Active;
      this.container = { ...this.activeContainer };
      this.googleAnalyticsService.emitEvent(AnalyticsEventMap.CLOSE_TRASH);
    }
  }
  toogleSideNav(value) {
    if (value)
      this.googleAnalyticsService.emitEvent(AnalyticsEventMap.SIDE_NAV_CLOSE);
    else
      this.googleAnalyticsService.emitEvent(AnalyticsEventMap.SIDE_NAV_OPEN);
  }

  openFb(){
    this.googleAnalyticsService.emitEvent(AnalyticsEventMap.OPEN_FB);
  }

  openLinkedIn(){
    this.googleAnalyticsService.emitEvent(AnalyticsEventMap.OPEN_TWITTER);
  }

  openSettings() {
    this.toogleSetting.emit({});
  }

  onContentChanged(event) {

  }

  ngOnDestroy(): void {

  }
}
