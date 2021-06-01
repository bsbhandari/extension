import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ViewMode } from '../enums/section-type';
import { Bookmark } from '../interfaces/bookmark';
import { AnalyticsEventMap } from '../interfaces/google-analytics';
import { ChromeApiService } from '../services/chrome-api.service';
import { GoogleAnalyticsService } from '../services/google-analytics.service';

@Component({
  selector: 'app-treeview',
  templateUrl: './treeview.component.html'
})
export class TreeviewComponent implements OnInit, OnChanges {

  data = [
    {
      "label": "Documents",
      "data": "Documents Folder",
      "expandedIcon": "pi pi-folder-open",
      "collapsedIcon": "pi pi-folder",
      "children": [{ "label": "Expenses.doc", "icon": "pi pi-file", "data": "Expenses Document" }, { "label": "Resume.doc", "icon": "pi pi-file", "data": "Resume Document" }]
    },
    {
      "label": "Pictures",
      "data": "Pictures Folder",
      "expandedIcon": "pi pi-folder-open",
      "collapsedIcon": "pi pi-folder",
      "children": [
        { "label": "barcelona.jpg", "icon": "pi pi-image", "data": "Barcelona Photo" },
        { "label": "logo.jpg", "icon": "pi pi-file", "data": "PrimeFaces Logo" },
        { "label": "primeui.png", "icon": "pi pi-image", "data": "PrimeUI Logo" }]
    },
    {
      "label": "Movies",
      "data": "Movies Folder",
      "expandedIcon": "pi pi-folder-open",
      "collapsedIcon": "pi pi-folder",
      "children": [{ "label": "Scarface", "icon": "pi pi-video", "data": "Scarface Movie" }, { "label": "Serpico", "icon": "pi pi-video", "data": "Serpico Movie" }]
    }
  ] as any;

  @Output() onAction: EventEmitter<any> = new EventEmitter();
  @Input() item: Bookmark;
  @Input() mode: ViewMode = ViewMode.Active;
  bookMark: Bookmark;
  get getViewMode() { return ViewMode };

  constructor(private cas: ChromeApiService, private gas: GoogleAnalyticsService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.getBookmarks();
  }

  ngOnInit(): void {
  }

  onNodeSelect($event) {

  }

  validateDrop($event) {
    const { dragNode, dropNode, index } = $event;
    return dropNode.isLeaf !== true;
  }

  getBookmarks() {
    this.cas.getSubTree(this.item.id).subscribe((bookmarks: Bookmark[]) => {
      this.data = this.convertBookmarksToTree(bookmarks);
    });
  }

  convertBookmarksToTree(bookmarks: Bookmark[]) {
    return [];
  }

  setEmpty() {

  }

  save(node) {

  }

  edit(node) {
    node.tempValue = node.label;
    node.edit = true;
  }

  delete(node) {

  }

  cancel(node) {

  }
  // addSection() {
  //   this.isAddInProgress = true;
  //   let title = APP_CONSTANTS.GET_SECTION_NAME(this.sections.length + 1);
  //   title = this.findUniqueTitle(this.sections, title);
  //   this.gas.emitEvent(AnalyticsEventMap.ADD_SECTION);
  //   this.cas.create({ title, parentId: this.container.id }).subscribe((section: Bookmark) => {
  //     this.cas.move(section.id, { index: 0 }).subscribe(x => {
  //       this.selectedSection = section;
  //       this.getSections(this.container.id);
  //       this.addNote(section, true);
  //     });
  //   });
  // }

  // addNote(section, isFirstTime?) {
  //   this.isAddInProgress = true;
  //   const parentId = section.id;
  //   const length = isFirstTime ? 1 : (this.notes ? this.notes.length + 1 : 1);
  //   let title = APP_CONSTANTS.GET_NOTE_NAME(length);
  //   title = isFirstTime ? title : this.findUniqueTitle(this.notes, title);
  //   this.gas.emitEvent(AnalyticsEventMap.ADD_NOTE);
  //   this.cas.create({ title, parentId, url: APP_CONSTANTS.URL_PREFIX }).subscribe((note: Bookmark) => {
  //     this.cas.move(note.id, { index: 0 }).subscribe(x => {
  //       this.selectedNote = note;
  //       this.getNotes(parentId);
  //       this.isAddInProgress = false;
  //     });
  //   });
  // }

  // findUniqueTitle(items: Bookmark[], title: string) {
  //   if (items && items.length === 0) {
  //     return title;
  //   }
  //   const tempItem = find(items, (item: Bookmark) => item.title === title);
  //   if (tempItem) {
  //     const tempTitle = tempItem.title + '_copy';
  //     return this.findUniqueTitle(items, tempTitle);
  //   } else {
  //     return title;
  //   }
  // }

  // edit(item, items, type) {
  //   items.map(x => { x.edit = false; return x; });
  //   item.edit = true;
  //   item.tempValue = item.title;
  //   this.cd.detectChanges();
  //   if (type === 'sections') {
  //     this.sectionInput.nativeElement.focus();
  //     this.gas.emitEvent(AnalyticsEventMap.EDIT_SECTION);
  //   }

  //   if (type === 'notes') {
  //     this.noteInput.nativeElement.focus();
  //     this.gas.emitEvent(AnalyticsEventMap.EDIT_NOTE);
  //   }
  // }

  // deleteSection(id) {
  //   if (this.viewMode === ViewMode.InActive) {
  //     this.gas.emitEvent(AnalyticsEventMap.DELETE_INACTIVE_SECTION);
  //     this.cas.removeTree(id).subscribe(x => {
  //       this.getSections(this.container.id);

  //     });
  //   } else {
  //     this.gas.emitEvent(AnalyticsEventMap.DELETE_SECTION);
  //     this.cas.move(id, { parentId: this.inActiveContainer.id }).subscribe(x => {
  //       this.getSections(this.container.id);
  //     });
  //   }
  // }

  // deleteNote(id) {
  //   if (this.viewMode === ViewMode.InActive) {
  //     this.gas.emitEvent(AnalyticsEventMap.DELETE_INACTIVE_NOTE);
  //     this.cas.remove(id).subscribe(x => {
  //       this.getNotes(this.selectedSection.id);
  //     });
  //   } else {
  //     const parent = find(this.inActiveContainer.children, (item) => item.title === APP_CONSTANTS.INACTIVE_NOTES);
  //     this.gas.emitEvent(AnalyticsEventMap.DELETE_NOTE);
  //     this.cas.move(id, { parentId: parent.id }).subscribe(x => {
  //       this.getNotes(this.selectedSection.id);
  //     });
  //   }
  // }

  // save(item, type?) {
  //   if (item.tempValue === item.title) {
  //     item.edit = false;
  //     return;
  //   }
  //   const title = this.findUniqueTitle(this.notes, item.tempValue);
  //   item.title = title;
  //   item.edit = false;
  //   if (type) {
  //     this.gas.emitEvent(AnalyticsEventMap.RENAME_NOTE);
  //   } else {
  //     this.gas.emitEvent(AnalyticsEventMap.RENAME_SECTION);
  //   }

  //   this.cas.update(item.id, { title }).subscribe(x => { });
  // }

  sectionDrop(event: any) {
    const { item: { data: { id } }, currentIndex: index } = event;
    this.gas.emitEvent(AnalyticsEventMap.MOVE_SECTION);
    this.cas.move(id, { index }).subscribe((response) => {
    });
  }

}



export const data = [
  {
    "children": [
      {
        "children": [
          {
            "children": [
              {
                "children": [
                  {
                    "dateAdded": 1622544773317,
                    "id": "15179",
                    "index": 0,
                    "parentId": "15178",
                    "title": "Note 1",
                    "url": "data:text/plain;charset=UTF-8,"
                  }
                ],
                "dateAdded": 1622544773300,
                "dateGroupModified": 1622544773317,
                "id": "15178",
                "index": 0,
                "parentId": "1617",
                "title": "Section 3"
              },
              {
                "children": [
                  {
                    "dateAdded": 1622440540250,
                    "id": "15176",
                    "index": 0,
                    "parentId": "15165",
                    "title": "Note 8",
                    "url": "data:text/plain;charset=UTF-8,"
                  },
                  {
                    "dateAdded": 1620890601136,
                    "id": "15172",
                    "index": 1,
                    "parentId": "15165",
                    "title": "LIV-CET 5",
                    "url": "data:text/plain;charset=UTF-8,%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(102,%20102,%20102);%22%3ELIV-CET%205%20Tablet%20belongs%20to%20a%20group%20of%20medicines%20called%20antihistamines.%20It%20is%20used%20to%20treat%20various%20allergic%20conditions%20such%20as%20hay%20fever,%20conjunctivitis,%20some%20skin%20reactions%20such%20as%20eczema,%20hives,%20and%20reactions%20to%20bites%20and%20stings.%20It%20also%20relieves%20watery%20eyes,%20runny%20nose,%20sneezing,%20and%20itching.%3C/span%3E%3Cbr%3E%3Cbr%3E%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(102,%20102,%20102);%22%3ELIV-CET%205%20Tablet%20can%20be%20taken%20with%20or%20without%20food.%20The%20dose%20required%20by%20you%20may%20vary%20depending%20on%20what%20you%20are%20taking%20it%20for.%20This%20medicine%20is%20usually%20taken%20in%20the%20evening,%20but%20follow%20the%20advice%20of%20your%20doctor%20on%20how%20to%20take%20it.%20You%20may%20need%20this%20medicine%20only%20on%20days%20you%20have%20symptoms,%20but%20if%20you%20are%20taking%20it%20to%20prevent%20the%20symptoms%20then%20you%20should%20take%20it%20regularly.%20If%20you%20miss%20doses%20or%20stop%20taking%20it%20earlier%20than%20advised,%20your%20symptoms%20may%20come%20back.%3C/span%3E%3Cbr%3E%3Cbr%3E%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(102,%20102,%20102);%22%3EThis%20medicine%20is%20generally%20very%20safe.%20The%20most%20common%20side%20effects%20include%20feeling%20sleepy%20or%20dizzy,%20dry%20mouth,%20fatigue,%20and%20headache.%20These%20are%20usually%20mild%20and%20go%20away%20after%20a%20couple%20of%20days%20as%20your%20body%20adjusts%20to%20it.%20Consult%20your%20doctor%20if%20any%20of%20the%20side%20effects%20persist%20or%20worry%20you.%3C/span%3E%3Cbr%3E%3Cbr%3E%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(102,%20102,%20102);%22%3EBefore%20taking%20it,%20tell%20your%20doctor%20if%20you%20have%20any%20kidney%20problems%20or%20epilepsy%20(seizures).%20Your%20dose%20may%20need%20to%20be%20modified%20or%20this%20medicine%20may%20not%20suit%20you.%20Some%20other%20medicines%20can%20interact%20with%20this%20medicine%20so%20let%20your%20healthcare%20team%20know%20what%20else%20you%20are%20taking.%20You%20should%20also%20talk%20to%20your%20doctor%20before%20using%20this%20medicine%20if%20you%20are%20pregnant%20or%20breastfeeding,%20although%20it%20is%20not%20thought%20to%20be%20harmful.%3C/span%3E%3Cbr%3E"
                  },
                  {
                    "dateAdded": 1620890411271,
                    "id": "15171",
                    "index": 2,
                    "parentId": "15165",
                    "title": "Atenolol 25mg",
                    "url": "data:text/plain;charset=UTF-8,%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(102,%20102,%20102);%22%3EAten%2025%20Tablet%20belongs%20to%20a%20group%20of%20medicines%20called%20beta-blockers.%20It%20is%20used%20to%20treat%20high%20blood%20pressure%20(hypertension),%20angina%20(heart-related%20chest%20pain),%20irregular%20heart%20rhythms%20(arrhythmia).%20It%20also%20helps%20to%20prevent%20future%20heart%20attacks%20and%20stroke%20and%20to%20prevent%20migraines.%3C/span%3E%3Cbr%3E%3Cbr%3E%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(102,%20102,%20102);%22%3EAten%2025%20Tablet%20is%20also%20used%20to%20relieve%20the%20symptoms%20caused%20by%20an%20overactive%20thyroid%20gland.%20It%20may%20be%20prescribed%20alone%20or%20together%20with%20other%20medications.%20The%20dose%20and%20frequency%20depend%20on%20what%20you%20are%20taking%20it%20for%20and%20the%20severity%20of%20your%20condition.%20It%20may%20be%20taken%20empty%20stomach%20or%20with%20a%20meal,%20but%20take%20it%20regularly%20at%20the%20same%20time%20each%20day%20to%20get%20the%20most%20benefit.%20It%20may%20take%20several%20weeks%20before%20you%20get%20the%20full%20benefit%20of%20this%20medicine%20and%20you%20may%20need%20to%20take%20it%20for%20the%20rest%20of%20your%20life.%20However,%20it%20is%20important%20to%20continue%20taking%20it%20even%20if%20you%20feel%20well.%20Most%20people%20with%20high%20blood%20pressure%20do%20not%20feel%20ill%20and%20if%20you%20stop%20taking%20it,%20your%20condition%20may%20worsen.%3C/span%3E%3Cbr%3E%3Cbr%3E%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(102,%20102,%20102);%22%3EThe%20main%20side%20effects%20of%20this%20medicine%20are%20fatigue,%20slow%20heart%20rate, feeling%20dizzy,%20diarrhea,%20and%20nausea.%20These%20are%20usually%20mild%20and%20short-lived.%20It%20may%20also%20cause%20shortness%20of%20breath%20or%20low%20blood%20pressure%20in%20some%20people.%20To%20reduce%20the%20risk%20of%20side%20effects%20your%20doctor%20will%20probably%20start%20the%20medicine%20at%20a%20low%20dose%20and%20gradually%20increase%20it.%20Consult%20your%20doctor%20if%20the%20side%20effects%20bother%20you%20or%20do%20not%20go%20away.%3C/span%3E%3Cbr%3E"
                  },
                  {
                    "dateAdded": 1620890209199,
                    "id": "15170",
                    "index": 3,
                    "parentId": "15165",
                    "title": "Ciplox 500 Tablet",
                    "url": "data:text/plain;charset=UTF-8,%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(102,%20102,%20102);%22%3ECiplox%20500%20Tablet%20is%20an%20antibiotic,%20used%20in%20the%20treatment%20of%20bacterial%20infections.%20It%20is%20also%20used%20in%20treating%20infections%20of%20the%20urinary%20tract,%20nose,%20throat,%20skin%20and%20soft%20tissues%20and%20lungs%20(pneumonia).%20It%20cures%20the%20infection%20by%20killing%20and%20stopping%20the%20growth%20of%20the%20infectious%20microorganisms.%3C/span%3E%3Cbr%3E%3Cbr%3E%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(102,%20102,%20102);%22%3ECiplox%20500%20Tablet%20should%20be%20used%20in%20the%20dose%20and%20duration%20as%20advised%20by%20your%20doctor.%20It%20may%20be%20taken%20with%20or%20without%20food,%20preferably%20at%20a%20fixed%20time.%20Avoid%20skipping%20any%20doses%20and%20finish%20the%20full%20course%20of%20treatment%20even%20if%20you%20feel%20better.%20Do%20not%20take%20a%20double%20dose%20to%20make%20up%20for%20a%20missed%20dose.%20Simply%20take%20the%20next%20dose%20as%20planned.%3C/span%3E%3Cbr%3E%3Cbr%3E%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(102,%20102,%20102);%22%3EYou%20may%20experience%20nausea%20as%20a%20side%20effect%20of%20this%20medicine.%20This%20is%20usually%20temporary%20and%20resolves%20on%20its%20own,%20but%20please%20consult%20your%20doctor%20if%20it%20bothers%20you%20or%20persists%20for%20a%20longer%20duration.%20Diarrhea%20may%20also%20occur%20as%20a%20side%20effect%20but%20should%20stop%20when%20your%20course%20is%20complete.%20Inform%20your%20doctor%20if%20it%20does%20not%20stop%20or%20if%20you%20find%20blood%20in%20your%20stools.%3C/span%3E%3Cbr%3E"
                  },
                  {
                    "dateAdded": 1620890083905,
                    "id": "15169",
                    "index": 4,
                    "parentId": "15165",
                    "title": "Ivermectin",
                    "url": "data:text/plain;charset=UTF-8,%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(102,%20102,%20102);%22%3EIvecop%206%20Tablet%20is%20an%20antiparasitic%20medication.%20It%20is%20used%20to%20treat%20parasitic%20infections%20of%20your%20intestinal%20tract,%20skin,%20and%20eyes.%3C/span%3E%3Cbr%3E%3Cbr%3E%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(102,%20102,%20102);%22%3EYour%20doctor%20will%20explain%20how%20to%20take%20Ivecop%206%20Tablet%20and%20how%20much%20you%20need.%20Read%20the%20instructions%20that%20come%20with%20the%20medicine%20to%20make%20sure%20you%20take%20it%20correctly.%20Generally,%20it%20is%20taken%20on%20an%20empty%20stomach.%20You%20usually%20need%20to%20take%20it%20only%20once%20to%20get%20rid%20of%20your%20infection.%20However,%20if%20you%20do%20not%20feel%20better%20after%20taking%20it,%20talk%20to%20your%20doctor.%20To%20get%20the%20most%20benefit%20from%20the%20medicine,%20drink%20lots%20of%20fluids%20and%20avoid%20caffeine%20when%20taking%20this%20medication.%3C/span%3E%3Cbr%3E%3Cbr%3E%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(102,%20102,%20102);%22%3EThis%20medicine%20is%20generally%20safe%20with%20little%20or%20no%20side%20effects.%20Your%20doctor%20may%20get%20stool%20and%20blood%20tests%20after%20taking%20the%20medication%20to%20see%20if%20you%20have%20gotten%20rid%20of%20the%20infection.%20Remember%20before%20taking%20it,%20you%20should%20ask%20your%20doctor%E2%80%99s%20advice%20if%20you%20are%20pregnant%20or%20breastfeeding.%3C/span%3E%3Cbr%3E"
                  },
                  {
                    "dateAdded": 1620890026867,
                    "id": "15168",
                    "index": 5,
                    "parentId": "15165",
                    "title": "RotaCaps",
                    "url": "data:text/plain;charset=UTF-8,%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(102,%20102,%20102);%22%3EForacort%20200%20Rotacap%20is%20a%20combination%20of%20two%20medicines%20in%20one%20inhaler.%20It%20relieves%20the%20long-term%20symptoms%20of%20asthma%20and%20COPD,%20making%20breathing%20easier.%20It%20works%20by%20inhibiting%20the%20release%20of%20certain%20chemical%20messengers%20that%20cause%20inflammation%20(swelling)%20and%20relaxes%20the%20muscles%20in%20the%20airways.%3C/span%3E%3Cbr%3E%3Cbr%3E%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(102,%20102,%20102);%22%3EYour%20doctor%20will%20tell%20you%20how%20often%20you%20need%20to%20use%20your%20inhaler.%20The%20effect%20of%20this%20medicine%20may%20be%20noticeable%20after%20a%20few%20days%20but%20will%20only%20reach%20its%20maximum%20after%20a%20few%20weeks.%20This%20medicine%20must%20be%20used%20regularly%20to%20be%20effective,%20so%20go%20on%20taking%20it%20even%20if%20you%20don't%20have%20any%20symptoms.%20That%20means%20it%E2%80%99s%20doing%20its%20job.%20If%20you%20stop%20taking%20it%20your%20symptoms%20may%20get%20worse.%20This%20medicine%20should%20not%20be%20used%20to%20relieve%20sudden%20shortness%20of%20breath.%20If%20sudden%20shortness%20of%20breath%20occurs,%20use%20your%20rescue%20inhaler.%20To%20get%20the%20benefit%20from%20this%20medicine%20you%20need%20to%20make%20sure%20you%20get%20your%20inhaler%20technique%20right,%20otherwise,%20it%20does%20not%20work%20as%20well.%3C/span%3E%3Cbr%3E%3Cbr%3E%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(102,%20102,%20102);%22%3EThe%20most%20common%20side%20effects%20are%20nausea,%20vomiting,%20respiratory%20tract%20infection,%20hoarseness%20of%20voice,%20fungal%20infections%20in%20the%20mouth,%20cough,%20headache,%20sore%20throat,%20musculoskeletal%20(bone,%20muscle%20or%20joint)%20pain,%20and%20increased%20heart%20rate.%20If%20you%20get%20there,%20don%E2%80%99t%20stop%20taking%20it%20but%20do%20talk%20to%20your%20doctor.%20You%20can%20prevent%20some%20of%20these%20symptoms%20by%20rinsing%20your%20mouth%20and%20throat%20with%20water%20or%20brushing%20your%20teeth%20after%20using%20your%20inhaler.%20There%20are%20other,%20rarer%20side%20effects%20which%20can%20be%20serious.%20Talk%20to%20your%20doctor%20if%20you're%20worried%20about%20them.%3C/span%3E%3Cbr%3E"
                  },
                  {
                    "dateAdded": 1620889562217,
                    "id": "15166",
                    "index": 6,
                    "parentId": "15165",
                    "title": "Doxycycline",
                    "url": "data:text/plain;charset=UTF-8,%3Cstrong%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(32,%2033,%2036);%22%3EDoxycycline%3C/strong%3E%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(32,%2033,%2036);%22%3E is%20a%20tetracycline%20antibiotic%20that%20fights%20bacteria%20in%20the%20body. %3C/span%3E%3Cstrong%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(32,%2033,%2036);%22%3EDoxycycline%3C/strong%3E%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(32,%2033,%2036);%22%3E is%20used%20to%20treat%20many%20different%20bacterial%20infections,%20such%20as%20acne,%20urinary%20tract%20infections,%20intestinal%20infections,%20respiratory%20infections,%20eye%20infections,%20gonorrhea,%20chlamydia,%20syphilis,%20periodontitis%20(gum%20disease),%20and%20others.%3C/span%3E%3Cbr%3E"
                  },
                  {
                    "dateAdded": 1620889575209,
                    "id": "15167",
                    "index": 7,
                    "parentId": "15165",
                    "title": "Predmet 4",
                    "url": "data:text/plain;charset=UTF-8,%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(102,%20102,%20102);%22%3EPredmet%204%20Tablet%20is%20a%20medicine%20used%20to%20treat%20wide%20variety%20of%20medical%20conditions%20such%20as%20severe%20allergic%20conditions,%20asthma,%20rheumatic%20disorder,%20skin%20and%20eye%20disorders,%20and%20systemic%20lupus%20erythematosus.%20It%20provides%20relief%20by%20preventing%20the%20release%20of%20substances%20that%20cause%20inflammation.%3C/span%3E%3Cbr%3E%3Cbr%3E%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(102,%20102,%20102);%22%3EPredmet%204%20Tablet%20should%20be%20taken%20with%20food.%3C/span%3E%3Cbr%3E"
                  }
                ],
                "dateAdded": 1620889562210,
                "dateGroupModified": 1622440540254,
                "id": "15165",
                "index": 1,
                "parentId": "1617",
                "title": "Medicine"
              },
              {
                "children": [
                  {
                    "dateAdded": 1622440552186,
                    "id": "15177",
                    "index": 0,
                    "parentId": "15146",
                    "title": "Note 6",
                    "url": "data:text/plain;charset=UTF-8,"
                  },
                  {
                    "dateAdded": 1619675592779,
                    "id": "15162",
                    "index": 1,
                    "parentId": "15146",
                    "title": "Note 4",
                    "url": "data:text/plain;charset=UTF-8,For%203%20days-%3Cbr%3EEmpty%20Stomach%20-%3Cbr%3ETab%20Ivermectin%2012%20mg%3Cbr%3E%3Cbr%3ETab%20*signoflam%20half* (if%20needed%20only)%3Cbr%3E(Pain%20relief)%3Cbr%3E%3Cbr%3EFor%2010%20days%3Cbr%3EAfter%20Breakfast---%3Cbr%3ECap%20*Doxycycline*%20100%20mg%20bd %3Cbr%3ETab%20*predmet*%204%20mg%3Cbr%3E%3Cbr%3EAfter%20Lunch-- %3Cbr%3ETab%20*Limcee*%20500mg%3Cbr%3ETab%20*zincovit*%20%3Cbr%3ETab%20*Levocet%20d*%3Cbr%3E%3Cbr%3EAfter%20Dinner--%3Cbr%3ECap%20*Doxycycline*%20100%20mg %3Cbr%3ETab%20*predmet*%204%20mg%3Cbr%3E%3Cbr%3E"
                  },
                  {
                    "dateAdded": 1620018037612,
                    "id": "15163",
                    "index": 2,
                    "parentId": "15146",
                    "title": "Note 5",
                    "url": "data:text/plain;charset=UTF-8,%3Cstrong%3EPro%20Active%20vs%20Reactive:%3C/strong%3E%3Cbr%3E%3Cul%3E%3Cli%3Equality%20of%20engineers%3C/li%3E%3Cli%3Edependency%3C/li%3E%3Cli%3Elack%20of%20automation%3C/li%3E%3Cli%3Enumber%20of%20variations%3C/li%3E%3C/ul%3E%3Cstrong%3EGetting%20Work%20Done:%3C/strong%3E%3Cbr%3E%3Cul%3E%3Cli%3EDeal%3C/li%3E%3Cli%3EStart%20showing%20authority,%20trust%3C/li%3E%3Cli%3Easking%20questions%20give%20importance%3C/li%3E%3Cli%3Edeserve%20more%20then%20now%3C/li%3E%3C/ul%3E%3Cstrong%3ESuccessful:%3C/strong%3E%3Cbr%3E%3Cul%3E%3Cli%3EVery%20confidence%3Cstrong%3E%20%3C/strong%3Efor%20being%20good%20lead%3C/li%3E%3Cli%3Elearn%20from%20other%20ex.%20perf,%20dependency,%20automation%3C/li%3E%3C/ul%3E%3Cstrong%3EKnowledge:%3C/strong%3E%3Cbr%3E%3Cul%3E%3Cli%3E%3Cstrong%3E%EF%BB%BF%3C/strong%3Estart%20understanding%20outside%20world%20things%3C/li%3E%3Cli%3Ehow%20they%20are%20solving%3C/li%3E%3Cli%3Ehow%20rest%20of%20the%20company%20worlds%3C/li%3E%3Cli%3Eat-least%201%20hr%20reading%3C/li%3E%3C/ul%3E%3Cstrong%3EAmount%20of%20time:%3C/strong%3E%3Cbr%3E%3Cul%3E%3Cli%3Eare%20you%20doing%20justice%20to%20knowledge%3C/li%3E%3Cli%3Ewhat%20work%20you%20need%20to%20pickup%3C/li%3E%3Cli%3Ewhat%20problem%20are%20you%20solving%20for%20your%20team%3C/li%3E%3C/ul%3E"
                  },
                  {
                    "dateAdded": 1615105833847,
                    "id": "15154",
                    "index": 3,
                    "parentId": "15146",
                    "title": "Note 3",
                    "url": "data:text/plain;charset=UTF-8,vivek%3Cbr%3E15years%3Cbr%3E%3Cbr%3EMadhu@12%3Cbr%3E"
                  },
                  {
                    "dateAdded": 1610464848402,
                    "id": "15147",
                    "index": 4,
                    "parentId": "15146",
                    "title": "Note 1",
                    "url": "data:text/plain;charset=UTF-8,SELECT%20CITY,%20LEN%20FROM%20(%3Cbr%3E  SELECT%20CITY,%20LENGTH(CITY)%20AS%20LEN, %3Cbr%3E  ROW_NUMBER()%20OVER(PARTITION%20BY%20LENGTH(CITY)%20ORDER%20BY%20CITY%20ASC)%20AS%20RowNum %3Cbr%3E  FROM%20STATION  %3Cbr%3E)%20as%20T%20WHERE%20RowNum%20=%201%20AND%20LEN%20=%20SELECT%20MAX(LEN(CITY))%20FROM%20STATION%3Cbr%3E"
                  },
                  {
                    "dateAdded": 1614271622297,
                    "id": "15150",
                    "index": 5,
                    "parentId": "15146",
                    "title": "Note 2",
                    "url": "data:text/plain;charset=UTF-8,%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(29,%2028,%2029);%22%3ERobin%20Garcia%20play -->%20Gymnastic%3C/span%3E%3Cbr%3E%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(29,%2028,%2029);%22%3EAshvin%20Vaidyanathan%20play%20--->%20bass%20guitar%3C/span%3E%3Cbr%3E%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(29,%2028,%2029);%22%3EOPSP%20main%20pillers%20-->%20maintain%20optimize%20innovite%3C/span%3E%3Cbr%3E%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(29,%2028,%2029);%22%3EFY21%20Q4%20close-->%2011.5%3C/span%3E%3Cbr%3E%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(29,%2028,%2029);%22%3ECarol%20performance%20-->%2020+%3C/span%3E%3Cbr%3E%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(29,%2028,%2029);%22%3EIgor%20Beckerman%20Zoom%20calls%20-->%20Mute/Audio,%20Video/Link%3C/span%3E%3Cbr%3E%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(29,%2028,%2029);%22%3EScott%20Salkin%20-->%20Graphic%20designer%3C/span%3E%3Cbr%3E%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(29,%2028,%2029);%22%3ENick%20Quarantine%20hobbie%20-->%20golfing%3C/span%3E%3Cbr%3E%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(29,%2028,%2029);%22%3Ejeff%20depa%E2%80%99s%20-->%20Wood%20working,%20chopping,%20dirt%20biking%3C/span%3E%3Cbr%3E%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(29,%2028,%2029);%22%3Eanil%20chalasani%20talent%20-->%20cooking%3C/span%3E%3Cbr%3E%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(29,%2028,%2029);%22%3Ekarl%20phd:%20mathematics%3C/span%3E%3Cbr%3E%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(29,%2028,%2029);%22%3Egainsight%20purpose-->%20to%20be%20living%20proff%20you%20can%20win%20in%20business%20while%20being%20human%20first%3C/span%3E%3Cbr%3E%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(29,%2028,%2029);%22%3ECaitlin%20Quinlans%20weeknd%20hobby%20-->%20hiking%3C/span%3E%3Cbr%3E%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(29,%2028,%2029);%22%3Enew%20acv%20bookings%20Q4-->%2011.7%3C/span%3E%3Cbr%3E%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(29,%2028,%2029);%22%3Ewhat%20did%20tom%20hogan%20from%20vista%20mention%20gainster%20should%20do%20in%20G5-->%20think%20bugger,%20create%20must%20see%20tv%3C/span%3E%3Cbr%3E%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(29,%2028,%2029);%22%3Ejessica%20cash%20mention%20-->%20tap%20into%20ecosystem,%20find%20mentorship,%20get%20involved%3C/span%3E%3Cbr%3E%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(29,%2028,%2029);%22%3Ewho%20designed%20the%20look%20and%20feel%20of%20basecamp%20-->%20hayley%20cromwell,%20kiran%20tanwar%3C/span%3E%3Cbr%3E%3Cspan%20style=%22background-color:%20rgb(255,%20255,%20255);%20color:%20rgb(29,%2028,%2029);%22%3Ewho%20actually%20sang%20all%20the%20parody%20songs%20for%20outcomes%20-->%20Raina%20upton%3C/span%3E%3Cbr%3E"
                  }
                ],
                "dateAdded": 1610464848395,
                "dateGroupModified": 1622440552191,
                "id": "15146",
                "index": 2,
                "parentId": "1617",
                "title": "Section 2"
              }
            ],
            "dateAdded": 1592903938466,
            "dateGroupModified": 1622544773312,
            "id": "1617",
            "index": 0,
            "parentId": "1616",
            "title": "Quick-Notes(Active)"
          },
          {
            "children": [
              {
                "children": [],
                "dateAdded": 1592903938468,
                "dateGroupModified": 1606701323389,
                "id": "1620",
                "index": 0,
                "parentId": "1618",
                "title": "Uncategorised"
              }
            ],
            "dateAdded": 1592903938466,
            "dateGroupModified": 1614135871752,
            "id": "1618",
            "index": 1,
            "parentId": "1616",
            "title": "Quick-Notes(InActive)"
          }
        ],
        "dateAdded": 1592903938461,
        "dateGroupModified": 1592903938466,
        "id": "1616",
        "index": 1,
        "parentId": "2",
        "title": "Quick-Notes(DO_NOT_TOUCH)"
      }
    ],
    "dateAdded": 1549373942155,
    "dateGroupModified": 1594820920719,
    "id": "2",
    "index": 1,
    "parentId": "0",
    "title": "Other Bookmarks"
  }
];
