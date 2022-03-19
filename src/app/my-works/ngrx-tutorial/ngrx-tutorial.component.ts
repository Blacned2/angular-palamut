import { Component, OnInit } from '@angular/core';
import {Store ,select} from '@ngrx/store'
import { Observable } from 'rxjs';
import { increment,decrement,reset } from 'src/app/store/counter.actions';

@Component({
  selector: 'app-ngrx-tutorial',
  templateUrl: './ngrx-tutorial.component.html',
  styleUrls: ['./ngrx-tutorial.component.scss']
})
export class NgrxTutorialComponent implements OnInit {
  count$:Observable<number>;

  constructor(private store:Store<{count:number}>) { 
    this.count$ = store.pipe(select('count'))
  }

  ngOnInit(): void {
  }

  increment(){
    this.store.dispatch(increment());
  }
  decrement(){
    this.store.dispatch(decrement());
  }
  reset(){
    this.store.dispatch(reset());
  }

}
