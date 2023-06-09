import {Component, Inject} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserItem} from "../../models/user.model";
import {map, Observable, of, tap} from "rxjs";
import {catchError} from "rxjs/operators";
import {EventService} from "../../services/event.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-craete-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent {
  form!: FormGroup;
  formImage = new FormData();
  url: any; //Angular 11, for stricter type
  filename = "";
  textSubmit = "";
  stateDialog=true;
  id='';

  constructor(private dialogRef: MatDialogRef<CreateEventComponent>,
              private builder: FormBuilder,
              private eventService: EventService,
              @Inject(MAT_DIALOG_DATA) public data:{state:boolean,id:string}) {
    dialogRef.disableClose = true;
    dialogRef.backdropClick().subscribe(_ => {
      dialogRef.close();
    })
    this.stateDialog=data.state
    this.id=data.id
    if(this.stateDialog){
      this.textSubmit="Edit"
    }
    else{
      this.textSubmit='Add Event'
    }
    this.initForm()
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    this.eventService.uploadImage(this.formImage).subscribe({
      next: () => {
        this.form.value.image = this.filename;
        let functions:Observable<any>;
        if(this.stateDialog){
          const value=this.form.value
          value['id']=this.id
          functions=this.eventService.updateEvent(value)

        }
        else {

          functions=this.eventService.postEvent(this.form.value)

         }

          functions.subscribe({
          next: () => {
            this.dialogRef.close();
          },
          error: (err) => {
              alert(err.error.message)

          }
        })
      },
    error: (err) => {
        alert(err.error.message)
    }
    })

  }


  selectFile(event: any) {

    const mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {

      alert("Only images are supported");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    this.formImage.append("image", event.target.files[0], event.target.files[0].name);
    this.filename = event.target.files[0].name;
  }

  private initForm() {
    this.form = this.builder.group({
      name: ["", Validators.required],
      address: ["", Validators.required],
      date: ["", Validators.required],
      tickets_count: ["", [Validators.required, Validators.min(0), Validators.max(2000)]],
      image: [null, Validators.required]
    },)

  }


}
