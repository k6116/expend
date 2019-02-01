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

  test1() {

    const obj = {
      name: '1111'
    }

    this.apiDataService.kueVideo(obj);

  }

  test2() {

    const obj = {
      name: '2222'
    }

    this.apiDataService.kueEmail(obj);
    
  }

}
