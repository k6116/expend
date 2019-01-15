import { Component, OnInit } from '@angular/core';

import { ApiDataService } from '../_shared/services/api-data.service';


@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css', '../_shared/styles/common.css']
})
export class SchedulerComponent implements OnInit {

  constructor(
    private apiDataService: ApiDataService
  ) {
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
