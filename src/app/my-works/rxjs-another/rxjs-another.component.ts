import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rxjs-another',
  templateUrl: './rxjs-another.component.html',
})
export class RxjsAnotherComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() count: number;
  @Output() change = new EventEmitter<number>();
  //We can create lots of emitters for different works

  myCount: number = 0;

  Inc() {
    this.change.emit(this.myCount++);
  }
  Dec() {
    this.change.emit(this.myCount--);
  }


}
