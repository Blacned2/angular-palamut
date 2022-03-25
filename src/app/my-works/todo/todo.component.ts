import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [
    MessageService, ConfirmationService
  ]
})
export class TodoComponent implements OnInit {

  editModal: boolean;

  log: number;

  todoList = [
    { id: 1, title: 'Yemek yemek' },
    { id: 2, title: 'Js gelistirmek' },
    { id: 3, title: 'Angular gelistirmek' },
    { id: 4, title: 'TypeScript gelistirmek' },
    { id: 5, title: 'Dotnet Core' },
    { id: 6, title: 'EF' },
  ];

  LengthCounter: number = this.todoList.length;

  idCounter: number = this.todoList.length + 1;

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {

  };

  hideDialog() {
    this.editModal = false;
  }

  item = { id: this.idCounter, title: '' }
  addTodo(data) {
    if (data == '') {
      this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'Bos todo giremezsiniz !', life: 2000 })
    } else if (this.todoList.findIndex(u => u.title == data) > 0) {
      this.messageService.add({ severity: 'error', summary: 'Hata', detail: `Ayni todo'dan birden fazla giremezsiniz !`, life: 2000 })
    }
    else {
      this.idCounter += 1;
      console.log(this.idCounter)
      this.item.title = data;
      this.todoList.push(this.item);
      this.item = { id: this.idCounter, title: '' };
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Todo eklendi', life: 2000 });
      this.LengthCounter = this.todoList.length;
    }
  };

  editThisTodo(data) {
    this.log = this.todoList.indexOf(data);
    this.item.title = data.title;
    this.editModal = true;
  };

  saveTodo() {
    this.todoList[this.log].title = this.item.title;
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Todo eklendi', life: 2000 });
    this.editModal = false;
  }

  deleteThisTodo(data) {
    this.confirmationService.confirm({
      message: 'Silmek istediginizden emin misiniz ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.todoList.splice(
          this.todoList.indexOf(data), 1
        )
        this.messageService.add({ severity: 'warn', summary: 'Removed', detail: 'Todo silindi', life: 2000 })
        this.idCounter++;
        this.LengthCounter = this.todoList.length;
      }
    })
  };

}
