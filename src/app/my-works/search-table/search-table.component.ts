import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { customersSearchModel } from 'src/app/models/customerSearch';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
})
export class SearchTableComponent implements OnInit {
  
  @Input() toggle:boolean;
  @Input() output:customersSearchModel[] = null;

  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
    
  }

  editAction(data:any){
    
  }
  
}
