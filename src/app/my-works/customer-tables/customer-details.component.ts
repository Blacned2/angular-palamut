import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Route, Router } from '@angular/router';
import { customerModel } from 'src/app/models/customer';
import { customersModel } from 'src/app/models/customers';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
})
export class CustomerDetailsComponent implements OnInit {

  customerDialog: boolean = false;
  isDataLoaded: boolean = false;
  id: any;
  item: customerModel = { alici: { address: '', aliciID: 0, aliciName: '', aliciTelNo: '' }, alicilar: null, maxPage: null, status: null };
  customerGetUrl = 'https://localhost:44350/api/Alicilar/SingleAlici/';
  addUpdateUrl = 'https://localhost:44350/api/Alicilar/AliciEkleGuncelle';
  submitted: boolean;
  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.getId();
    this.getData();
    this.isDataLoaded = true;
  }


  customer: customerModel['alicilar'];

  editAction(customer: customersModel['alicilar']) {
    this.customer = { ...customer };
    this.customerDialog = true;
    console.log(this.customer)
  }

  hideDialog(){
    this.customerDialog = false;
  }

  saveCustomer() {
    this.submitted = true;
    if (this.customer.aliciID) {
      this.httpClient.post(this.addUpdateUrl + '?id=' + this.customer.aliciID, this.customer).subscribe((result) => {
        console.log(result, 'edit');
        this.customerDialog = false;
      })
    }
  }

  getId() {
    this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id');
    })
  }
  getData() {
    this.httpClient.get<customerModel>(this.customerGetUrl + this.id).subscribe((result) => {
      this.item = result;
      console.log(this.item)
    })
  }

}
