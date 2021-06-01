import { Component, OnInit, ViewChild } from '@angular/core';
import { ChromeApiService } from './services/chrome-api.service';
import { APP_CONSTANTS } from './app.constants';
import { find } from 'lodash';
import { forkJoin, Observable, of } from 'rxjs';
import { Bookmark } from './interfaces/bookmark';
import { GoogleAnalyticsService } from './services/google-analytics.service';
import { AnalyticsEventMap } from './interfaces/google-analytics';
import { environment } from '../environments/environment';
import { SettingsComponent } from './settings/settings.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  isAppLoading: boolean = false;
  activeBookmark: Bookmark;
  inActiveBookmark: Bookmark;
  settingBookmark: Bookmark;
  showSetting: boolean = false;


  @ViewChild(SettingsComponent, { static: true }) settings: SettingsComponent;
  constructor(private cas: ChromeApiService, private gas: GoogleAnalyticsService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.getApplicationConfiguration();
    }, 2000)

    this.gas.emitEvent(AnalyticsEventMap.NOTEBOOK_OPENED);
  }

  getApplicationConfiguration() {
    this.cas.getSubTree(APP_CONSTANTS.OTHER_BOOKMARKS_ID).subscribe((bookmarks: any[]) => {
      if (bookmarks && bookmarks.length && bookmarks[0] && bookmarks[0].children) {
        const children = bookmarks[0].children;
        const root: Bookmark = find(children, (bookmark: Bookmark) => bookmark.title === environment.APP_FOLDER);
        if (root) {
          const { children: kids } = root;
          const activeBookmark: Bookmark = find(kids, (bookmark: Bookmark) => bookmark.title === APP_CONSTANTS.ACTIVE_FOLDER);
          const inActiveBookmark: Bookmark = find(kids, (bookmark: Bookmark) => bookmark.title === APP_CONSTANTS.INACTIVE_FOLDER);
          const settingBookmark: Bookmark = find(kids, (bookmark: Bookmark) => bookmark.title === APP_CONSTANTS.SETTING_FOLDER);
          let subscription = {} as any;
          subscription.activeBookmark = (activeBookmark ? of(activeBookmark) : this.createBookmarkSubscription(root.id, APP_CONSTANTS.ACTIVE_FOLDER));
          subscription.inActiveBookmark = (inActiveBookmark ? of(inActiveBookmark) : this.createBookmarkSubscription(root.id, APP_CONSTANTS.INACTIVE_FOLDER));
          subscription.settingBookmark = (settingBookmark ? of(settingBookmark) : this.createBookmarkSubscription(root.id, APP_CONSTANTS.SETTING_FOLDER));
          this.createApplicationContainers(subscription);
        } else {
          this.createApplicationConfiguration();
        }
      } else {
        this.createApplicationConfiguration();
      }
    });
  }

  createApplicationConfiguration() {
    const payload = { parentId: APP_CONSTANTS.OTHER_BOOKMARKS_ID, title: environment.APP_FOLDER };
    this.cas.create(payload).subscribe((root: Bookmark) => {
      let subscription = {} as any;
      subscription.activeBookmark = (this.createBookmarkSubscription(root.id, APP_CONSTANTS.ACTIVE_FOLDER));
      subscription.inActiveBookmark = (this.createBookmarkSubscription(root.id, APP_CONSTANTS.INACTIVE_FOLDER));
      subscription.settingBookmark = (this.createBookmarkSubscription(root.id, APP_CONSTANTS.SETTING_FOLDER));
      this.createApplicationContainers(subscription);
    });
  }

  createBookmarkSubscription(parentId: string, title: string) {
    const payload = { parentId, title };
    return this.cas.create(payload);
  }

  createApplicationContainers(subscriptions: any[]) {
    forkJoin(subscriptions).subscribe((value: any) => {
      this.activeBookmark = value.activeBookmark as Bookmark;
      this.inActiveBookmark = value.inActiveBookmark as Bookmark;
      this.settingBookmark = value.settingBookmark as Bookmark;
      this.isAppLoading = false;
    });
  }

  openSettings(event) {
    this.showSetting = true;
  }

  onSave() {
    this.gas.emitEvent(AnalyticsEventMap.RENAME_SECTION);
    const url = this.settings.toJSON();
    this.cas.update(this.settingBookmark.id, { url }).subscribe((bookmark: Bookmark) => {
      this.settingBookmark = bookmark;
    });
    this.showSetting = false;
  }
}
