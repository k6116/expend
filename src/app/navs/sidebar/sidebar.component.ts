import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  dashboard: boolean;
  expenses: boolean;
  scheduler: boolean;
  chat: boolean;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onExpensesMenuClick() {
    console.log('Expenses Menu Click');
    this.router.navigate([`/main/expenses`]);
    this.expenses = true;
    this.dashboard = false;
    this.scheduler = false;
    this.chat = false;
  }

  onDashboardMenuClick() {
    console.log('Dashboard Menu Click');
    this.router.navigate([`/main/dashboard`]);
    this.expenses = false;
    this.dashboard = true;
    this.scheduler = false;
    this.chat = false;
  }

  onSchedulerMenuClick() {
    console.log('Scheduler Menu Click');
    this.router.navigate([`/main/scheduler`]);
    this.expenses = false;
    this.dashboard = false;
    this.scheduler = true;
    this.chat = false;
  }

  onChatMenuClick() {
    console.log('Chat Menu Click');
    this.router.navigate([`/main/chat`]);
    this.expenses = false;
    this.dashboard = false;
    this.scheduler = false;
    this.chat = true;
  }

}
