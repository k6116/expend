import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { TestComponent } from './test/test.component';


const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  // { path: 'main', component: MainComponent },
  {
    path: 'main', component: MainComponent,
    children: [
      { path: 'expenses', component: ExpensesComponent },
      { path: 'test', component: TestComponent },
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
