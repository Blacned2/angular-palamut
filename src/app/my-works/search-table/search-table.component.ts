import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { customersSearchModel } from 'src/app/models/customerSearch';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
})
export class SearchTableComponent implements OnInit {

  @Input() toggle: boolean;
  @Input() output: customersSearchModel[] = null;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {

  }

  editAction(data: any) {

  }

  searchedExportAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.output);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'searchedCustomers')

    XLSX.writeFile(wb, 'searched-customer-list.xlsx');
  }

}
