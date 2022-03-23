import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { observable, Observable } from 'rxjs';




@Component({
  selector: 'app-rxjs-tutorials',
  templateUrl: './rxjs-tutorials.component.html',
})
export class RxjsTutorialsComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }
  myCount: number = 0;

  ngOnInit(): void {
    this.ObserverStructure_I();
  }

  count: number = 0;
  Inc() {
    this.count += 1;
  }
  Dec() {
    this.count -= 1;
  }

  emitted(data) {
    this.myCount = data;
  }

  ObserverStructure_I() {
    var myObservable = new Observable(observer => {
      observer.next('first data')
      observer.next('second data')
      observer.next('third data')
      observer.complete()
      observer.next('data after complete') //Won't show up
    }).subscribe(adc => console.log(adc))
  };

}


