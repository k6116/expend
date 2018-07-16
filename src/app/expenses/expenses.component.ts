import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiDataService } from '../api-data.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css', '../_shared/common.css']
})
export class ExpensesComponent implements OnInit {

  form: FormGroup;
  categoryList: any;
  purchasedUserList: any;
  selectedCategoryID: any;
  selectedPurchasedUserID: any;

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
    this.getCategoryList();
    this.getPurchasedUserList();
  }

  getCategoryList() {
    this.apiDataService.getCategoryList()
    .subscribe(
      res => {
        console.log('Category List: ', res);
        this.categoryList = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  getPurchasedUserList() {
    this.apiDataService.getUserList()
    .subscribe(
      res => {
        console.log('Purchased User List: ', res);
        this.purchasedUserList = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  selectCategory(cat: any) {
    this.selectedCategoryID = cat.id;
  }

  selectPurchasedUser(pUser: any) {
    this.selectedPurchasedUserID = pUser.id;
  }

  submitExpense() {
    const expenseData = this.form.getRawValue();
    expenseData.categoryId = this.selectedCategoryID;
    expenseData.purchasedBy = this.selectedPurchasedUserID;
    console.log('Expense Data');
    console.log(expenseData);

    this.apiDataService.insertExpense(expenseData)
    .subscribe(
      res => {
        console.log('Insert Expense Data Successful ', res);
      },
      err => {
        console.log(err);
      }
    );
  }

}
