import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';

// SERVICES
import { ApiDataService } from './api-data.service';
import { AppDataService } from './app-data.service';


import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [
    ApiDataService,
    AppDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
