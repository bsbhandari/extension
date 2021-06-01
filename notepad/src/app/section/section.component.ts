import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Bookmark } from '../interfaces/bookmark';
import { ViewMode } from '../enums/section-type';
import { ChromeApiService } from '../services/chrome-api.service';
import { APP_CONSTANTS } from '../app.constants';
import { find } from 'lodash';
import { AnalyticsEventMap } from '../interfaces/google-analytics';
import { GoogleAnalyticsService } from '../services/google-analytics.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html'
})
export class SectionComponent implements OnInit {
  @Output() onAction: EventEmitter<any> = new EventEmitter();
  @Input() container: Bookmark;
  @Input() inActiveContainer: Bookmark;
  @Input() viewMode: ViewMode;
  sections: Bookmark[] = [] as Bookmark[];
  notes: Bookmark[] = [] as Bookmark[];
  selectedSection: Bookmark;
  selectedNote: Bookmark;
  restrictedSection = APP_CONSTANTS.INACTIVE_NOTES;
  isAddInProgress = false;
  get getViewMode() { return ViewMode }
  @ViewChild('noteInput') noteInput: ElementRef;
  @ViewChild('sectionInput') sectionInput: ElementRef
  constructor(private chromeApiService: ChromeApiService, private cd: ChangeDetectorRef, private googleAnalyticsService: GoogleAnalyticsService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.container && this.container.id) {
      this.setEmpty();
      this.getSections(this.container.id);
    }
  }

  setEmpty() {
    this.sections = [];
    this.notes = [];
    this.selectedSection = {} as Bookmark;
    this.selectedNote = {} as Bookmark;
    this.onAction.emit({ eventType: 'SELECT_NOTE', data: {} });
  }

  getSections(id) {
    this.chromeApiService.getChildren(id).subscribe((sections: Bookmark[]) => {
      this.sections = sections || [];
      const selectedSection = this.selectedSection || {} as Bookmark;
      const section = find(this.sections, (value) => { return value.id === selectedSection.id });
      if (this.selectedSection && section) {
        this.getSection(section);
      } else {
        if (sections && sections.length) {
          const [section] = sections;
          this.getSection(section);
        }
      }
    });
  }

  getSection(section: Bookmark) {
    this.selectedSection = section;
    this.getNotes(section.id);
  }

  getNotes(id: string) {
    this.chromeApiService.getChildren(id).subscribe((notes: Bookmark[]) => {
      if (notes && notes.length) {
        this.notes = notes;
        const [note] = notes;
        this.getNote(note);
      } else {
        this.notes = [];
      }
    });
  }

  getNote(note: Bookmark) {
    this.chromeApiService.get(note.id).subscribe(([note]) => {
      this.selectedNote = note;
      this.onAction.emit({ eventType: 'SELECT_NOTE', data: note });
    });
  }

  addSection() {
    this.isAddInProgress = true;
    let title = APP_CONSTANTS.GET_SECTION_NAME(this.sections.length + 1);
    title = this.findUniqueTitle(this.sections, title);
    this.googleAnalyticsService.emitEvent(AnalyticsEventMap.ADD_SECTION);
    this.chromeApiService.create({ title, parentId: this.container.id }).subscribe((section: Bookmark) => {
      this.chromeApiService.move(section.id, { index: 0 }).subscribe(x => {
        this.selectedSection = section;
        this.getSections(this.container.id);
        this.addNote(section, true);
      });
    });
  }

  addNote(section, isFirstTime?) {
    this.isAddInProgress = true;
    const parentId = section.id;
    const length = isFirstTime ? 1 : (this.notes ? this.notes.length + 1 : 1);
    let title = APP_CONSTANTS.GET_NOTE_NAME(length);
    title = isFirstTime ? title : this.findUniqueTitle(this.notes, title);
    this.googleAnalyticsService.emitEvent(AnalyticsEventMap.ADD_NOTE);
    this.chromeApiService.create({ title, parentId, url: APP_CONSTANTS.URL_PREFIX }).subscribe((note: Bookmark) => {
      this.chromeApiService.move(note.id, { index: 0 }).subscribe(x => {
        this.selectedNote = note;
        this.getNotes(parentId);
        this.isAddInProgress = false;
      });
    });
  }

  findUniqueTitle(items: Bookmark[], title: string) {
    if (items && items.length === 0) {
      return title;
    }
    const tempItem = find(items, (item: Bookmark) => item.title === title);
    if (tempItem) {
      const tempTitle = tempItem.title + '_copy';
      return this.findUniqueTitle(items, tempTitle);
    } else {
      return title;
    }
  }

  edit(item, items, type) {
    items.map(x => { x.edit = false; return x; });
    item.edit = true;
    item.tempValue = item.title;
    this.cd.detectChanges();
    if (type === 'sections') {
      this.sectionInput.nativeElement.focus();
      this.googleAnalyticsService.emitEvent(AnalyticsEventMap.EDIT_SECTION);
    }

    if (type === 'notes') {
      this.noteInput.nativeElement.focus();
      this.googleAnalyticsService.emitEvent(AnalyticsEventMap.EDIT_NOTE);
    }
  }

  deleteSection(id) {
    if (this.viewMode === ViewMode.InActive) {
      this.googleAnalyticsService.emitEvent(AnalyticsEventMap.DELETE_INACTIVE_SECTION);
      this.chromeApiService.removeTree(id).subscribe(x => {
        this.getSections(this.container.id);

      });
    } else {
      this.googleAnalyticsService.emitEvent(AnalyticsEventMap.DELETE_SECTION);
      this.chromeApiService.move(id, { parentId: this.inActiveContainer.id }).subscribe(x => {
        this.getSections(this.container.id);
      });
    }
  }

  deleteNote(id) {
    if (this.viewMode === ViewMode.InActive) {
      this.googleAnalyticsService.emitEvent(AnalyticsEventMap.DELETE_INACTIVE_NOTE);
      this.chromeApiService.remove(id).subscribe(x => {
        this.getNotes(this.selectedSection.id);
      });
    } else {
      const parent = find(this.inActiveContainer.children, (item) => item.title === APP_CONSTANTS.INACTIVE_NOTES);
      this.googleAnalyticsService.emitEvent(AnalyticsEventMap.DELETE_NOTE);
      this.chromeApiService.move(id, { parentId: parent.id }).subscribe(x => {
        this.getNotes(this.selectedSection.id);
      });
    }
  }

  save(item, type?) {
    if (item.tempValue === item.title) {
      item.edit = false;
      return;
    }
    const title = this.findUniqueTitle(this.notes, item.tempValue);
    item.title = title;
    item.edit = false;
    if(type){
      this.googleAnalyticsService.emitEvent(AnalyticsEventMap.RENAME_NOTE);
    }else{
      this.googleAnalyticsService.emitEvent(AnalyticsEventMap.RENAME_SECTION);
    }

    this.chromeApiService.update(item.id, { title }).subscribe(x => { });
  }

  sectionDrop(event: any) {
    const { item: { data: { id } }, currentIndex: index } = event;

    this.googleAnalyticsService.emitEvent(AnalyticsEventMap.MOVE_SECTION);
    this.chromeApiService.move(id, { index }).subscribe((response) => {
      this.getSections(this.container.id);
    });
  }

  noteDrop(event: any) {
    const { item: { data: { id } }, currentIndex: index } = event;
    this.googleAnalyticsService.emitEvent(AnalyticsEventMap.MOVE_NOTE);
    this.chromeApiService.move(id, { index }).subscribe((response) => {
      this.getNotes(this.selectedSection.id);
    });
  }

  cancel(item) {
    item.edit = false;
  }

}
