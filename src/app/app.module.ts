import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// SERVICES
import { ApiDataService } from './api-data.service';
import { AppDataService } from './app-data.service';


import { AppComponent } from './app.component';
import { SidebarComponent } from './navs/sidebar/sidebar.component';
import { MainComponent } from './main/main.component';
import { ExpensesComponent } from './expenses/expenses.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MainComponent,
    ExpensesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ApiDataService,
    AppDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
