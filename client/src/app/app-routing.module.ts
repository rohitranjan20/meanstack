import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminGuard } from './admin/admin.guard';
import { AuthGuard } from './services/admin/auth.guard';
import { AuthService } from './services/admin/auth.service';

const routes: Routes = [
  {path:'admin/login',component:AdminLoginComponent},
  // {path:'', redirectTo:''},
  {path:'admin/dashboard',component:AdminDashboardComponent,canActivate:[AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
