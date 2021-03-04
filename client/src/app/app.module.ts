import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { CategoryComponent } from './admin/category/category.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminDashboardComponent,
    CategoryComponent,
    AdminLoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
