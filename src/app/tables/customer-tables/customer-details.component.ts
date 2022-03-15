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

  isDataLoaded:boolean = false;
  id: any;
  item: customerModel = {alici:{address:'',aliciID:0,aliciName:'',aliciTelNo:''},alicilar:null,maxPage:null,status:null};
  customerGetUrl = 'https://localhost:44350/api/Alicilar/SingleAlici/';
  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    this.getId();
    this.getData();
    this.isDataLoaded=true;
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
