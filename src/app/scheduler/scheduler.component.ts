import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiDataService } from '../_shared/services/api-data.service';


@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css', '../_shared/styles/common.css']
})
export class SchedulerComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiDataService: ApiDataService
  ) {
    this.form = this.formBuilder.group({
      date: [null],
      description: [null],
      amount: [null],
      categoryId: [null],
      purchasedBy: [null],
      notes: [null],
      shared: [false],
      reimbursed: [false]
    });
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
