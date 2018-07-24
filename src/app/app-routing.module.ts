import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './main/main.component';
import { ExpensesComponent } from './expenses/expenses.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // { path: 'main', component: MainComponent },
  {
    path: 'main', component: MainComponent,
    children: [
      { path: 'expenses', component: ExpensesComponent }
      // { path: '', redirectTo: 'fte-entry/employee', pathMatch: 'full' },
      // { path: 'dashboard', component: DashboardComponent }
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
