import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';


// SERVICES
import { ApiDataService } from './_shared/services/api-data.service';
import { WebsocketService } from './_shared/services/websocket.service';
import { CacheService } from './_shared/services/cache.service';
import { AuthGuard } from './_shared/guards/auth.guard';
import { JwtInterceptor } from './_shared/services/jwt.interceptor';
import { AlertService } from './_shared/services/alert.service';
import { AuthenticationService } from './_shared/services/authentication.service';

import { AppComponent } from './app.component';
import { SidebarComponent } from './navs/sidebar/sidebar.component';
import { MainComponent } from './main/main.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { LoginComponent } from './auth/login/login.component';
import { AlertComponent } from './alert/alert.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './auth/register/register.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { ChatComponent } from './chat/chat.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MainComponent,
    ExpensesComponent,
    LoginComponent,
    AlertComponent,
    DashboardComponent,
    RegisterComponent,
    SchedulerComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ApiDataService,
    WebsocketService,
    CacheService,
    AuthGuard,
    AlertService,
    AuthenticationService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
