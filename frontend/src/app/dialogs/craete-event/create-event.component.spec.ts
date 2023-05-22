import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventComponent } from './create-event.component';
import {MatDialogModule, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatMenuModule} from "@angular/material/menu";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {of} from "rxjs";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('CraeteEventComponent', () => {
  let component: CreateEventComponent;
  let fixture: ComponentFixture<CreateEventComponent>;

  const dialogMock = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    backdropClick: () => { return of(true)}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatDialogModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [ CreateEventComponent ] ,
      providers:[
        {
          provide:MatDialogRef,
          useValue: dialogMock
        }
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('dialog should be closed after onYesClick()', () => {
  //   let spy = spyOn(component.dialogRef, 'close').and.callThrough();
  //   component.onYesClick();
  //   expect(spy).toHaveBeenCalled();
  // });
});
