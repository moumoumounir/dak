import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material/material.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { FooterComponent } from './components/footer/footer.component';
import { NavbarUserComponent } from './components/navbar-user/navbar-user.component';
import { ModalComponent }  from './components/modal/modal.component';
import { SidenavUserComponent } from './components/sidenav-user/sidenav-user.component';
import { DynamicTableListComponent } from './components/dynamic-table-list/dynamic-table-list.component';
import { SidenavListAdminComponent } from './navidation/sidenav-list-admin/sidenav-list-admin.component';
import { LayoutComponent } from './layout/layout.component';

import { LoginComponent } from './authenticate/login/login.component';
import { AuthenticateComponent } from './authenticate/authenticate/authenticate.component';
import { DataObjectListComponent } from './dataComponent/data-object-list/data-object-list.component';
import { DataObjectCrudComponent } from './dataComponent/data-object-crud/data-object-crud.component';
import { DataObjectAcceesComponent } from './dataComponent/data-object-accees/data-object-accees.component';

import { DataRequestListComponent} from "./dataRequest/data-request-list/data-request-list.component"
import { DataRequestCrudComponent } from './dataRequest/data-request-crud/data-request-crud.component';

import { UserListComponent } from "./user/user-list/user-list.component";

import { UserCrudComponent } from "./user/user-crud/user-crud.component";

import { attributeListComponent } from "./attribute/attribute-list/attribute-list.component";

import { attributeCrudComponent } from './attribute/attribute-crud/attribute-crud.component';

import { DataAcceesApprovalListComponent }  from './dataAcceesApproval/data-accees-approval-list/data-accees-approval-list.component'

import { DataAcceesApprovalCrudComponent }  from './dataAcceesApproval/data-accees-approval-crud/data-accees-approval-crud.component'


import { DataAcceesTaskListComponent }  from './dataAcceesTask/data-accees-task-list/data-accees-task-list.component'


import { DataAcceesTaskCrudComponent }  from './dataAcceesTask/data-accees-task-crud/data-accees-task-crud.component'

import { UserMatListComponent } from './user/user-mat-list/user-mat-list.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent 			,
    LayoutComponent,
    NavbarUserComponent 		,
    ModalComponent				,
    SidenavUserComponent 		,  SidenavListAdminComponent,
    DynamicTableListComponent  ,
    LoginComponent, AuthenticateComponent,
    DataObjectListComponent,
    DataObjectCrudComponent,
    
    DataObjectAcceesComponent,
    DataRequestCrudComponent,

    DataRequestListComponent,
    UserListComponent,
    UserCrudComponent,
    attributeListComponent,
    attributeCrudComponent,
    DataAcceesApprovalListComponent,
    DataAcceesApprovalCrudComponent,
    DataAcceesTaskCrudComponent,
    DataAcceesTaskListComponent,
    UserMatListComponent
    
  ],
  imports: [HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
