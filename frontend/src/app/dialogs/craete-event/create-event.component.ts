import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserItem} from "../../models/user.model";
import {map, of, tap} from "rxjs";
import {catchError} from "rxjs/operators";
import {EventService} from "../../services/event.service";

@Component({
  selector: 'app-craete-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent  {
  constructor(private dialogRef: MatDialogRef<CreateEventComponent>,
  private builder:FormBuilder,
              private eventService:EventService) {
    dialogRef.disableClose = true;
    dialogRef.backdropClick().subscribe(_ => {
      dialogRef.close();
    })
    this.initForm()
  }


  form!: FormGroup;
  formImage=new FormData();

  private initForm() {
    this.form = this.builder.group({
      name: ["", Validators.required],
      address: ["", Validators.required],
      date: ["", Validators.required],
      tickets_count: ["", [Validators.required,Validators.min(0),Validators.max(2000)]],

    },)

     }
  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    this.eventService.uploadImage(this.formImage).subscribe({
      next:()=> {
        this.form.value.image=this.filename;
        this.eventService.postEvent(this.form.value).subscribe({
          next:()=> {
            this.dialogRef.close();
          },
          error:(err)=>{
            if(typeof err.error === 'object' && err.error !== null){
              alert(err.error.message)
            }
            else {
              alert(err.error);
            }
          }})
      },
      error:(err)=>{
        if(typeof err.error === 'object' && err.error !== null){
          alert(err.error.message)
        }
        else {
          alert(err.error);
        }
      }})

  }



  url: any; //Angular 11, for stricter type
  filename = "";

  //selectFile(event) { //Angular 8
  selectFile(event: any) { //Angular 11, for stricter type
    if(!event.target.files[0] || event.target.files[0].length == 0) {
      alert('You must select an image');
      return;
    }

    const mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {

      alert("Only images are supported");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

this.formImage.append("image",event.target.files[0],event.target.files[0].name);
  this.filename=event.target.files[0].name;
  }





}
