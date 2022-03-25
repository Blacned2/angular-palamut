import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { customerModel } from 'src/app/models/customer';
import { customersModel } from 'src/app/models/customers';

@Component({
    selector: 'app-customer-edit',
    templateUrl: './customer-edit.component.html',
    providers: [
        MessageService, ConfirmationService
    ],
})
export class CustomerEditComponent implements OnInit {

    @Output() emitter = new EventEmitter();

    @Input() customer: customerModel['alicilar'];

    addUpdateUrl:string = 'https://localhost:44350/api/Alicilar/AliciEkleGuncelle';

    customerDialog: boolean;

    submitted:boolean;

    constructor(private httpClient:HttpClient,private confirmationService: ConfirmationService, private messageService: MessageService) { }

    ngOnInit(): void {
    }

    editAction(customer: customersModel['alicilar']) {
        this.customer = { ...customer };
        this.customerDialog = true;
    }

    createAction() {
        this.customer = { aliciID: 0, address: '', aliciName: '', aliciTelNo: '' };
        this.customerDialog = true;
    }

    hideDialog() {
        this.customerDialog = false;
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

}
