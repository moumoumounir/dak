import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticatorGuard } from './guard/authenticator.guard'
import { AdminAuthGuard } from './guard/admin-auth.guard'
//import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { HttpClientModule } from "@angular/common/http";

import { LoginComponent } from './authenticate/login/login.component'
import { AuthenticateComponent } from './authenticate/authenticate/authenticate.component'
import { DataObjectListComponent } from './dataComponent/data-object-list/data-object-list.component';

import { DataRequestListComponent } from './dataRequest/data-request-list/data-request-list.component';
import { UserListComponent } from "./user/user-list/user-list.component";

import { RouterModule, Routes } from '@angular/router';

import { attributeListComponent } from "./attribute/attribute-list/attribute-list.component";
import { DataAcceesApprovalListComponent }  from './dataAcceesApproval/data-accees-approval-list/data-accees-approval-list.component'

import { DataAcceesTaskListComponent }  from './dataAcceesTask/data-accees-task-list/data-accees-task-list.component'


const routes: Routes = [
  { path: '', redirectTo: '/authenticate', pathMatch: 'full' },
  
  {
    path: 'authenticate', component: AuthenticateComponent,
    children: [
      { path: 'login', component: LoginComponent }
    ]
  },
  { path: 'ListDataObject', component: DataObjectListComponent },
  { path: 'ListDataObject/:req', component: DataObjectListComponent },
  { path: 'ListRequests', component: DataRequestListComponent },
  { path: 'ListRequests/:req', component: DataRequestListComponent },
  { path: 'ListUser', component: UserListComponent },
  { path: 'ListDataAttributes' , component:attributeListComponent},
  { path: 'ListApproval', component:DataAcceesApprovalListComponent},
  { path: 'ListTask', component:DataAcceesTaskListComponent}
  
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes) ,
    CommonModule
  ],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
