import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';
import { customersModel } from 'src/app/models/customers';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
})
export class CustomerCreateComponent implements OnInit {

  addUpdateUrl:string = 'https://localhost:44350/api/Alicilar/AliciEkleGuncelle';

  submitted:boolean;

  customerDialog: boolean;

  customer: customersModel['alicilar']

  @Output() emitter = new EventEmitter();

  constructor(private httpClient:HttpClient,private messageService:MessageService) { }

  ngOnInit(): void {
  }

  saveCustomer() {
    this.submitted = true;
    if (this.customer.aliciName.trim()) {
      if (this.customer.aliciID) {
        this.httpClient.post(this.addUpdateUrl + '?id=' + this.customer.aliciID, this.customer).subscribe((result) => {

          this.emitter.emit();
          this.customerDialog = false;
        })
      } else {
        this.httpClient.post(this.addUpdateUrl, this.customer).subscribe((result) => {
          console.log(result, 'create');
          this.emitter.emit();
          this.customerDialog = false;
        })
      }
    }
  }

  createAction() {
    this.customer = { aliciID: 0, address: '', aliciName: '', aliciTelNo: '' };
    this.customerDialog = true;
  }
}
