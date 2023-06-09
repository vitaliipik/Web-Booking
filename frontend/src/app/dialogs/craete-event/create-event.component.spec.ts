import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateEventComponent} from './create-event.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Observable, of, throwError} from "rxjs";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {EventService} from "../../services/event.service";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('CreateEventComponent', () => {
  let component: CreateEventComponent;
  let el: DebugElement;
  let fixture: ComponentFixture<CreateEventComponent>;
  let dialogRef: MatDialogRef<CreateEventComponent>;
  let formBuilder: FormBuilder;
  // let eventService: jasmine.SpyObj<EventService>;
  const mockEventService = jasmine.createSpyObj('EventService', ['uploadImage', 'postEvent','updateEvent']);

  const dialogMock = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    backdropClick: () => {
      return of(true)
    }
  };

  beforeEach(async () => {
    const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close', 'backdropClick']);
    mockDialogRef.backdropClick.and.returnValue(of(true))


    await TestBed.configureTestingModule({
      imports: [MatDialogModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [CreateEventComponent],
      providers: [
        {provide: MatDialogRef, useValue: mockDialogRef},
        {provide: EventService, useValue: mockEventService},
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreateEventComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef);
    // eventService = TestBed.inject(EventService);
    el = fixture.debugElement;

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
  it('should close the dialog when backdrop is clicked', () => {
    component["dialogRef"].backdropClick().subscribe(() => {
      expect(dialogRef.close).toHaveBeenCalled();
    });
  });

  it('should display an error alert if a non-image file is selected', () => {
    const event = {target: {files: [{type: 'text/plain', name: 'text.txt'}]}};
    const alertSpy = spyOn(window, 'alert');

    component.selectFile(event);

    expect(component.formImage.get('image')).toBeNull();
    expect(component.filename).toEqual('');
    expect(alertSpy).toHaveBeenCalledWith('Only images are supported');
  });
  it('should set formImage and filename when a valid image file is selected', () => {
    const file: File = new File([], 'image.png', {type: 'image/png'});
    const event = {target: {files: [file]}};
    component.selectFile(event);

    expect(component.formImage.get('image')).toEqual(file);
    expect(component.filename).toEqual(file.name);
  });

  describe('Form Validation', () => {
    it('should be invalid when form controls are empty', () => {
      expect(component.form.valid).toBeFalsy();
    });

    it('should be invalid when required fields are not filled', () => {
      const nameControl = component.form.controls['name'];
      const addressControl = component.form.controls['address'];
      const dateControl = component.form.controls['date'];
      const ticketsCountControl = component.form.controls['tickets_count'];

      nameControl.setValue('');
      addressControl.setValue('');
      dateControl.setValue('');
      ticketsCountControl.setValue('');

      expect(component.form.valid).toBeFalsy();
      expect(nameControl.errors).toBeTruthy();
      expect(addressControl.errors?.["required"]).toBeTruthy();
      expect(dateControl.errors?.["required"]).toBeTruthy();
      expect(ticketsCountControl.errors?.["required"]).toBeTruthy();
    });

    it('should be invalid when tickets count is not a number or out of range', () => {
      const ticketsCountControl = component.form.controls['tickets_count'];

      ticketsCountControl.setValue('abc');


      expect(component.form.valid).toBeFalsy();

      ticketsCountControl.setValue(-1);
      expect(component.form.valid).toBeFalsy();
      expect(ticketsCountControl.errors?.["min"]).toBeTruthy();

      ticketsCountControl.setValue(3000);
      expect(component.form.valid).toBeFalsy();
      expect(ticketsCountControl.errors?.["max"]).toBeTruthy();
    });

  });

  describe('Form Submission', () => {
    beforeEach(() => {
      component.form.controls['name'].setValue('Event Name');
      component.form.controls['address'].setValue('Event Address');
      component.form.controls['date'].setValue('2023-06-06');
      component.form.controls['tickets_count'].setValue(100);
      spyOn(window, 'alert');
    });
    it('should upload the image and post the event when the form is valid', () => {
      // const formValue = {
      //   name: 'Test Event',
      //   address: 'Test Address',
      //   date: '2023-06-07',
      //   tickets_count: 100,
      //   image: 'test.png',
      // };
      // const uploadImageResponse = {success: true};
      // const postEventResponse = {success: true};
      // const uploadImageSpy = mockEventService.uploadImage.and.returnValue(of(uploadImageResponse));
      // const postEventSpy = mockEventService.postEvent.and.returnValue(of(postEventResponse));
      //
      //
      // // component.form.patchValue(formValue);
      // component.form.patchValue(formValue)
      // component.onSubmit();
      // const dialogRefCloseSpy = dialogRef.close;
      // expect(uploadImageSpy).toHaveBeenCalledWith(component.formImage);
      // expect(postEventSpy).toHaveBeenCalledWith(formValue);
      // expect(dialogRefCloseSpy).toHaveBeenCalled();
    });

    it('should display an error alert if there is an error during image upload', () => {
      // const formValue = {
      //   name: 'Test Event',
      //   address: 'Test Address',
      //   date: '2023-06-07',
      //   tickets_count: 100,
      //   image: 'test.png',
      // };
      // const uploadImageError = {error: 'Image upload failed'};
      // const uploadImageSpy = mockEventService.uploadImage.and.returnValue(of(uploadImageError));
      // const alertSpy = spyOn(window, 'alert');
      //
      // component.form.patchValue(formValue);
      // fixture.detectChanges()
      // component.onSubmit();
      //
      // expect(uploadImageSpy).toHaveBeenCalledWith(component.formImage);
      // expect(alertSpy).toHaveBeenCalledWith(uploadImageError.error);
    });


    it('should upload the image and post the event when form is valid', () => {
      const imageFile = new File(['image'], 'event-image.png', {type: 'image/png'});
      component.formImage.append('image', imageFile, "event-image.png")
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(imageFile)

      // spyOn(component.formImage, 'append');

      const postEventResponse = {success: true};
      // component.form = formBuilder.group({
      //   name: ['Event Name', Validators.required],
      //   address: ['Event Address', Validators.required],
      //   date: ['2023-06-15', Validators.required],
      //   tickets_count: [100, [Validators.required, Validators.min(0), Validators.max(2000)]],
      //   image: ['event-image.jpg', Validators.required]
      // });
      component.formImage.append('file',imageFile)
      const uploadImageResponse = {success: true};
      mockEventService.uploadImage.and.returnValue(of(uploadImageResponse));
      mockEventService.postEvent.and.returnValue(of(postEventResponse));
      const inputDebugEl = el.query(By.css('input[type=file]'));
      inputDebugEl.nativeElement.files = dataTransfer.files
      const event = {target: {files: [imageFile]}};
      fixture.detectChanges()
      component.selectFile(event)

      // component.form.controls['image'].setValue(event);
      const fileSelect = new Event('change');
      // inputDebugEl.triggerEventHandler('change',{target: inputDebugEl.nativeElement });
      // inputDebugEl.nativeElement.dispatchEvent(fileSelect)
      fixture.detectChanges()
  component.form.controls['image'].setErrors(null);
      fixture.detectChanges()
      component.onSubmit();

      // expect(component.formImage.append).toHaveBeenCalledWith('image', imageFile, 'event-image.png');
      // expect(mockEventService.uploadImage).toHaveBeenCalledWith(imageFormData);
      expect(component.form.value.image).toEqual('event-image.png');
      expect(mockEventService.postEvent).toHaveBeenCalledWith(component.form.value);
      expect(dialogRef.close).toHaveBeenCalled();
    });

    it('should display an error alert when image upload fails', () => {
      const imageFile = new File(['image'], 'event-image.png', {type: 'image/png'});

      const res = {error:{status:400 ,message: 'Image upload failed'}};
      const errorResponse = throwError(res
      );

      const event = {target: {files: [imageFile]}};
      mockEventService.uploadImage.and.returnValue(errorResponse);
      // mockEventService.postEvent.and.returnValue(of(errorResponse));
      const inputDebugEl = el.query(By.css('input[type=file]'));
      inputDebugEl.triggerEventHandler('change',event);
      component.form.controls['image'].setErrors(null);
fixture.detectChanges()
      component.onSubmit();

      expect(window.alert).toHaveBeenCalledWith(res.error.message);
    });

  });


  it('should return when form invalid', () => {
    mockEventService.updateEvent.and.returnValue(of({}));

    // Set form values
    component.stateDialog = true;
    component.id = '123';
    component.form.patchValue({
      name: 'Event Name',
      address: 'Event Address',
      date: '2023-06-08',
      tickets_count: 100,
    });

    // Trigger form submission
    component.onSubmit();


    expect(component.form.valid).toBeFalsy();
  });

  it('should close the dialog after successful event update', () => {
    mockEventService.updateEvent.and.returnValue(of({}));
    mockEventService.uploadImage.and.returnValue(of({}));

    // Set form values
    component.stateDialog = true;
    component.id = '123';
    component.form.patchValue({
      name: 'Event Name',
      address: 'Event Address',
      date: '2023-06-08',
      tickets_count: 100,
    });
    component.form.controls['image'].setErrors(null);

    // Trigger form submission
    component.onSubmit();

    expect(mockEventService.updateEvent).toHaveBeenCalledWith({
      ...component.form.value,
      id: component.id,
    });
    expect(component["dialogRef"].close).toHaveBeenCalled();
  });

  it('should display an error alert when update event fails', () => {
    component.stateDialog = true;
    const res ={error: {status:400 ,message: 'Image upload failed'}};
    const errorResponse = new Observable((stat)=>{stat.error(res)}
    );
    spyOn(window, 'alert');

    mockEventService.uploadImage.and.returnValue(of({}));
    mockEventService.updateEvent.and.returnValue(errorResponse);
    // mockEventService.postEvent.and.returnValue(of(errorResponse));
    component.form.patchValue({
      name: 'Event Name',
      address: 'Event Address',
      date: '2023-06-08',
      tickets_count: 100,
    });
    const imageFile = new File(['image'], 'event-image.png', {type: 'image/png'});
    const event = {target: {files: [imageFile]}};

    const inputDebugEl = el.query(By.css('input[type=file]'));
    inputDebugEl.triggerEventHandler('change',event);

    component.form.controls['image'].setErrors(null);
    fixture.detectChanges()
    component.onSubmit();
    expect(component["dialogRef"].close).toHaveBeenCalled();

    expect(window.alert).toHaveBeenCalledWith(res.error.message);
  });
});
