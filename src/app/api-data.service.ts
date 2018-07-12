import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiDataService {

  timeout: number;

  constructor(
    private http: Http
  ) {
    // 15 seconds
    this.timeout = 15000;
  }

  getTestData() {
    return this.http.get('api/indexTestData')
    .timeout(this.timeout)
    .map((response: Response) => response.json());
  }

  insertTestData(testData: any) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`/api/insertTestData/`, JSON.stringify(testData), options)
      .timeout(this.timeout)
      .map((response: Response) => response.json());
  }
}
