import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventManagementComponent } from './event-management.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatDialogModule} from "@angular/material/dialog";
import {FilterEventPipe} from "../pipe/filter-event.pipe";
import {PopupComponent} from "../popup/popup.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('EventManagementComponent', () => {
  let component: EventManagementComponent;
  let fixture: ComponentFixture<EventManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule
     ],
      declarations: [ EventManagementComponent,
        FilterEventPipe,
      PopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
