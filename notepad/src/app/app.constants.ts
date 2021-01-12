export const APP_CONSTANTS = {
  OTHER_BOOKMARKS_ID: '2',
  APP_FOLDER: 'Quick-Notes(DO_NOT_TOUCH)',
  ACTIVE_FOLDER: 'Quick-Notes(Active)',
  INACTIVE_FOLDER: 'Quick-Notes(InActive)',
  SECTION_DEFAULT_NAME: 'Section',
  NOTE_DEFAULT_NAME: 'Note',
  INACTIVE_NOTES: 'Uncategorised',
  URL_PREFIX: 'data:text/plain;charset=UTF-8,',
  GET_NOTE_NAME: (length) => `${APP_CONSTANTS.NOTE_DEFAULT_NAME} ${length}`,
  GET_SECTION_NAME: (length) => `${APP_CONSTANTS.SECTION_DEFAULT_NAME} ${length}`,
  DEFAULT_SECTION: 'Chrome Notes',
  DEFAULT_NOTE: (parentId) => {
    return {
      parentId,
      title: 'About',
      url: `${APP_CONSTANTS.URL_PREFIX}What%20we%20provide%3Cbr%3E%3Col%3E%3Cli%3ELightning%20fast%20experience.%3C/li%3E%3Cli%3ENo%20login%20required.%3C/li%3E%3Cli%3EFormatting%20options.%3C/li%3E%3Cli%3ERecycle%20Bin.%3C/li%3E%3Cli%3EManage%20notes%20in%20categories%3C/li%3E%3Cli%3EAutomatically%20sync%20with%20chrome.%3C/li%3E%3C/ol%3E%3Cbr%3ERoadMap%3Cbr%3E%3Col%3E%3Cli%3ESearch%20capabilities.%3C/li%3E%3Cli%3ECopy%20to%20clipboard.%3C/li%3E%3Cli%3EPrint%20notes.%3C/li%3E%3Cli%3EDark%20mode%20(Themes).%3C/li%3E%3Cli%3EDownload.%3C/li%3E%3C/ol%3E`
    }
  },
  EDITOR_OPTIONS: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['clean'],
    ]
  }

}
