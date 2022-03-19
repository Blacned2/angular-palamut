import { _isNumberValue } from '@angular/cdk/coercion';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import * as XLSX from 'xlsx';
import { customersModel } from '../../models/customers';

@Component({
    templateUrl: './customers-list.component.html',
    styleUrls: ['./tabledemo.scss'],
    styles: [`
        :host ::ng-deep .p-datatable-gridlines p-progressBar {
            width: 100%;
        }
        
        @media screen and (max-width: 960px) {
            :host ::ng-deep .p-datatable.p-datatable-customers.rowexpand-table .p-datatable-tbody > tr > td:nth-child(6) {
                display: flex;
            }
        }

    `],
    providers:[ConfirmationService,MessageService]
})
export class CustomersComponent implements OnInit {

    customersUrl = 'https://localhost:44350/api/Alicilar/AliciList/';

    customerDeleteUrl = 'https://localhost:44350/api/Alicilar/AliciSil/';

    addUpdateUrl = 'https://localhost:44350/api/Alicilar/AliciEkleGuncelle';
    customerDialog:boolean;

    cols:any[];

    currPage: number = 1;

    maxPage: number = 0;

    dateTime = new Date()

    rowGroupMetadata: any;

    customers1: any[] = [];

    selectedCustomers: any[] = [];

    selectedCustomer: customersModel;

    statuses: any[];

    activityValues: number[] = [0, 100];

    @ViewChild('dt') table: Table;

    constructor(private httpClient: HttpClient,private confirmationService:ConfirmationService,private messageService:MessageService) { }

    getCustomers() {
        this.httpClient.get<any[]>(this.customersUrl + this.currPage).subscribe(data => {
            this.customers1 = data;
            this.maxPage = data['maxPage'];
        })
    }

    ngOnInit() {
        this.getCustomers();
    }

    paginate(event) {
        this.currPage = event.page + 1;
        this.getCustomers();
    }

    deleteThis(id:number) {
        this.confirmationService.confirm({
            key: 'deleteThis',
            message: 'Are you sure to perform this action?'
        });
    }


    
    deleteAction(id) {
        this.confirmationService.confirm({
            message: 'Silmek istediginizden emin misiniz ?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            
            accept: () => {
                this.httpClient.delete(this.customerDeleteUrl+id).subscribe((result) =>{
                    console.log(result);
                    this.getCustomers()
                });
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Customer Deleted', life: 2000});
            },
        });
    }

    customer:customersModel['alicilar']

    editAction(customer: customersModel['alicilar']) {
        this.customer = {...customer};
        this.customerDialog = true;
    }

    createAction(){ 
        this.customer = {aliciID:0,address:'',aliciName:'',aliciTelNo:''};
        this.customerDialog = true;
    }

    hideDialog(){
        this.customerDialog = false;
    }
    submitted:boolean;
    saveCustomer(){
        this.submitted = true;
        if(this.customer.aliciName.trim()){
            if(this.customer.aliciID){
                this.httpClient.post(this.addUpdateUrl+'?id='+this.customer.aliciID,this.customer).subscribe((result)=>{
                    console.log(result,'edit');
                    this.getCustomers();
                    this.customerDialog = false;
                })
            }else{
                this.httpClient.post(this.addUpdateUrl,this.customer).subscribe((result)=>{
                    console.log(result,'create');
                    this.getCustomers();
                    this.customerDialog = false;
                })
            }
        }
    }

    exportAsExcel(){
        const ws:XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.customers1['alicilar']);
        const wb:XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb,ws,'Customers')

        XLSX.writeFile(wb,'customer-list.xlsx');
    }

}
