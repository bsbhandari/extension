import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChromeApiService {

  sections: BehaviorSubject<any> = new BehaviorSubject({ title: 'home', data: TEMP_DATA });
  deletedSections: BehaviorSubject<any> = new BehaviorSubject({ title: 'deleted', data: TEMP_DATA });
  constructor() { }

  get(id: string) {
    const responseObs = new Observable(observer => {
      chrome.bookmarks.get(id, (response: any[]) => {
        observer.next(response);
        observer.complete();
      });
    });
    return responseObs;
  }

  getSubTree(id) {
    const responseObs = new Observable(observer => {
      chrome.bookmarks.getSubTree(id, (response: any[]) => {
        observer.next(response);
        observer.complete();
      });
    });
    return responseObs;
  }

  getChildren(id: string) {
    const responseObs = new Observable(observer => {
      chrome.bookmarks.getChildren(id, (response: any[]) => {
        observer.next(response);
        observer.complete();
      });
    });
    return responseObs;
  }

  create(bookmark: any) {
    const responseObs = new Observable(observer => {
      chrome.bookmarks.create(bookmark, (response: any) => {
        observer.next(response);
        observer.complete();
      });
    });
    return responseObs;
  }

  move(id, destination) {
    const responseObs = new Observable(observer => {
      chrome.bookmarks.move(id, destination, (response: any) => {
        observer.next(response);
        observer.complete();
      });
    });
    return responseObs;
  }

  update(id, changes) {
    const responseObs = new Observable(observer => {
      chrome.bookmarks.update(id, changes, (response: any) => {
        observer.next(response);
        observer.complete();
      });
    });
    return responseObs;
  }

  remove(id) {
    const responseObs = new Observable(observer => {
      chrome.bookmarks.remove(id, (response) => {
        observer.next(response);
        observer.complete();
      });
    });
    return responseObs;
  }

  removeTree(id) {
    const responseObs = new Observable(observer => {
      chrome.bookmarks.removeTree(id, (response) => {
        observer.next(response);
        observer.complete();
      });
    });
    return responseObs;
  }
}


export const TEMP_DATA = [
  {
    title: 'Home 1',
    data: [{
      title: 'Day 1',
      description: 'hello test 1'
    },
    {
      title: 'Day 2',
      description: 'hello test 2'
    },
    {
      title: 'Day 3',
      description: 'hello test 3'
    }, {
      title: 'Day 4',
      description: 'hello test 4'
    }, {
      title: 'Day 5',
      description: 'hello test5'
    }, {
      title: 'Day 6',
      description: 'hello test 6'
    },
    ]
  }, {
    title: 'Home 2',
    data: [{
      title: 'Home 2 Day 1',
      description: 'Home 2 hello test 1'
    },
    {
      title: 'Home 2 Day 2',
      description: 'Home 2 hello test 2'
    },
    {
      title: 'Home 2 Day 3',
      description: 'Home 2 hello test 3'
    }, {
      title: 'Home 2 Day 4',
      description: 'Home 2 hello test 4'
    }, {
      title: 'Home 2 Day 5',
      description: 'Home 2 hello test5'
    }, {
      title: 'Home 2 Day 6',
      description: 'Home 2 hello test 6'
    },
    ]
  }
]


export const TRASSH_DATA = [
  {
    title: 'Home wewr',
    data: [{
      title: 'Day wer',
      description: 'hellower test 1'
    },
    {
      title: 'Day ewr',
      description: 'hello test 2'
    },
    {
      title: 'Day wer',
      description: 'hello test 3'
    }]
  }, {
    title: 'Homwerwee 2',
    data: [{
      title: 'Home 2 Dweray 1',
      description: 'Homwere 2 hello test 1'
    },
    {
      title: 'Home 2 Dawery 2',
      description: 'Homewer 2 hello test 2'
    }]
  }
]
