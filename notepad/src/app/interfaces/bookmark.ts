export interface Bookmark {
  id: string;
  parentId?: string;
  index?: string;
  url?: string;
  title: string;
  dateAdded?: string;
  dateGroupModified?: string;
  children?: Bookmark[];
}
