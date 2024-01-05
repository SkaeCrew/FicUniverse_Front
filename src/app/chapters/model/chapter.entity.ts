export class Chapter {
  id: number;
  bookId: number;
  chapterOrder: number;
  title: string;
  content: string;
  constructor() {
    this.id = 0;
    this.bookId = 0;
    this.chapterOrder = 0;
    this.title = '';
    this.content = '';
  }
}
