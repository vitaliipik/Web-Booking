import {Component, ElementRef} from '@angular/core';

@Component({
  selector: 'app-dropdown-search',
  templateUrl: './dropdown-search.component.html',
  styleUrls: ['./dropdown-search.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class DropdownSearchComponent {
  constructor(private _eref: ElementRef) { }

  onClick(event: Event):any {
    if (!this._eref.nativeElement.contains(event.target)) // or some similar check
      this.toggle=true
  }

  toggle:boolean=false;
  fetchSeries(event: any): any {
    if (event.target.value === '') {
      return this.searchResult = [];
    }
    this.searchResult = this.seriesList.filter((series) => {
      return series.president.toLowerCase().includes(event.target.value.toLowerCase());
    }).slice(0,5)
    this.toggle=false;
  }
  public searchInput:String = '';
  public searchResult: Array<any> = [];

  seriesList:Array<any>  = [ { "number": 1, "president": "George Washington", "birth_year": 1732, "death_year": 1799, "took_office": "1789-04-30", "left_office": "1797-03-04", "party": "No Party" },
    { "number": 2, "president": "John Adams", "birth_year": 1735, "death_year": 1826, "took_office": "1797-03-04", "left_office": "1801-03-04", "party": "Federalist" },
    { "number": 3, "president": "Thomas Jefferson", "birth_year": 1743, "death_year": 1826, "took_office": "1801-03-04", "left_office": "1809-03-04", "party": "Democratic-Republican" },
    { "number": 4, "president": "James Madison", "birth_year": 1751, "death_year": 1836, "took_office": "1809-03-04", "left_office": "1817-03-04", "party": "Democratic-Republican" },
    { "number": 5, "president": "James Monroe", "birth_year": 1758, "death_year": 1831, "took_office": "1817-03-04", "left_office": "1825-03-04", "party": "Democratic-Republican" },
    { "number": 6, "president": "John Quincy Adams", "birth_year": 1767, "death_year": 1848, "took_office": "1825-03-04", "left_office": "1829-03-04", "party": "Democratic-Republican" },
    { "number": 7, "president": "Andrew Jackson", "birth_year": 1767, "death_year": 1845, "took_office": "1829-03-04", "left_office": "1837-03-04", "party": "Democratic" },
    { "number": 8, "president": "Martin Van Buren", "birth_year": 1782, "death_year": 1862, "took_office": "1837-03-04", "left_office": "1841-03-04", "party": "Democratic" },
    { "number": 9, "president": "William Henry Harrison", "birth_year": 1773, "death_year": 1841, "took_office": "1841-03-04", "left_office": "1841-04-04", "party": "Whig" },
    { "number": 10, "president": "John Tyler", "birth_year": 1790, "death_year": 1862, "took_office": "1841-04-04", "left_office": "1845-03-04", "party": "Whig" },
    { "number": 11, "president": "James K. Polk", "birth_year": 1795, "death_year": 1849, "took_office": "1845-03-04", "left_office": "1849-03-04", "party": "Democratic" },
    { "number": 12, "president": "Zachary Taylor", "birth_year": 1784, "death_year": 1850, "took_office": "1849-03-04", "left_office": "1850-07-09", "party": "Whig" },
    { "number": 13, "president": "Millard Fillmore", "birth_year": 1800, "death_year": 1874, "took_office": "1850-07-09", "left_office": "1853-03-04", "party": "Whig" },
    { "number": 14, "president": "Franklin Pierce", "birth_year": 1804, "death_year": 1869, "took_office": "1853-03-04", "left_office": "1857-03-04", "party": "Democratic" },
    { "number": 15, "president": "James Buchanan", "birth_year": 1791, "death_year": 1868, "took_office": "1857-03-04", "left_office": "1861-03-04", "party": "Democratic" },
    { "number": 16, "president": "Abraham Lincoln", "birth_year": 1809, "death_year": 1865, "took_office": "1861-03-04", "left_office": "1865-04-15", "party": "Republican" },
    { "number": 17, "president": "Andrew Johnson", "birth_year": 1808, "death_year": 1875, "took_office": "1865-04-15", "left_office": "1869-03-04", "party": "Democratic" },
    { "number": 18, "president": "Ulysses S. Grant", "birth_year": 1822, "death_year": 1885, "took_office": "1869-03-04", "left_office": "1877-03-04", "party": "Republican" },
    { "number": 19, "president": "Rutherford B. Hayes", "birth_year": 1822, "death_year": 1893, "took_office": "1877-03-04", "left_office": "1881-03-04", "party": "Republican" }];
}
