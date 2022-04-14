import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { fromEvent, observable, Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';




@Component({
  selector: 'app-rxjs-tutorials',
  templateUrl: './rxjs-tutorials.component.html',
})
export class RxjsTutorialsComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }
  myCount: number = 0;
  openCloseBar: boolean;
  ngOnInit(): void {
    this.Get1();
    this.Get2();
    

    // this.ObserverStructure_I();
    // this.observeLogic();
    // const clicked = fromEvent(document, 'click');
    // clicked.subscribe(event => console.log(event));
    // clicked.subscribe(event => console.log(event), error => console.error(error), () => console.log('Finished'));
    // const dataSource = of('Rxjs', 'operatorler', 'harika', 'dostum')
    //   // .pipe(filter(value=>value.length > 5)) //pipe basta uygulandi ve filtrelendi
    //   .pipe(map(value => value + '!!!'), filter(value => value.length > 5)) //filter metodu sonda uygulandi ve maplanmis verilerin uzerinden filtreledi
    //   .subscribe(value => console.log(value));
    // const id = document.getElementById('rxjs');
    // const eventRunner = fromEvent(id, '')
    // eventRunner.subscribe(event => {
    //   if (this.openCloseBar == true) {
    //     this.openCloseBar = false;
    //   } else {
    //     this.openCloseBar = true;
    //   }
    // }, error => console.error(error), () => console.log(`finished`));
  }

  count: number = 0;
  Inc() {
    this.count += 1;
  }
  Dec() {
    this.count -= 1;
  }

  Get1(){
    this.httpClient.get("https://localhost:44350/api/Alicilar/1").subscribe((data)=>{
      console.log(data);
    })
  }
  Get2(){
    this.httpClient.get("https://localhost:44350/api/Alicilar/2").subscribe((data)=>{
      console.log(data);
    })
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

  observeLogic() {
    const observable = of(1, 2, 3);
    const observer = {
      next: (x: number) => console.log('Observer yeni bir veriye sahip:' + x),
      error: (err: Error) => console.error('Observer hatayla karsilasti' + err),
      complete: () => console.log('Observer veri akisini bitirdi...'),
    };
    observable.subscribe(observer);
    //Bir observable'i observe ediyoruz..
  }

  obs = new Observable((observer) => {
    console.log(`Observable start`);
    setTimeout(() => { observer.next(1) }, 1000);
    setTimeout(() => { observer.next(2) }, 2000);
    setTimeout(() => { observer.next(3) }, 3000);
    setTimeout(() => { observer.next(4) }, 4000);
    setTimeout(() => { observer.next(5) }, 5000);
  })


}


