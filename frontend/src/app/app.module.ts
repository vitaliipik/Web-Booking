import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { EventListComponent } from './event-list/event-list.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TicketComponent } from './ticket/ticket.component';
import {AuthInterceptor} from "./services/auth.interceptor";
import { AccountComponent } from './account/account.component';
import {StorageService} from "./services/storage.service";


import {FilterPipe} from "./pipe/filter.pipe";
import { DropdownSearchComponent } from './header/dropdown-search/dropdown-search.component';
import { AdminComponent } from './admin/admin.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SpinnerComponent } from './spinner/spinner.component';
import {LoadingInterceptor} from "./services/loading.interceptor";
import { EventDetailComponent } from './event-detail/event-detail.component';
import { PopupComponent } from './popup/popup.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { EventManagementComponent } from './event-management/event-management.component';
import {FilterEventPipe} from "./pipe/filter-event.pipe";
import { CreateEventComponent } from './dialogs/craete-event/create-event.component';
import {MatDialogModule} from "@angular/material/dialog";
import { ErrorsComponent } from './errors/errors.component';


import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EventListComponent,
    RegisterComponent,
    LoginComponent,
    TicketComponent,
    AccountComponent


    ,FilterPipe, DropdownSearchComponent, AdminComponent, PaginationComponent, SpinnerComponent, EventDetailComponent, PopupComponent, UserManagementComponent, EventManagementComponent
    ,FilterEventPipe, CreateEventComponent, ErrorsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,


    MatDialogModule,
    MatMenuModule,
    MatButtonModule,

    BrowserAnimationsModule


  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
