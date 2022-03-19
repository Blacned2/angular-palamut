import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ngrx-another',
  templateUrl: './ngrx-another.component.html',
  styleUrls: ['./ngrx-another.component.scss']
})
export class NgrxAnotherComponent implements OnInit {

  count$:Observable<number>;

  constructor(private store:Store<{count:number}>) { 
    this.count$ = store.pipe(select('count'))
  }
  
  
  ngOnInit(): void {
  }
}
