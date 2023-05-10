import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupComponent } from './popup.component';
import {MatDialogRef} from "@angular/material/dialog";
import {of} from "rxjs";
import {Input} from "@angular/core";

describe('PopupComponent', () => {
  let component: PopupComponent;
  let fixture: ComponentFixture<PopupComponent>;
  const id = 'modal-1'
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupComponent ],
      providers:[
        {
          provide:Input(),
          useValue: {},
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
