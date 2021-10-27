import { Component, OnDestroy, OnInit } from "@angular/core";
import { interval, Observable, Observer, Subscription } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;
  constructor() {}

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });
    const customIntrvalObservable = new Observable(
      (observer: Observer<Number>) => {
        let count = 0;
        let message = "count is greater than 3";
        setInterval(() => {
          observer.next(count);
          if (count === 2) {
            observer.complete();
          }
          if (count > 3) {
            observer.error(new Error(message));
          }
          count++;
        }, 1000);
      }
    );
    this.firstObsSubscription = customIntrvalObservable.subscribe(
      (data: Number) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        console.log("completed");
      }
    );
  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }
}
