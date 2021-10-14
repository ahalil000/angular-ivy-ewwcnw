import { Component, OnInit, VERSION } from '@angular/core';
import { interval, map, Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;

  someData: SomeClass[] = [
    { id: 1, desc: 'One', data: 100 },
    { id: 2, desc: 'Two', data: 200 },
    { id: 3, desc: 'Three', data: 300 },
    { id: 4, desc: 'Four', data: 400 },
    { id: 5, desc: 'Five', data: 500 },
  ];

  simpleData: SomeClass[] = this.someData;

  someData$: Observable<SomeClass[]>;

  moreData: SomeClass[] = [];

  moreData$: Subscription;

  ngOnInit() {
    this.someData$ = of(this.someData).pipe(
      map((res) => {
        res.map((r) => {
          r.data = Math.floor(r.data * 1.1);
        });
        return res;
      })
    );

    this.moreData$ = of(this.someData).subscribe((res) => {
      console.log('data in array has changed!');
      this.moreData = res.map((r) => {
        r.data = Math.floor(r.data * 1.1);
        return r;
      });
    });
  }

  ngOnDestroy() {
    this.moreData$.unsubscribe();
  }

  eventClick(val: any) {
    console.log('data change triggered..');
    this.moreData.map((m) => {
      m.data = m.data + 10;
    });
  }
}

export class SomeClass {
  id: number;
  desc: string;
  data: number;
}
