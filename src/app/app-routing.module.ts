import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { AuthGuard } from './_shared/guards/auth.guard';
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'main', component: MainComponent },
  {
    path: 'main', component: MainComponent, canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'expenses', component: ExpensesComponent, canActivate: [AuthGuard] },
      { path: 'scheduler', component: SchedulerComponent, canActivate: [AuthGuard] },
      // { path: '', redirectTo: 'fte-entry/employee', pathMatch: 'full' },
      // { path: 'dashboard', component: DashboardComponent }
      { path: 'chat', component: ChatComponent, canActivate: [AuthGuard]  },

    ]
  },
  { path: '**', redirectTo: '/main' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule {

}
