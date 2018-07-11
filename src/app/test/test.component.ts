import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../api-data.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  testData: any;

  constructor(
    private apiDataService: ApiDataService
  ) { }

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


}
