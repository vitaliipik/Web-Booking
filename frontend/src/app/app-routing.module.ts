import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EventListComponent} from "./event-list/event-list.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {TicketComponent} from "./ticket/ticket.component";
import {AccountComponent} from "./account/account.component";

const routes: Routes = [
  {path:"events",
    component: EventListComponent
  },
  {path:"register",
    component: RegisterComponent
  },
  {path:"login",
    component: LoginComponent
  },
  {path:"ticket",
    component: TicketComponent
  },
  {path:"account",
    component: AccountComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
