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
    console.log('Expenses Menu Click');
    this.router.navigate([`/main/expenses`]);
  }

  onDashboardMenuClick() {
    console.log('Dashboard Menu Click');
    this.router.navigate([`/main/dashboard`]);
  }

  onGeneticsMenuClick() {
    console.log('Genetics Menu Click')
    // this.router.navigate([`/main/genetics`]);
  }

}
