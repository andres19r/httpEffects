import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { loadUser } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';
import {
  selectUserById,
  selectUserError,
  selectUserLoading,
} from 'src/app/store/selectors/user.selectors';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  user$: Observable<User | null> = of();
  loading$: Observable<boolean> = of(false);
  error$: Observable<any> = of();
  private _unsubscribe$ = new Subject<void>();

  constructor(private router: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit() {
    this.user$ = this.store.select(selectUserById);
    this.loading$ = this.store.select(selectUserLoading);
    this.error$ = this.store.select(selectUserError);

    this.router.params
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(({ id }) => {
        this.store.dispatch(loadUser({ id }));
      });
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
