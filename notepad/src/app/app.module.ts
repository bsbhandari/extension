import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { NgScrollbarModule } from 'ngx-scrollbar';

import { QuillModule } from 'ngx-quill';
import { MatListModule } from '@angular/material/list';
import { TrashComponent } from './trash/trash.component';
import { SectionComponent } from './section/section.component';
import { SettingsComponent } from './settings/settings.component';
import { LocalStorageService } from './services/local-storage.service';
import { ChromeApiService } from './services/chrome-api.service';
import { MainComponent } from './main/main.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GoogleAnalyticsService } from './google-analytics.service';
import { APP_CONSTANTS } from './app.constants';

@NgModule({
  declarations: [
    AppComponent, TrashComponent, SectionComponent, SettingsComponent, MainComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatTreeModule,
    MatButtonModule,
    MatInputModule,
    MatTooltipModule,
    MatBadgeModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    DragDropModule,


    NgScrollbarModule,

    QuillModule.forRoot({
      modules: APP_CONSTANTS.EDITOR_OPTIONS
    }),
  ],
  providers: [
    LocalStorageService, ChromeApiService, GoogleAnalyticsService
  ],
  entryComponents: [TrashComponent, SettingsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
