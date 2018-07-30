import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onExpensesMenuClick() {
    console.log('Expenses Menu click');
    this.router.navigate([`/main/expenses`]);
  }

  onDashbaordMenuClick() {
    console.log('Dashboard Menu click');
    this.router.navigate([`/main/dashboard`]);
  }

}
