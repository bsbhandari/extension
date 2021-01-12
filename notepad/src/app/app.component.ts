import { Component, OnInit } from '@angular/core';
import { ChromeApiService } from './services/chrome-api.service';
import { APP_CONSTANTS } from './app.constants';
import { find } from 'lodash';
import { forkJoin, of } from 'rxjs';
import { Bookmark } from './interfaces/bookmark';
import { GoogleAnalyticsService } from './google-analytics.service';
import { AnalyticsEventMap } from './interfaces/google-analytics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  activeContainer: Bookmark;
  inActiveContainer: Bookmark;
  mappingContainer: Bookmark;
  isAppLoading = true;
  constructor(private chromeApiService: ChromeApiService, private googleAnalyticsService: GoogleAnalyticsService) {
  }

  ngOnInit(): void {
    this.isAppLoading = false;
    this.getApplicationConfiguration();
    this.googleAnalyticsService.emitEvent(AnalyticsEventMap.NOTEBOOK_OPENED);
  }

  getApplicationConfiguration() {
    this.chromeApiService.getSubTree(APP_CONSTANTS.OTHER_BOOKMARKS_ID).subscribe((bookmarks: any[]) => {
      if (bookmarks && bookmarks.length) {
        const [value] = bookmarks;
        const { children } = value;
        if (children) {
          const applicationContainer = find(children, (bookmark) => { return bookmark.title === APP_CONSTANTS.APP_FOLDER });
          if (applicationContainer) {
            const { children: appChildren } = applicationContainer;
            const inActiveContainer = find(appChildren, (bookmark) => { return bookmark.title === APP_CONSTANTS.INACTIVE_FOLDER });
            const activeContainer = find(appChildren, (bookmark) => { return bookmark.title === APP_CONSTANTS.ACTIVE_FOLDER });
            if (inActiveContainer && activeContainer) {
              this.activeContainer = activeContainer;
              this.inActiveContainer = inActiveContainer;
              this.isAppLoading = false;
            } else if (activeContainer && !inActiveContainer) {
              this.activeContainer = activeContainer;
              const inActiveContainerPayload = { parentId: applicationContainer.id, title: APP_CONSTANTS.INACTIVE_FOLDER };
              this.createSubContainers(undefined, inActiveContainerPayload);
            } else if (inActiveContainer && !activeContainer) {
              this.inActiveContainer = inActiveContainer;
              const activeContainerPayload = { parentId: applicationContainer.id, title: APP_CONSTANTS.ACTIVE_FOLDER };
              this.createSubContainers(activeContainerPayload, undefined);
            } else {
              const activeContainerPayload = { parentId: applicationContainer.id, title: APP_CONSTANTS.ACTIVE_FOLDER };
              const inActiveContainerPayload = { parentId: applicationContainer.id, title: APP_CONSTANTS.INACTIVE_FOLDER };
              this.createSubContainers(activeContainerPayload, inActiveContainerPayload);
            }
          } else {
            this.createApplicationConfiguration();
          }
        } else {
          this.createApplicationConfiguration();
        }
      }
    });
  }

  createApplicationConfiguration() {
    const payload = { parentId: APP_CONSTANTS.OTHER_BOOKMARKS_ID, title: APP_CONSTANTS.APP_FOLDER };
    this.chromeApiService.create(payload).subscribe((response: Bookmark) => {
      const activeContainerPayload = { parentId: response.id, title: APP_CONSTANTS.ACTIVE_FOLDER };
      const inActiveContainerPayload = { parentId: response.id, title: APP_CONSTANTS.INACTIVE_FOLDER };
      this.createSubContainers(activeContainerPayload, inActiveContainerPayload);
    })
  }

  createSubContainers(activePayload, inActivePayload) {
    forkJoin(
      activePayload ? this.chromeApiService.create(activePayload) : of(this.activeContainer),
      inActivePayload ? this.chromeApiService.create(inActivePayload) : of(this.inActiveContainer)
    ).subscribe(([activeContainer, inActiveContainer]) => {
      if (activePayload) {
        this.chromeApiService.create({ parentId: activeContainer['id'], title: APP_CONSTANTS.DEFAULT_SECTION }).subscribe((response: Bookmark) => {
          const payload = APP_CONSTANTS.DEFAULT_NOTE(response.id);
          this.chromeApiService.create(payload).subscribe((response: Bookmark) => {
          });
        });
      }

      if (inActivePayload) {
        this.chromeApiService.create({ parentId: inActiveContainer['id'], title: APP_CONSTANTS.INACTIVE_NOTES }).subscribe((response: Bookmark) => {

        });
      }
      this.getApplicationConfiguration();
    });
  }
}
