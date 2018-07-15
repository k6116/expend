import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../api-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css', '../_shared/common.css']
})
export class TestComponent implements OnInit {

  form: FormGroup;
  testData: any;
  newTestData: any;

  constructor(
    private apiDataService: ApiDataService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name: [null],
      a_number: [null]
    });
  }

  ngOnInit() {
    this.getTestData();
  }

  getTestData() {
    this.apiDataService.getTestData()
    .subscribe(
      res => {
        console.log('Test Data List: ', res);
        this.testData = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  insertTestData() {

    const name = this.form.value.name;
    const a_number = this.form.value.a_number;

    this.newTestData = {name: name, a_number: a_number};

    this.apiDataService.insertTestData(this.newTestData)
    .subscribe(
      res => {
        console.log('Test Data Inserted', res);
        this.getTestData();
      },
      err => {
        console.log(err);
      }
    );
  }


}
