import { Component } from '@angular/core';
import { concatMap, forkJoin, from, map, mergeMap, switchMap, of } from 'rxjs';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'gap';

  constructor(private httpService: HttpService) {}

  // arr1 = [1, 2, 3, 4];
  // ob1 = from(this.arr1)
  //   .pipe(concatMap((param) => this.httpService.getComments(param)))
  //   .subscribe((val) => console.log(val));

  obs = forkJoin({
    obs1: of(1, 2, 3),
    obs2: of('one', 'two', 'three'),
  }).subscribe((val) => console.log(val));
}
