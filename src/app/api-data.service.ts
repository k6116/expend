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

  // Expense APIs

  getExpenseList() {
    return this.http.get('api/indexExpenseList')
    .timeout(this.timeout)
    .map((response: Response) => response.json());
  }

  insertExpense(expenseData: any) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`/api/insertExpense/`, JSON.stringify(expenseData), options)
      .timeout(this.timeout)
      .map((response: Response) => response.json());
  }

  // Category APIs

  getCategoryList() {
    return this.http.get('api/indexCategoryList')
    .timeout(this.timeout)
    .map((response: Response) => response.json());
  }

  // User APIs

  getUserList() {
    return this.http.get('api/indexUserList')
    .timeout(this.timeout)
    .map((response: Response) => response.json());
  }

}
