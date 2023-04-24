import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges{
  @Input() currentPage = 1;
  @Input() total = 0;

  @Output() goTo: EventEmitter<number> = new EventEmitter<number>()
  @Output() next: EventEmitter<number> = new EventEmitter<number>()
  @Output() previous: EventEmitter<number> = new EventEmitter<number>()

  pages: number[] = [];

  public onGoTo(page: number): void {
    this.goTo.emit(page)
  }
  public onNext(): void {
    this.next.emit(this.currentPage)
  }
  public onPrevious(): void {
    this.previous.next(this.currentPage)
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes["currentPage"] && changes['currentPage'].currentValue) ||
      (changes['total'] && changes["total"].currentValue)
    ) {
      this.pages = this.getPages(this.currentPage, this.total);
    }
  }
  private getPages(current: number, total: number): number[] {
    if (total <= 7) {
      return [...Array(total).keys()].map((x) => ++x);
    }

    if (current > 5) {
      if (current >= total - 4) {
        return [1, -1, total - 4, total - 3, total - 2, total - 1, total];
      } else {
        return [1, -1, current - 1, current, current + 1, -1, total];
      }
    }

    return [1, 2, 3, 4, 5, -1, total];
  }

}
