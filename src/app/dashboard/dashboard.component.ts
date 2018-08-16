import { Component, OnInit } from '@angular/core';
import { User } from '../_shared/models/user.model';
import { ApiDataService } from '../_shared/services/api-data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../_shared/styles/common.css']
})
export class DashboardComponent implements OnInit {

  currentUser: User;
  users: User[] = [];

  constructor(
    private apiDataService: ApiDataService,
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }

  test() {
    this.apiDataService.scheduleAlgo()
    .subscribe(
      res => {
        console.log('Schedule Algo List: ', res);
      },
      err => {
        console.log(err);
      }
    );
  }

}
