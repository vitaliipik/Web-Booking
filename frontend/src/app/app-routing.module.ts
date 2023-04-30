import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EventListComponent} from "./event-list/event-list.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {TicketComponent} from "./ticket/ticket.component";
import {AccountComponent} from "./account/account.component";
import {AdminComponent} from "./admin/admin.component";
import {FeatureGuard} from "./guard/feature.guard";
import {Permission} from "./models/permission.model";
import {EventDetailComponent} from "./event-detail/event-detail.component";
import {UserManagementComponent} from "./user-management/user-management.component";
import {EventManagementComponent} from "./event-management/event-management.component";

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
    canActivate: [FeatureGuard],
    data: { permission: Permission.user },
    component: TicketComponent
  },
  {path:"account",
    component: AccountComponent
  },
  {path:"admin",
    canActivate: [FeatureGuard],
    data: { permission: Permission.admin },
    component: AdminComponent,
    children: [
      {
        path:'users', component: UserManagementComponent
      },
      {
        path:'events', component: EventManagementComponent
      }
    ]
  },
  {path:"event/:id",
    component: EventDetailComponent
  },
  {path:"**",pathMatch:'full',
    component: EventListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
