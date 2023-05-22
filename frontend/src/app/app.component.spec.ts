import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {HeaderComponent} from "./header/header.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {SpinnerComponent} from "./spinner/spinner.component";
import {DropdownSearchComponent} from "./header/dropdown-search/dropdown-search.component";
import {MatMenuModule} from "@angular/material/menu";
import {FormsModule} from "@angular/forms";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatMenuModule,
        FormsModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        SpinnerComponent,
        DropdownSearchComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('frontend');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('frontend app is running!');
  // });
});
