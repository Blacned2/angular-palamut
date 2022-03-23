import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Output } from '@angular/core';

@Component({
  selector: 'app-customer-delete',
  templateUrl: './customer-delete.component.html',
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
  providers: [
    ConfirmationService, MessageService
  ]
})
export class CustomerDeleteComponent implements OnInit {

  customerDeleteUrl = 'https://localhost:44350/api/Alicilar/AliciSil/';

  constructor(private httpClient: HttpClient, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  @Output() emitter = new EventEmitter();

  @Input() customerId: number;

  ngOnInit(): void {
  }

  deleteAction(id) {
    this.confirmationService.confirm({
      message: 'Silmek istediginizden emin misiniz ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.httpClient.delete(this.customerDeleteUrl + id).subscribe((result) => {
          console.log(result);
          this.emitter.emit();
        });
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Customer Deleted', life: 2000 });
      },
    });
  }
}
