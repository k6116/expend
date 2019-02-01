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
    this.timeout = 1500000;
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

  deleteExpense(expenseData: any) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`/api/destroyExpense/`, JSON.stringify(expenseData), options)
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


  authenticate(user: any) {
    return this.http.get(`/api/login/${user}`)
      .timeout(this.timeout)
      .map((response: Response) => response.json());
  }

  // Python APIs
  scheduleAlgo() {
    return this.http.get(`/api/scheduleAlgo/`)
      .timeout(this.timeout)
      .map((response: Response) => response.json());
  }

  // Kue APIs

  kueVideo(obj: any) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    this.http.post(`/api/kueVideo/`, JSON.stringify(obj), options)
      .subscribe({ error: e => console.error(e) });
  }

  kueEmail(obj: any) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    this.http.post(`/api/kueEmail/`, JSON.stringify(obj), options)
      .subscribe({ error: e => console.error(e) });
  }


}
