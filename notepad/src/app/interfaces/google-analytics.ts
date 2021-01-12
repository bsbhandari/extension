export interface Analytics {
  eventName: string,
  event: Event
}

export interface Event {
  eventCategory: string,
  eventLabel: string,
  eventAction: string,
  eventValue: string
}


export const AnalyticsEventMap = {
  NOTEBOOK_OPENED: {
    eventName: 'NOTEBOOK_OPENED',
    event: {
      eventCategory: 'INITILIZATION',
      eventLabel: 'Notebook Opened',
      eventAction: 'init',
      eventValue: '1'
    }
  },
  OPEN_TRASH: {
    eventName: 'TRASH_OPENED',
    event: {
      eventCategory: 'VIEW_MODE',
      eventLabel: 'Trash Opened',
      eventAction: 'click',
      eventValue: '0'
    }
  },
  CLOSE_TRASH: {
    eventName: 'TRASH_CLOSED',
    event: {
      eventCategory: 'VIEW_MODE',
      eventLabel: 'Trash CLosed',
      eventAction: 'click',
      eventValue: '0'
    }
  },
  SELECT_NODE: {
    eventName: 'SELECT_NODE',
    event: {
      eventCategory: 'VIEW_MODE',
      eventLabel: 'Node Selected',
      eventAction: 'click',
      eventValue: '0'
    }
  },
  ADD_SECTION: {
    eventName: 'ADD_SECTION',
    event: {
      eventCategory: 'CRUD_OPERATION',
      eventLabel: 'Section Created',
      eventAction: 'click',
      eventValue: '0'
    }
  },
  ADD_NOTE: {
    eventName: 'ADD_NOTE',
    event: {
      eventCategory: 'CRUD_OPERATION',
      eventLabel: 'Note Created',
      eventAction: 'click',
      eventValue: '0'
    }
  },
  SIDE_NAV_CLOSE: {
    eventName: 'SIDE_NAV_CLOSE',
    event: {
      eventCategory: 'GENERAL',
      eventLabel: 'Side Nav close',
      eventAction: 'click',
      eventValue: '0'
    }
  },
  SIDE_NAV_OPEN: {
    eventName: 'SIDE_NAV_OPEN',
    event: {
      eventCategory: 'GENERAL',
      eventLabel: 'Side Nav Opened',
      eventAction: 'click',
      eventValue: '1'
    }
  },
  OPEN_FB: {
    eventName: 'OPEN_FB',
    event: {
      eventCategory: 'GENERAL',
      eventLabel: 'Open Facebook',
      eventAction: 'click',
      eventValue: '1'
    }
  },
  OPEN_TWITTER: {
    eventName: 'OPEN_TWITTER',
    event: {
      eventCategory: 'GENERAL',
      eventLabel: 'Open Twitter',
      eventAction: 'click',
      eventValue: '1'
    }
  },
  EDIT_SECTION: {
    eventName: 'EDIT_SECTION',
    event: {
      eventCategory: 'CRUD_OPERATION',
      eventLabel: 'Edit Section',
      eventAction: 'click',
      eventValue: '1'
    }
  },
  EDIT_NOTE: {
    eventName: 'EDIT_NOTE',
    event: {
      eventCategory: 'CRUD_OPERATION',
      eventLabel: 'Edit Note',
      eventAction: 'click',
      eventValue: '1'
    }
  },
  DELETE_INACTIVE_SECTION: {
    eventName: 'DELETE_INACTIVE_SECTION',
    event: {
      eventCategory: 'CRUD_OPERATION',
      eventLabel: 'Delete InActive Section',
      eventAction: 'click',
      eventValue: '1'
    }
  },
  DELETE_SECTION: {
    eventName: 'DELETE_SECTION',
    event: {
      eventCategory: 'CRUD_OPERATION',
      eventLabel: 'Delete Section',
      eventAction: 'click',
      eventValue: '1'
    }
  },
  DELETE_INACTIVE_NOTE: {
    eventName: 'DELETE_INACTIVE_NOTE',
    event: {
      eventCategory: 'CRUD_OPERATION',
      eventLabel: 'Delete InActive Note',
      eventAction: 'click',
      eventValue: '1'
    }
  },
  DELETE_NOTE: {
    eventName: 'DELETE_NOTE',
    event: {
      eventCategory: 'CRUD_OPERATION',
      eventLabel: 'Delete Note',
      eventAction: 'click',
      eventValue: '1'
    }
  },
  RENAME_NOTE: {
    eventName: 'RENAME_NOTE',
    event: {
      eventCategory: 'CRUD_OPERATION',
      eventLabel: 'Rename Note',
      eventAction: 'click',
      eventValue: '1'
    }
  },
  RENAME_SECTION: {
    eventName: 'RENAME_SECTION',
    event: {
      eventCategory: 'CRUD_OPERATION',
      eventLabel: 'Rename Section',
      eventAction: 'click',
      eventValue: '1'
    }
  },
  MOVE_SECTION: {
    eventName: 'MOVE_SECTION',
    event: {
      eventCategory: 'CRUD_OPERATION',
      eventLabel: 'Move Section',
      eventAction: 'click',
      eventValue: '1'
    }
  },
  MOVE_NOTE: {
    eventName: 'MOVE_NOTE',
    event: {
      eventCategory: 'CRUD_OPERATION',
      eventLabel: 'Move Note',
      eventAction: 'click',
      eventValue: '1'
    }
  }
}


