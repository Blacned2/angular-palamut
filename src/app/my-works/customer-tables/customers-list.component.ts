import { _isNumberValue } from '@angular/cdk/coercion';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { customersSearchModel } from 'src/app/models/customerSearch';
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
    providers: [ConfirmationService, MessageService]
})
export class CustomersComponent implements OnInit {

    customersUrl = 'https://localhost:44350/api/Alicilar/AliciList/';

    customerSearchUrl = 'https://localhost:44350/api/Alicilar/AliciSearch?searchString=';

    customerDialog: boolean;

    cols: any[];

    currPage: number = 1;

    maxPage: number = 0;

    rowGroupMetadata: any;

    customers1: any[] = [];

    searchedCustomers: customersSearchModel[] = [];

    searchString: string = '';

    selectedCustomers: any[] = [];

    selectedCustomer: customersModel;

    specificSearch: boolean;

    activityValues: number[] = [0, 100];

    submitted: boolean;

    switcher: boolean = true;

    @ViewChild('dt') table: Table;

    constructor(private httpClient: HttpClient, private messageService: MessageService) { }

    getCustomers() {
        this.specificSearch = false;
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

    exportAsExcel() {
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.customers1['alicilar']);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Customers')

        XLSX.writeFile(wb, 'customer-list.xlsx');
    }

    showSearchBar() {
        let element = document.getElementById('sInput');
        if (element.classList.contains('opened')) {
            if (this.searchString != '') {
                if (this.searchedCustomers.length > 0) {
                    this.specificSearch = true;
                }
                this.httpClient.get<customersSearchModel[]>(this.customerSearchUrl + this.searchString)
                    .toPromise()
                    .then(output => {
                        this.searchedCustomers = output;
                    })
                    .catch(error => {
                        this.messageService.add({ severity: 'warn', summary: 'Warning', detail: error.error, life: 2000 });
                    })
            } else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Bir deger giriniz', life: 2000 })
            }
        }

        element.style.transition = '0.2s ease-in-out'
        element.style.opacity = '1';
        element.classList.add('opened')
        this.switcher = false;
    }

    hideSearchBar() {
        let element = document.getElementById('sInput');
        element.style.transition = '0.3s ease-in-out'

        element.style.opacity = '0'
        element.classList.remove('opened')
        this.specificSearch = false;
        this.switcher = true;
    }
}
