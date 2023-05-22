import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownSearchComponent } from './dropdown-search.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('DropdownSearchComponent', () => {
  let component: DropdownSearchComponent;
  let fixture: ComponentFixture<DropdownSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule],
      declarations: [ DropdownSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
